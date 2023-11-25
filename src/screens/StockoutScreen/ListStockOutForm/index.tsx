//#region import
import { Box, Stack, Grid } from "@mui/material"
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar"
import InputField from "../../../components/InputField"
import DatePickerField from "../../../components/DatePickerField"
import MyButton from "../../../components/MyButton"
import MyTable3 from "../../../components/MyTable3"
import { GridColDef } from "@mui/x-data-grid"
import { useState } from "react"
import moment from "moment"
import { config } from "../../../utils/api"
import { connect_string } from "../../LoginScreen/ChooseFactory";
import axios from "axios"
import CircularProgress from '@mui/material/CircularProgress';
import TableOrigin from "../../../components/TableOrigin"
import { useSelector } from "react-redux"
import * as ExcelJS from "exceljs";
import { useTranslation } from "react-i18next"
import QRScanner from "../../../components/QRScanner"
import { successSound } from "../../../utils/pathsound"
//#endregion

const ListStockout = () => {
    const { t } = useTranslation();
    //#region column header table
    const columns: GridColDef[] = [
        {
            field: '_id',
            headerName: t('dcpNum') as string,
            width: 100,
            headerClassName: 'custom-header'
        },
        {
            field: 'Order_No',
            headerName: t('dcmOrder_No') as string,
            width: 150,
            headerClassName: 'custom-header'
        },
        {
            field: 'Work_Order',
            headerName: t('lblOrder_Word') as string,
            width: 250,
            headerClassName: 'custom-header',

        },
        {
            field: 'Material_No',
            headerName: t('dcmMaterial_No') as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Material_Name',
            headerName: t('dcmMaterial_Name') as string,
            width: 200,
            headerClassName: 'custom-header'
        },
        {
            field: 'Unit',
            headerName: t('dcmUnit') as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'QTY',
            headerName: t('dcmQTY') as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Content',
            headerName: t('dcpContent') as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Roll',
            headerName: t('dcmRoll') as string,
            width: 160,
            headerClassName: 'custom-header'
        },

    ];
    //#endregion
    
    //#region Variable
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [orderNo, setOrderNo] = useState('')
    const [supplier, setSupplier] = useState('')
    const [materialNo, setMaterialNo] = useState('')
    const [dateto, setDateTo] = useState(moment().format("MM/DD/YYYY"))
    const [datefrom, setDateFrom] = useState(moment().format("MM/DD/YYYY"))
    const [rows, setRows] = useState<any[]>([])
    const [disable, setDisable] = useState(false)
    const [modalScan, setModalScan] = useState(false)
    //#endregion
    
    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
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
    //#endregion

    //#region Func Logic
    const getValueDate = ((params: any, dtp_name: string) => {
        if (dtp_name === 'dateFrom') {
            setDateFrom(params)
        }
        else {
            setDateTo(params)
        }
    })

    const handleRefresh = () => {
        setOrderNo('')
        setMaterialNo('')
        setSupplier('')
    }

    const Search = () => {
        setIsLoading(true)
        setDisable(true)
        const url = connect_string + 'api/btnSearch_Click_Stock_Out'
        const data = {
            dtpFrom: moment(datefrom).format("YYYY/MM/DD"),
            dtpTo: moment(dateto).format("YYYY/MM/DD"),
            txtOrderNo: orderNo,
            txtMaterial_No: materialNo,
            cboSupplier: supplier,
            get_version: dataUser[0].WareHouse
        }

        axios.post(url, data, config)
            .then(response => {
                let i = 1;
                const arr = response.data.reduce((acc: any, item: any, index: any) => {
                    // Check if this is the first item for this supplier
                    const isFirstForSupplier = !acc.some((prevItem: any) => prevItem.Supplier === item.Supplier);
                    // Create a new object for this item with the appropriate _id value
                    const newItem = {
                        _id: isFirstForSupplier ? (i++ + ' ( ' + item.Supplier + ' )') : '',
                        Order_No: item.Order_No,
                        Work_Order: item.Value_Word,
                        Material_No: item.Material_No,
                        Material_Name: item.Material_Name,
                        Unit: item.Value_Unit,
                        QTY: item.Count_Roll2,
                        Content: item.Count_Roll3,
                        Roll: item.Count_Roll,
                        Supplier: item.Supplier
                    };
                    // Add the new item to the accumulator
                    acc.push(newItem);

                    return acc;
                }, []);

                setRows(arr);
            })
            .finally(() => {
                setIsLoading(false);
                setDisable(false)
            });
    }
    //#region Excel
    const exportToExcel = () => {
        let tongqty = 0;
        let tongroll = 0;
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Sheet 1')

        const data = [
            ['CÔNG TY TNHH LẠC TỶ II'],
            ['Lô B1, B2 KCN Tân Phú Thạnh - Giai đoạn 1, Tân Phú Thạnh, Châu Thành A, Hậu Giang.'],
            ['BÁO BIỂU GIAO HÀNG GIA CÔNG HẬU GIANG TỪ ' + datefrom + ' ĐẾN ' + dateto],
            [
                t('dcpNum'),
                t('dcpNum_No'),
                t('dcmWork_Order'),
                t('dcmMaterial_No'),
                t('dcmMaterial_Name'),
                t('dcmUnit'),
                t('dcmQTY'),
                t('dcpContent'),
                t('dcpRoll')
            ],
            ...rows.map((row, i) => {
                tongqty = Number(tongqty) + Number(row.QTY);
                tongroll = Number(tongroll) + Number(row.Roll);
                return [
                    i + 1 + ' ' + row.Supplier,
                    row.Order_No,
                    row.Work_Order,
                    row.Material_No,
                    row.Material_Name,
                    row.Print_QTY,
                    row.QTY,
                    row.Content,
                    row.Roll
                ]
            }),
            ['Tổng', '', '', '', '', '', tongqty.toString(), '', tongroll.toString()]
        ]
        // Gán giá trị cho các ô dựa trên dữ liệu
        data.forEach((row, rowIndex) => {
            row.forEach((cellValue, columnIndex) => {
                const cell = worksheet.getCell(rowIndex + 1, columnIndex + 1)
                cell.value = cellValue
                cell.alignment = {
                    wrapText: true,
                };
                cell.border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
            })
        })
        const columnWidths = [
            18, 25, 35, 20, 35, 15, 15, 30, 20
        ];
        columnWidths.forEach((width, columnIndex) => {
            const column = worksheet.getColumn(columnIndex + 1);
            column.width = width;
        });
        const firstRow = worksheet.getRow(1);
        firstRow.font = {
            bold: true,
            size: 15,
        };
        const twoRow = worksheet.getRow(2);
        twoRow.font = {
            bold: true,
            size: 15,
        };
        const threeRow = worksheet.getRow(3);
        threeRow.font = {
            bold: true,
            size: 28,
        };
        threeRow.alignment = {
            vertical: 'middle', // Canh giữa dọc
            horizontal: 'center', // Canh giữa ngang
        };
        const forRow = worksheet.getRow(4);
        forRow.font = {
            bold: true,
        };
        forRow.alignment = {
            vertical: 'middle',
            horizontal: 'center',
        };

        const lastRow = worksheet.rowCount
        // const lastColumn = worksheet.getColumn('D').number
        const lRow = worksheet.getRow(lastRow);
        lRow.font = {
            bold: true, // Chữ in đậm
        };
        // Kết hợp ô trong phạm vi từ cột A hàng cuối cùng đến cột D hàng cuối cùng
        worksheet.mergeCells(`A1:I1`)
        worksheet.mergeCells(`A2:I2`)
        worksheet.mergeCells(`A3:I3`)
        // worksheet.mergeCells(`A${lastRow-1}:H${lastRow-1}`)
        worksheet.mergeCells(`A${lastRow}:F${lastRow}`)

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = 'Danh sách xuất kho' + datefrom + ' đến ' + dateto + '.xlsx'
            link.click()
        })
    }
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
        <FullScreenContainerWithNavBar hidden={true} onShowScan={handleScanClick} navigate="/stock-out" sideBarDisable={true} sideBarNavigate="" title={t("lblReport_Stock_Out")}>
            <Box
                paddingX={1}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Stack height={'100%'}>
                    <Stack height={'65%'}>
                        <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} rowSpacing={2}>
                            <Grid item xs={5} display={'flex'}>
                                <InputField handle={handleOrderNoChange} value={orderNo} label={t("dcmOrder_No") as string} disable={disable} />
                            </Grid>
                            <Grid item xs={5} display={'flex'} marginLeft={'10px'}>
                                <InputField handle={handleSupplierChange} value={supplier} label={t("dcpSupplier") as string} disable={disable} />
                            </Grid>
                            <Grid item xs={5} display={'flex'} alignItems={'center'}>
                                <InputField handle={handleMaterialNoChange} value={materialNo} label={t("dcmMaterial_No") as string} disable={disable} />

                            </Grid>
                            <Grid item xs={2.5} display={'flex'} paddingLeft={'10px'}>
                                <DatePickerField label={t("lblFrom") as string + "\u2002"} onValueChange={datefrom} valueDate={(params: any) => { getValueDate(params, 'dateFrom') }} />
                            </Grid>
                            <Grid item xs={2.5} display={'flex'} marginLeft={'10px'}>
                                <DatePickerField label={t("lblTo") as string + "\u2002"} onValueChange={dateto} valueDate={(params: any) => { getValueDate(params, 'dateTo') }} />
                            </Grid>
                        </Grid>
                    </Stack>
                    <Stack height={'35%'} width={'100%'} display={'flex'} justifyContent={'center'} direction={'row'} marginTop={'10px'}>
                        <Grid columnSpacing={6} container display={'flex'} justifyContent={'center'} alignItems={'center'} >
                            <Grid item xs={2}></Grid>
                            <Grid item>
                                <MyButton name={t("btnSearch")} onClick={Search} disabled={disable} />
                            </Grid>
                            <Grid item >
                                <MyButton name={t("btnExcel")} disabled={disable} onClick={exportToExcel} />
                            </Grid>
                            <Grid item >
                                <MyButton name={t("btnClean")} onClick={handleRefresh} disabled={disable} />
                            </Grid>
                            <Grid item xs={2}>
                                {isLoading && <CircularProgress size={'25px'} color="info" />}
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>

            </Box>
            <Stack overflow={"hidden"} sx={{ height: '100%' }}>
                <TableOrigin columns={columns} rows={rows} arrNotShowCell={['Supplier']} handlerowClick={null} handleDoubleClick={null} />
                {modalScan && <QRScanner onScan={handleScan} open={modalScan} onClose={() => { setModalScan(false); }} />}
            </Stack>
        </FullScreenContainerWithNavBar>
    )
}
export default ListStockout