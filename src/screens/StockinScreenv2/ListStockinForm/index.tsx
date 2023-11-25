//#region import
import { Box, Stack, Grid } from "@mui/material"
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar"
import InputField from "../../../components/InputField"
import DatePickerField from "../../../components/DatePickerField"
import MyButton from "../../../components/MyButton"
import QC from "../QCForm"
import { GridColDef } from "@mui/x-data-grid"
import { useState } from "react"
import moment from "moment"
import { config } from "../../../utils/api"
import { connect_string } from "../../LoginScreen/ChooseFactory";
import axios from "axios"
import CircularProgress from '@mui/material/CircularProgress';
import TableOrigin from "../../../components/TableOrigin"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import * as ExcelJS from "exceljs";
import QRScanner from "../../../components/QRScanner"
import { successSound } from "../../../utils/pathsound"
//#endregion
const ListStockin = () => {
    const { t } = useTranslation();
    //#region column header table
    const columns: GridColDef[] = [
        {
            field: 'Rack',
            headerName: t("dcpRack") as string,
            width: 100,
            headerClassName: 'custom-header'
        },
        {
            field: 'Order_No',
            headerName: t("dcmOrder_No") as string,
            width: 150,
            headerClassName: 'custom-header'
        },
        {
            field: 'Stock_In_No',
            headerName: t("dcpStock_In_No") as string,
            width: 140,
            headerClassName: 'custom-header'
        },
        {
            field: 'Material_No',
            headerName: t("dcmMaterial_No") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Work_Order',
            headerName: t("dcmWork_Order") as string,
            width: 250,
            headerClassName: 'custom-header',

        },
        {
            field: 'QTY',
            headerName: t("dcpQTY") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Material_Name',
            headerName: t("dcpMaterial_Name") as string,
            width: 200,
            headerClassName: 'custom-header'
        },
        {
            field: 'Supplier',
            headerName: t("dcpSupplier") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Color',
            headerName: t("dcpColor") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Size',
            headerName: t("dcpSize") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Production',
            headerName: t("dcpProduction") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Supplier_No',
            headerName: t("dcpSupplier_no") as string,
            width: 180,
            headerClassName: 'custom-header'
        },
        {
            field: 'User_Serial_Key',
            headerName: t("dcpUser_Name") as string,
            width: 160,
            headerClassName: 'custom-header',

        },
        {
            field: 'Total_QTY',
            headerName: t("dcpQty_ROLL") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
    ];
    //#endregion

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region Variable
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [orderNo, setOrderNo] = useState('')
    const [supplier, setSupplier] = useState('')
    const [materialNo, setMaterialNo] = useState('')
    const [dateto, setDateTo] = useState(moment().format("MM/DD/YYYY"))
    const [datefrom, setDateFrom] = useState(moment().format("MM/DD/YYYY"))
    const [rows, setRows] = useState<any[]>([])
    const [modalScan, setModalScan] = useState(false)
    //#endregion

    //#region Func OnChange Input
    const handleOrderNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNo(event.target.value)
    };

    const handleSupplierChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSupplier(event.target.value)
    };

    const handleMaterialNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialNo(event.target.value)
    };

    const getValueDate = ((params: any, dtp_name: string) => {
        if (dtp_name === 'dateFrom') {
            setDateFrom(params)
        }
        else {
            setDateTo(params)
        }
    })
    //#endregion

    //#region Func Logic
    const handleRefresh = () => {
        setOrderNo('')
        setMaterialNo('')
        setSupplier('')
    }

    const Search = () => {
        setIsLoading(true)
        setDisable(true)
        const url = connect_string + 'api/btnSearch_Click_frmReport_Stock_In'
        const data = {
            dtpFrom_Date: moment(datefrom).format("YYYY/MM/DD"),
            dtpTo_Date: moment(dateto).format("YYYY/MM/DD"),
            txtOrderNo: orderNo,
            txtMaterial_No: materialNo,
            txtSupplier: supplier,
            get_version: dataUser[0].WareHouse
        }

        axios.post(url, data, config).then(response => {
            const arr = response.data.map((item: any, index: any) => ({
                _id: index,
                Rack: item.Rack,
                Order_No: item.Order_No,
                Stock_In_No: item.Stock_In_No,
                Material_No: item.Material_No,
                Work_Order: item.Work_Order,
                QTY: item.QTY,
                Material_Name: item.Material_Name,
                Supplier: item.Supplier,
                Color: item.Color,
                Size: item.Size,
                Production: item.Production,
                Supplier_No: item.Supplier_No,
                User_Serial_Key: item.User_Serial_Key,
                Total_QTY: item.Total_QTY,
            }))
            setRows(arr)
        }).finally(() => {
            setIsLoading(false)
            setDisable(false)
        })
    }

    //#region Excel
    const exportToExcel = () => {
        var tong = 0;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet 1");

        const data = [
            ["DANH SÁCH VẬT TƯ NHẬP KHO TỪ " + datefrom + " ĐẾN " + dateto],
            [
                t("dcpNum"),
                t("dcpRack"),
                t("dcmOrder_No"),
                t("dcpStock_In_No"),
                t("dcmMaterial_No"),
                t("dcmWork_Order"),
                t("dcmQTY"),
                t("dcmMaterial_Name"),
                t("dcpSupplier"),
                t("dcmColor"),
                t("dcmSize"),
                t("dcmProduction"),
                t("dcmSupplier_no"),
                t("dcmUser_Name"),
                t("dcmQty_ROLL"),
            ],
            ...rows.map((row, i) => {
                tong = tong + row.QTY;
                return [
                    i + 1,
                    row.Rack,
                    row.Order_No,
                    "",
                    row.Material_No,
                    row.Work_Order,
                    row.QTY,
                    row.Material_Name,
                    row.Supplier,
                    row.Color,
                    row.Size,
                    row.Production,
                    row.Supplier_No,
                    row.User_Serial_Key,
                    row.Roll,
                ];
            }),
        ];
        // Gán giá trị cho các ô dựa trên dữ liệu
        data.forEach((row, rowIndex) => {
            row.forEach((cellValue, columnIndex) => {
                const cell = worksheet.getCell(rowIndex + 1, columnIndex + 1);
                cell.value = cellValue;
                cell.alignment = {
                    wrapText: true,
                };
                cell.border = {
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                    left: { style: "thin" },
                    right: { style: "thin" },
                };
            });
        });
        const columnWidths = [
            5, 15, 20, 20, 25, 60, 15, 50, 30, 15, 15, 20, 20, 15, 20
        ];
        columnWidths.forEach((width, columnIndex) => {
            const column = worksheet.getColumn(columnIndex + 1);
            column.width = width;
        });
        const firstRow = worksheet.getRow(1);
        firstRow.font = {
            bold: true,
            size: 25,
        };
        firstRow.alignment = {
            vertical: "middle", // Canh giữa dọc
            horizontal: "center", // Canh giữa ngang
        };

        // Định dạng dòng thứ hai (index dòng là 2)
        const secondRow = worksheet.getRow(2);
        secondRow.font = {
            bold: true, // Chữ in đậm
        };
        secondRow.alignment = {

            vertical: "middle", // Canh giữa dọc
            horizontal: "center", // Canh giữa ngang
        };

        const lastRow = worksheet.rowCount;
        const lastColumn = worksheet.getColumn("D").number;

        worksheet.mergeCells(`A1:O1`);
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download =
                "Danh sách nhập kho" + datefrom + " đến " + dateto + ".xlsx";
            link.click();
        });
    };
    //#endregion
    
    const handleScanClick = () => {

        setModalScan(true);
    }

    const handleScan = async (result: any | null) => {

        if (result || result.text) {
            if (result.text.length >= 15) {
                CheckScanMaterialNo(result.text)
            }
            // setModalScan(false);
            modalScan && successSound.play();
        }
    }
    const CheckScanMaterialNo = (barcode: string) => {

        const url = connect_string + 'api/Get_Material_No_Scan'
        const data = {
            Barcode_Scan: barcode
        }
        axios.post(url, data, config).then(response => {
            const arr = response.data;
            setMaterialNo(arr)

        })
    }
    //#endregion
    
    return (
        <FullScreenContainerWithNavBar hidden={true} onShowScan={handleScanClick} navigate="/stock-in" sideBarDisable={true} sideBarNavigate="" title={t("lblReport_Stock_In") as string}>
            <Box
                paddingX={1}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Stack height={'100%'}>
                    <Stack height={'65%'}>
                        <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} rowSpacing={2}>
                            <Grid item xs={5}>
                                <InputField disable={disable} handle={handleOrderNoChange} value={orderNo} label={t("lblOrderNo") as string} />
                            </Grid>
                            <Grid item xs={5} marginLeft={'10px'}>
                                <InputField disable={disable} handle={handleSupplierChange} value={supplier} label={t("lblSupplier") as string} />
                            </Grid>
                            <Grid item xs={5} display={'flex'} alignItems={'center'}>
                                <InputField disable={disable} handle={handleMaterialNoChange} value={materialNo} label={t("dcmMaterial_No") as string} />
                                {isLoading && <CircularProgress size={'25px'} color="info" />}
                            </Grid>
                            <Grid item xs={2.5} display={'flex'} paddingLeft={'10px'}>
                                <DatePickerField label={t("lblFrom") as string + "\u2002"} onValueChange={datefrom} valueDate={(params: any) => { getValueDate(params, 'dateFrom') }} />
                            </Grid>
                            <Grid item xs={2.5} display={'flex'} marginLeft={'10px'}>
                                <DatePickerField label={t("lblTo") as string + "\u2002"} onValueChange={dateto} valueDate={(params: any) => { getValueDate(params, 'dateTo') }} />
                            </Grid>
                        </Grid>
                    </Stack>
                    <Stack height={'35%'} direction={'row'} marginTop={'10px'}>
                        <Grid columnSpacing={4} container display={'flex'} justifyContent={'center'} alignItems={'center'} >
                            <Grid item>
                                <MyButton disabled={disable} name={t("btnSearch") as string} onClick={Search} />
                            </Grid>
                            <Grid item>
                                <MyButton disabled={disable} name={t("btnExcel") as string} onClick={exportToExcel} />
                            </Grid>
                            <Grid item>
                                <MyButton disabled={disable} name={t("btnClean") as string} onClick={handleRefresh} />
                            </Grid>
                            <Grid item>
                                <MyButton disabled={disable} name="QC" onClick={() => setOpen(true)} />
                            </Grid>
                        </Grid>
                        {open && <QC open={open} onClose={() => setOpen(false)} />}
                    </Stack>
                </Stack>

            </Box>
            <Stack overflow={"hidden"} sx={{ height: '100%' }}>
                <TableOrigin columns={columns} rows={rows} arrNotShowCell={['_id']} handlerowClick={null} handleDoubleClick={null} />
                {modalScan && <QRScanner onScan={handleScan} open={modalScan} onClose={() => { setModalScan(false); }} />}
            </Stack>
        </FullScreenContainerWithNavBar>
    )
}
export default ListStockin