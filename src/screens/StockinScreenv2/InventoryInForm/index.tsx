//#region Import
import { useEffect, useState } from "react";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar"
import { useTranslation } from "react-i18next";
import { Autocomplete, Box, CircularProgress, FormControlLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import { styletext } from "../StockinForm";
import MyButton from "../../../components/MyButton";
import TableOrigin from "../../../components/TableOrigin";
import QRScanner from "../../../components/QRScanner";
import { successSound } from "../../../utils/pathsound";
import InputField from "../../../components/InputField";
import * as ExcelJS from "exceljs";
import moment from "moment";
import { GridColDef } from "@mui/x-data-grid";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import { useSelector } from "react-redux";
import axios from "axios";
import { config } from "../../../utils/api";

//#endregion
const InventoryIn = () => {
    const { t } = useTranslation();

    //#region column header table
    const columns: GridColDef[] = [
        {
            field: 'Order_No',
            headerName: t("dcmOrder_No") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Material_No',
            headerName: t("dcmMaterial_No") as string,
            width: 150,
            editable: true,
            headerClassName: 'custom-header'
        },
        {
            field: 'Rack',
            headerName: t("dcpRack") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'QTY',
            headerName: t("dcmQTY") as string,
            width: 300,
            headerClassName: 'custom-header'
        },
        {
            field: 'Material_Name',
            headerName: t("dcmMaterial_Name") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Supplier',
            headerName: t("dcpSupplier") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Count_Roll',
            headerName: t("dcmRoll") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
    ];
    //#endregion

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region useEffect 
    useEffect(() => {
        handleLoadRack()
    }, [])
    //#endregion

    //#region Variable
    const [modalScan, setModalScan] = useState(false)
    const [rack, setRack] = useState('')
    const [orderNo, setOrderNo] = useState('')
    const [materialNo, setMaterialNo] = useState('')
    const [supplierNo, setSupplierNo] = useState('')
    const [listRack, setListRack] = useState([])
    const [disable, setDisable] = useState(false)
    const [listMaterial, setListMaterial] = useState([])
    //#endregion

    //#region Func OnChange Input
    const handleChangeRack = (value: any) => {
        setRack(value);
    };
    const handleChangeOrderNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNo(event.target.value);
    };
    const handleChangeMaterialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialNo(event.target.value);
    };
    const handleChangeSupplierNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSupplierNo(event.target.value);
    };
    //#endregion

    //#region Func Logic
    const handleSearch = () => {
        if (rack !== "" || orderNo !== "" || materialNo !== "" || supplierNo !== "") {
            const url = connect_string + "api/Search_Inventory_In"
            const data = {
                cboRack_ID: rack,
                txtOrderNo: orderNo,
                txtMaterial_No: materialNo,
                txtSupplier: supplierNo,
                version: dataUser[0].WareHouse
            }
            axios.post(url, data, config).then(response => {
                const arr = response.data.map((item: any, index: any) => ({
                    Order_No: item.Order_No,
                    Material_No: item.Material_No,
                    Rack: item.Rack,
                    QTY: item.QTY,
                    Material_Name: item.Material_Name,
                    Supplier: item.Supplier,
                    Count_Roll: item.Count_Roll
                }))
                setListMaterial(arr)
            })
        }
    }

    const handleRefresh = () => {
        setRack('')
        setOrderNo('')
        setMaterialNo('')
        setSupplierNo('')
    }

    const handleLoadRack = () => {
        const url = connect_string + 'api/Load_Rack_Inventory_In'
        axios.post(url).then((response) => {
            setListRack(response.data)
        })
    }
    //#region Excel
    const exportToExcel = () => {
        var tong = 0;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet 1");

        const data = [
            ["CÔNG TY TNHH LẠC TỶ II"],
            ["Lô B1, B2 KCN Tân Phú Thạnh - Giai đoạn 1, Tân Phú Thạnh, Châu Thành A, Hậu Giang."],
            ["DANH SÁCH VẬT TƯ TỒN KHO" + "\n" + " NGÀY " + moment().format("DD/MM/YYYY")],
            [""],
            [
                t("dcpNum"),
                t("dcmOrder_No"),
                t("dcmMaterial_No"),
                t("dcpRack"),
                t("dcmQTY"),
                t("dcmMaterial_Name"),
                t("dcpSupplier"),
                t("dcmRoll"),
            ],
            ...listMaterial.map((row: any, i) => {
                tong = tong + row.QTY;
                return [
                    i + 1,
                    row.Order_No,
                    row.Material_No,
                    row.Rack,
                    row.QTY,
                    row.Material_Name,
                    row.Supplier,
                    row.Count_Roll
                ];
            }),
        ];
        // Gán giá trị cho các ô dựa trên dữ liệu
        data.forEach((row, rowIndex) => {
            row.forEach((cellValue, columnIndex) => {
                const cell = worksheet.getCell(rowIndex + 1, columnIndex + 1);
                cell.value = cellValue;
                cell.alignment = {
                    // wrapText: true,
                    vertical: "middle",
                    horizontal: "center",
                };
                cell.font = {
                    family: 2
                }
                if (rowIndex > 3) {
                    cell.border = {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                        left: { style: "thin" },
                        right: { style: "thin" },
                    };
                    if (rowIndex === 4) {
                        cell.font = {
                            bold: true
                        }
                        // Tính toán độ rộng của cell dựa trên độ dài của giá trị trong cell
                        const cellLength = String(cellValue).length;
                        const column = worksheet.getColumn(columnIndex + 1);
                        const currentWidth = column.width || 1; // Độ rộng mặc định, ví dụ 10

                        // Cập nhật width của cột nếu độ dài của giá trị vượt quá width hiện tại
                        if (cellLength > currentWidth) {
                            column.width = cellLength + 2; // 2 là padding để không bị chữ bị đè lên nhau
                        }
                    }

                }

            });
        });
        // const columnWidths = [
        //     5, 15, 20, 20, 25, 60, 15, 50, 30, 15, 15, 20, 20, 15, 20
        // ];
        // columnWidths.forEach((width, columnIndex) => {
        //     const column = worksheet.getColumn(columnIndex + 1);
        //     column.width = width;
        // });
        const firstRow = worksheet.getRow(1);
        firstRow.font = {
            bold: true,
            size: 11,
        };
        firstRow.alignment = {
            vertical: "middle", // Canh giữa dọc
            horizontal: "center", // Canh giữa ngang
        };

        // Định dạng dòng thứ hai (index dòng là 2)
        const secondRow = worksheet.getRow(2);
        secondRow.font = {
            bold: true, // Chữ in đậm
            size: 11,
        };
        secondRow.alignment = {

            vertical: "middle", // Canh giữa dọc
            horizontal: "center", // Canh giữa ngang
        };
        const threeRow = worksheet.getRow(3);
        threeRow.font = {
            bold: true,
            size: 18,
        };
        threeRow.alignment = {
            vertical: "middle", // Canh giữa dọc
            horizontal: "center", // Canh giữa ngang
        };
        worksheet.mergeCells(`A1:C1`);
        worksheet.mergeCells(`A2:I2`);
        worksheet.mergeCells(`A3:N3`);
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            // link.download =
            //     "Danh sách nhập kho" + datefrom + " đến " + dateto + ".xlsx";
            link.click();
        });
    };
    //#endregion
    //#endregion
    return (
        <FullScreenContainerWithNavBar hidden={false} sideBarDisable={true} sideBarNavigate="" title={t("lblReport_Inventory_In") as string} navigate={"/stock-in"}>
            <Box
                paddingX={1}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Stack alignItems={'center'}>
                    <Grid spacing={1} container display={'flex'} justifyContent={'flex-end'} width={'60%'}  >
                        {/* Số phiếu */}
                        <Grid item xs={6} display={'flex'} justifyContent={'center'}>
                            <Box className="input-type-container ">
                                <InputField value={orderNo} handle={handleChangeOrderNo} disable={disable} focus={true} label={t("dcmOrder_No") as string} keydown={null} />
                            </Box>
                        </Grid>
                        {/* Nhà cung ứng */}
                        <Grid item xs={6} display={'flex'} justifyContent={'center'}>
                            <Box className="input-type-container ">
                                <InputField value={supplierNo} handle={handleChangeSupplierNo} disable={disable} focus={true} label={t("dcpSupplier") as string} keydown={null} />
                            </Box>
                        </Grid>
                        {/* Mã vật tư */}
                        <Grid item xs={6} display={'flex'} justifyContent={'center'}>
                            <Box className="input-type-container ">
                                <InputField value={materialNo} handle={handleChangeMaterialNo} disable={disable} focus={true} label={t("dcmMaterial_No") as string} keydown={null} />
                            </Box>
                        </Grid>
                        {/* Mã kệ */}
                        <Grid item xs={6} display={'flex'}  >
                            <Box className="input-type-container" sx={{display:'flex', width:'100%'}} alignItems={'center'}>
                                <Typography sx={{flex: 1}} className="textsize" id="rack">{t("dcmRack_ID")}</Typography>
                                <Autocomplete
                                    value={rack}
                                    onChange={(event: any, newValue: string | null) => {
                                        handleChangeRack(newValue);
                                    }}
                                    className="dark-bg-primary"
                                    disablePortal
                                    options={listRack}
                                    disabled={disable}
                                    id="combo-box-demo"
                                    sx={{
                                        borderRadius: "50px",
                                        border: "1px solid",
                                        paddingLeft: '16px',
                                        width:'80%',
                                        "& .MuiInputBase-root": {
                                            height: "2rem",
                                        },

                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="dark-bg-primary"
                                            sx={{
                                                borderRadius: "50px",
                                                color: "white",
                                                height: "2rem",
                                                "& fieldset": {
                                                    borderColor: "white",
                                                    border: "none"
                                                },
                                                "& .MuiInputBase-input": {
                                                    paddingTop: "0 !important",
                                                    paddingBottom: "20px !important",
                                                    paddingLeft: "5px !important"
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </Box>
                        </Grid>
                        {/* <Grid item lg={0.2} md={0.3} display={'flex'} ></Grid> */}
                        {/* {isLoading && <CircularProgress size={'25px'} color="info" />} */}
                    </Grid>
                </Stack>
                <Stack>
                    <Grid container display={'flex'} justifyContent={'center'} marginTop={'10px'}>
                        <Grid item xs={1.5}>
                            <MyButton name={t("btnSearch") as string} disabled={disable} onClick={handleSearch} />
                        </Grid>
                        <Grid item xs={1.5}>
                            <MyButton name={t("btnExcel") as string} onClick={exportToExcel} disabled={disable} />
                        </Grid>
                        <Grid item xs={1.5}>
                            <MyButton name={t("btnClean") as string} onClick={handleRefresh} disabled={disable} />
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
            <Stack overflow={"hidden"} sx={{ height: '100%' }}>
                <TableOrigin columns={columns} rows={listMaterial} />
            </Stack>
        </FullScreenContainerWithNavBar>
    )
}

export default InventoryIn