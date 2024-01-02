//#region import
import { Box, Checkbox, CircularProgress, FormControlLabel, Grid, Stack } from "@mui/material"
import FullScreenContainerWithNavBar from "../../components/FullScreenContainerWithNavBar"
import InputField from "../../components/InputField"
import { useTranslation } from "react-i18next";
import MyButton from "../../components/MyButton";
import TableCheckBox from "../../components/TableCheckBox";
import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { config } from "../../utils/api";
import { connect_string } from "../LoginScreen/ChooseFactory";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { styletext } from "../StockinScreenv2/StockinForm";
import Formprint from "../../components/Formprint";
import ModalCofirm from "../../components/ModalConfirm";
import QRScanner from "../../components/QRScanner";
import { successSound } from "../../utils/pathsound";
//#endregion
const LabelSplit = () => {
    const { t } = useTranslation();
    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region column header table
    const columnsUp: GridColDef[] = [
        {
            field: "zsdh_Supplier_No",
            headerName: t("dcpSupplier") as string,
            align: "center",
            editable: true,
            headerAlign: 'center',
            width: 150,
        },
        {
            field: "CLBH_Material_No",
            headerName: t("dcpMaterial_No") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "ywpm_Material",
            headerName: t("dcpMaterial_Name") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Color",
            headerName: t("dcmColor") as string,
            align: "center",
            headerAlign: 'center'

        },
        {
            field: "Size",
            headerName: t("dcmSize") as string,
            align: "center",
            headerAlign: 'center'

        },
        {
            field: "Print_QTY",
            headerName: t("dcpQty_ROLL") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "QTY",
            headerName: t("dcpQTY") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "dwbh_Units",
            headerName: t("dcpUnit") as string,
            align: "center",
            headerAlign: 'center'

        },
        {
            field: "CGNO_Order_No",
            headerName: t("lblOrderNo") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Roll",
            headerName: t("dcmRoll") as string,
            align: "center",
            headerAlign: 'center',
        },
        {
            field: "Date_Print",
            headerName: t("dcpDate") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "ywsm_Production",
            headerName: t("dcpProduction") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "ZLBH_Work_Order",
            headerName: t("dcpWork_Order") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "cllb_Material_Type",
            headerName: t("dcmMaterial_Type") as string,
            align: "center",
            headerAlign: 'center'

        },
        {
            field: "BarCode",
            headerName: t("dcpBarcode") as string,
            align: "center",
            headerAlign: 'center',
            width: 180,

        },
    ];

    const columnsDown: GridColDef[] = [
        {
            field: "zsywjc_Supplier",
            headerName: t("dcmSupplier") as string,
            align: "center",
            width: 150,
            headerAlign: 'center',
            editable: true,
        },
        {
            field: "CLBH_Material_No",
            headerName: t("dcpMaterial_No") as string,
            align: "center",
            width: 150,
            headerAlign: 'center',

        },
        {
            field: "ywpm_Material",
            headerName: t("dcpMaterial_Name") as string,
            align: "center",
            width: 150,
            headerAlign: 'center',
        },
        {
            field: "Color",
            headerName: t("dcmColor") as string,
            align: "center",
            headerAlign: 'center',
            width: 300,
        },
        {
            field: "Size",
            headerName: t("dcmSize") as string,
            align: "center",
            width: 400,
            headerAlign: 'center',
        },
        {
            field: "Qty_Roll",
            headerName: t("dcpQty_ROLL") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,
            editable: true,

        },
        {
            field: "Arrival_QTY",
            headerName: t("dcmArrival_QTY") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,
            editable: true,
        },
        {
            field: "QTY",
            headerName: t("dcpQTY") as string,
            align: "center",
            headerAlign: 'center',
        },
        {
            field: "dwbh_Units",
            headerName: t("dcpUnit") as string,
            align: "center",
            headerAlign: 'center'
        },
        {
            field: "CGNO_Order_No",
            headerName: t("lblOrderNo") as string,
            align: "center",
            width: 150,
            headerAlign: 'center'
        },
        {
            field: "Roll",
            headerName: t("dcmRoll") as string,
            align: "center",
            headerAlign: 'center',
            editable: true,

        },
        {
            field: "ngay",
            headerName: t("dcpDate") as string,
            align: "center",
            width: 150,
            headerAlign: 'center'
        },
        {
            field: "ywsm_Production",
            headerName: t("dcpProduction") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,
        },
        {
            field: "ZLBH_Work_Order",
            headerName: t("dcpWork_Order") as string,
            align: "center",
            width: 150,
            headerAlign: 'center'
        },
        {
            field: "cllb_Material_Type",
            headerName: t("dcmMaterial_Type") as string,
            align: "center",
            headerAlign: 'center'
        },
        {
            field: "Name_M",
            headerName: "Name_Material_Detail",
            align: "center",
            width: 200,
            headerAlign: 'center'
        },
        {
            field: "Material_Label_Serial",
            headerName: "Material_Label_Serial",
            align: "center",
            width: 200,
            headerAlign: 'center'
        },
        {
            field: "BarCode",
            headerName: "Barcode_Data",
            align: "center",
            width: 200,
            headerAlign: 'center'
        },
    ];
    //#endregion

    //#region Variable
    const [qrcode, setQrCode] = useState('')
    const [chxAll, setChxAll] = useState(true)
    const [rows, setRows] = useState<any[]>([])
    const [rowUps, setRowUps] = useState<any[]>([])
    const [oldRows, setOldRows] = useState<any>({})
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [listChx, setListChx] = useState([])
    const [open, setOpen] = useState(false)
    const [openCofirm, setOpenCofirm] = useState(false)
    const [cofirmType, setCofirmType] = useState('')
    const [modalScan, setModalScan] = useState(false)
    const [isApi, setIsApi] = useState(true)

    //#endregion

    //#region Func OnChange Input
    const handleQrCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQrCode(event.target.value);
    };

    const handleChxAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChxAll(event.target.checked);
    };
    //#endregion

    //#region Func Logic
    const handleOpenConfirm = (confirmName: string) => {
        setCofirmType(confirmName)
        setOpenCofirm(true)
    }

    const handleCloseConfirm = () => {
        setCofirmType('')
        setOpenCofirm(false)
    }

    const handleSearch = () => {
        setIsLoading(true)
        setDisable(true)
        const url = connect_string + "api/Search_Print_Label_Cut"
        const data = {
            txtBarcode: qrcode,
            User_Serial_Key: dataUser[0].UserId,
            get_version: dataUser[0].WareHouse
        }
        axios.post(url, data, config).then(response => {
            const item = response.data
            if (item.BarCode !== null) {
                const updatedData = {
                    zsywjc_Supplier: item.zsywjc_Supplier,
                    CLBH_Material_No: item.CLBH_Material_No,
                    ywpm_Material: item.ywpm_Material,
                    Color: item.Color,
                    Size: item.Size,
                    Qty_Roll: item.Qty_Roll,
                    Arrival_QTY: item.Arrival_QTY,
                    QTY: item.QTY,
                    dwbh_Units: item.dwbh_Units,
                    CGNO_Order_No: item.CGNO_Order_No,
                    Roll: item.Roll,
                    ngay: item.Date_Print,
                    ywsm_Production: item.ywsm_Production,
                    ZLBH_Work_Order: item.ZLBH_Work_Order,
                    cllb_Material_Type: item.cllb_Material_Type,
                    Name_M: item.Name_M,
                    Material_Label_Serial: item.Material_Label_Serial,
                    BarCode: item.BarCode,
                    zsdh_Supplier_No: item.zsdh_Supplier_No,
                    Value_Roll_Number: item.Value_Roll_Number
                };
                setRows([updatedData])
                setOldRows(item)
                if (rowUps.length < 0) {
                    setRowUps([])
                }
            }
        }).finally(() => {
            setIsLoading(false)
            setDisable(false)
        })
    }

    const filterDuplicates = (object: any, Barcode: any) => {
        if (object.BarCode === Barcode) {
            return object.Qty_Roll
        }
    };

    const handleDoubleClick = (colName: string, item: any) => {
        if (isApi === true) {
            setIsLoading(true)
            setDisable(true)
            setIsApi(false)
            const url = connect_string + "api/DoubleClick_Print_Label_Cut"

            const duplicates = filterDuplicates(oldRows, item.BarCode);
            const date_temp = item.ngay.split('/')

            const data = {
                dcmOrder_No: item.CGNO_Order_No,
                dcmMaterial_No: item.CLBH_Material_No,
                dcmMaterial_Type: item.cllb_Material_Type,
                dcmColor: item.Color,
                dcmUnit: item.dwbh_Units,
                dcmQty_ROLL: item.Qty_Roll,
                dcmArrival_QTY: item.Arrival_QTY,
                dcmQTY: item.QTY,
                dcmRoll: item.Roll,
                dcmSize: item.Size,
                dcmMaterial: item.ywpm_Material,
                dcmProduction: item.ywsm_Production,
                dcmWork_Order: item.ZLBH_Work_Order,
                dcmSupplier_no: item.zsdh_Supplier_No,
                dcmSupplier: item.zsywjc_Supplier,
                dcmDate: date_temp[2] + "/" + date_temp[1] + "/" + date_temp[0],
                dcmBarcode: item.BarCode,
                Value_Roll_Cut: item.Qty_Roll,
                Value_Roll_Print: duplicates,
                User_Serial_Key: dataUser[0].UserId,
                Value_Roll_Number: item.Value_Roll_Number,
                Value_Material_Label_Serial: item.Material_Label_Serial,
                get_version: dataUser[0].WareHouse
            }
            axios.post(url, data, config).then(response => {
                const arr = response.data.map((item: any, index: any) => ({
                    _id: index,
                    zsdh_Supplier_No: item.zsywjc_Supplier,
                    CLBH_Material_No: item.CLBH_Material_No,
                    ywpm_Material: item.ywpm_Material,
                    Color: item.Color,
                    Size: item.Size,
                    Print_QTY: item.Print_QTY,
                    QTY: item.QTY,
                    dwbh_Units: item.dwbh_Units,
                    CGNO_Order_No: item.CGNO_Order_No,
                    Roll: item.Roll,
                    Date_Print: item.Date_Print,
                    ywsm_Production: item.ywsm_Production,
                    ZLBH_Work_Order: item.ZLBH_Work_Order,
                    cllb_Material_Type: item.cllb_Material_Type,
                    BarCode: item.BarCode,
                }))
                setRowUps(arr)
                handleSearch()
            }).finally(() => {
                setIsLoading(false)
                setDisable(false)
                setIsApi(true)
            })
        }

    }

    const handleRefresh = () => {
        setQrCode('');
        setOldRows({})
        setRows([])
        setRowUps([])
    }

    const handlePrint = () => {
        const url = connect_string + "/api/Print_Label_Cut"
        const userid = dataUser[0].UserId
        const arr = listChx.map((item: any) => ({
            dcpBarcode: item.BarCode,
            User_Serial_Key: userid,
            get_version: dataUser[0].WareHouse
        }))

        axios.post(url, arr, config).then(response => {
            if (response.data === true) {
                handleOpenConfirm('print-success')
            }
            else {
                handleOpenConfirm('print-erorr')
            }
        })
    }

    const handleDelete = () => {
        const url = connect_string + "api/Delete_Print_Label_Cut"
        const data = listChx.map((item: any) => ({
            barcode: item.BarCode,
            Value_Roll_Delete: item.QTY,
            Barcode_restosre: rows[0].BarCode,
            get_version: dataUser[0].WareHouse

        }))
        axios.post(url, data, config).then(response => {
            const filteredArr1 = rowUps.filter((item1: any) => {
                return !data.some((item2: any) => item1.BarCode === item2.barcode);
            });
            setRowUps(filteredArr1)
            handleSearch()
            handleOpenConfirm('delete-success')
        })
    }
    const handleScanClick = () => {
        setModalScan(true);
    }
    const handleScan = async (result: any | null) => {
        if (result || result.text) {
            setQrCode(result.text)
            setModalScan(false);
            modalScan && successSound.play();
        }
    }
    //#endregion

    return (
        <FullScreenContainerWithNavBar hidden={true} navigate="/" onShowScan={handleScanClick} sideBarDisable={true} sideBarNavigate="" title={t("btnPrint_Cut")}>
            <Box
                paddingX={4}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Stack direction={"row"}>
                    <Grid container alignItems={'center'}>
                        {/* Mã QR */}
                        <Grid item xs={5} display={'flex'}>
                            <InputField label={t("dcpBarcode") as string} value={qrcode} handle={handleQrCodeChange} keydown={null} disable={disable} />
                        </Grid>
                        {/* Check tất cả */}
                        <Grid item xs={2}>
                            <FormControlLabel
                                sx={styletext}
                                control={<Checkbox defaultChecked={chxAll} value={chxAll} onChange={handleChxAllChange} />}
                                label={t("chxAll") as string}
                            />
                        </Grid>

                    </Grid>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={'center'} marginTop={'20px'}>
                    {/* Tìm kiếm */}
                    <MyButton name={t("btnSearch") as string} onClick={handleSearch} disabled={disable} />
                    {/* Làm mới */}
                    <MyButton name={t("btnClean") as string} onClick={handleRefresh} disabled={disable} />
                    {/* Xóa */}
                    <MyButton name={t("btnDelete") as string} disabled={disable} onClick={handleDelete} />
                    {/* In */}
                    <MyButton name={t("btnPrint") as string} disabled={disable} onClick={handlePrint} />
                    {/* Xem trước */}
                    <MyButton name={t("btnPrivewPrint") as string} disabled={disable} onClick={() => setOpen(true)} />
                    {isLoading && <CircularProgress size={'25px'} color="info" />}
                </Stack>
            </Box>
            <Stack overflow={"hidden"} sx={{ height: '100%' }}>
                <Stack sx={{ height: '50%', }}>
                    <TableCheckBox columns={columnsUp} rows={rowUps} listChx={(params: any) => setListChx(params)} />
                </Stack>
                <Stack sx={{ height: '50%', }}>
                    <TableCheckBox arrNotShowCell={['zsdh_Supplier_No', "Material_Label_Serial", "Value_Roll_Number"]} columns={columnsDown} rows={rows} arrEditCell={['Qty_Roll']} onDoubleClick={handleDoubleClick} />
                </Stack>
                {modalScan && <QRScanner onScan={handleScan} open={modalScan} onClose={() => { setModalScan(false); }} />}
                {open && <Formprint open={open} onClose={() => setOpen(false)} rows={rowUps} />}
                {/* {cofirmType === 'print-success' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgPrintSuccess") as string } />} */}
                {cofirmType === 'print-erorr' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgPrintErrror") as string} />}
                {cofirmType === 'delete-success' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgDeleteSuccesful") as string} />}
            </Stack>
        </FullScreenContainerWithNavBar >
    )
}

export default LabelSplit