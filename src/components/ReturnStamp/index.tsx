import { useTranslation } from "react-i18next";
import FullScreenContainerWithNavBar from "../FullScreenContainerWithNavBar";
import { Box, Grid, IconButton, Modal, Stack, Typography } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import InputFieldV1 from "../InputField/index_new";
import { useState } from "react";
import DatePickerFieldV1 from "../DatePickerField/index_new";
import moment from "moment";
import MyButton from "../MyButton";
import TableStockOut from "../TableStockOut";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import ModalCofirm from "../ModalConfirm";
import { connect_string } from "../../screens/LoginScreen/ChooseFactory";
import axios from "axios";
import { config } from "../../utils/api";
import { addTotalQtyOut } from "../../redux/TotalQtyOut";
import { copyValuesArrayStockout, removeArrayStockoutByBarcode } from "../../redux/ArrayStockout";

interface ReturnStampProps {
    title?: string,
    open?: any,
    onClose?: any,
    onPressOK?: any,
    showOk?: boolean
}

const ReturnStamp = (props: ReturnStampProps) => {
    const { title, open, onClose, onPressOK, showOk = true } = props
    const { t } = useTranslation();
    const dispatch = useDispatch()

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    const ArrayStockout = useSelector((state: any) => state.ArrayStockout.items);
    //#endregion

    //#region column header table
    const columns: GridColDef[] = [
        {
            field: "Barcode",
            headerName: t("dcpBarcode") as string,
            align: "center",
            headerAlign: 'center',
            width: 180,

        },
        {
            field: "Material_No",
            headerName: t("dcpMaterial_No") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Supplier",
            headerName: t("dcpSupplier") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,
        },
        {
            field: "Material_Name",
            headerName: t("lblMaterial_Name") as string,
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
            field: "QTY",
            headerName: t("dcpQTY") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Print_QTY",
            headerName: t("dcpPrint_QTY") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Order_No",
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
            field: "Production",
            headerName: t("dcpProduction") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Supplier_No",
            headerName: t("dcpSupplier_no") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,
        },
        {
            field: "Work_Order",
            headerName: t("dcpWork_Order") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Modify_Date",
            headerName: t("dcmDate") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "User_Serial_Key",
            headerName: t("dcmUser_Name") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,
        },


    ];
    //#endregion

    //#region style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column'
    };
    //#endregion

    //#region Variable
    const [arrnotshow, setarrnotshow] = useState<string[]>(['_id', 'Value_Total', 'Material_Label_Serial'])
    const [openCofirm, setOpenCofirm] = useState(false)
    const [cofirmType, setCofirmType] = useState('')
    const [disable, setDisable] = useState(false)
    const [materialNo, setMaterialNo] = useState("")
    const [dateStart, setDateStart] = useState(moment())
    const [dateEnd, setDateEnd] = useState(moment())
    const [modalCofirm, setModalCofirm] = useState(false)
    const [qrcodedelte, setQRCodeDelete] = useState('')
    const [Material_Label_Serial, setMaterial_Label_Serial] = useState('')

    //#endregion

    //#region handleOnChange 
    const handleOnChangeMaterialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialNo(event.target.value)
    }

    const getValueDate = ((params: any, dtp_name: string) => {
        if (dtp_name === 'dateStart') {
            setDateStart(params)
        }
        else {
            setDateEnd(params)
        }
    })

    //#endregion

    //#region  Func Logic
    const handleOpenConfirm = (confirmName: string) => {
        setCofirmType(confirmName)
        setOpenCofirm(true)
    }

    const handleCloseConfirm = () => {
        setCofirmType('')
        setOpenCofirm(false)
    }


    const handleDoubleClick = (params: any, item: any) => {
        setModalCofirm(true)
        setQRCodeDelete(item.Barcode)
        setMaterial_Label_Serial(item.Material_Label_Serial)
    }

    const recoverStamp = () => {
        setDisable(true)
        setModalCofirm(false)
        const url = connect_string + "api/recover_data_Material_Stock_Out_Sample"
        const data = {
            Barcode: qrcodedelte
        }

        axios.post(url, data).then(res => {
            if (res.data === true) {
                handleOK()
            }
            else {
                handleOpenConfirm('no-recover')
            }
        })
            .finally(() => {
                setDisable(false)
            })
    }


    const handleOK = () => {
        setDisable(true)
        const url = connect_string + "api/StockOut_CellDoubleClick"
        const data = {
            Value_Barcode: qrcodedelte,
            Value_Material_Key: Material_Label_Serial,
            User_Serial_Key: dataUser[0].UserId,
            get_version: dataUser[0].WareHouse

        }
        axios.post(url, data, config).then(response => {
            if (response.data == true) {
                setModalCofirm(false)
                const result = ArrayStockout.find((item: any) => item.Barcode === qrcodedelte)
                dispatch(removeArrayStockoutByBarcode(qrcodedelte))
            }
            else {
                handleOpenConfirm('no-authorize')
                setModalCofirm(false)
            }
        }).finally(() => {
            setDisable(false)
        })
    }

    const handleSearchMaterialNo = (event: any) => {
        setDisable(true)
        const url = connect_string + "/api/ctrl_k"
        const data = {
            txtMaterial_Visible: true,
            txtMaterial: materialNo,
            dtpStart_Date: moment(dateStart).format("YYYY/MM/DD"),
            dtpEnd_Date: moment(dateEnd).format("YYYY/MM/DD"),
            get_version: dataUser[0].WareHouse


        }
        axios.post(url, data, config).then(response => {
            const arr = response.data.map((item: any, index: any) => ({
                _id: index,
                ...item
            }))
            dispatch(copyValuesArrayStockout(arr))
        })
            .finally(() => {
                setDisable(false)
            })

    }

    //#endregion

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            slotProps={{
                backdrop: {
                    style: {
                        backdropFilter: "blur(2px)", // Hiệu ứng làm mờ nền
                    },
                },
            }}
        >
            <Box sx={style}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} style={{ borderBottom: '1px solid gray' }}>
                    {/* Nút back */}
                    <IconButton className={'back-button'} onClick={onClose}>
                        <BiArrowBack className=" icon-wrapper" />
                    </IconButton>
                    {/* Tittle */}
                    <Typography variant="h5" component="h5" color={'white'} fontSize={'30px'}>{t("btnSearch")}</Typography>
                    <Typography variant="h5" component="h5" color={'white'}></Typography>
                </Stack>
                <Stack padding={2}>
                    <Grid container spacing={1} alignItems={'center'} justifyContent={'center'}>
                        <Grid item xs={3.5}>
                            {/* Scan xuất */}
                            <InputFieldV1
                                xsLabel={4}
                                xsInput={8}
                                label={t("dcmMaterial_No") as string}
                                disable={disable}
                                value={materialNo}
                                handle={handleOnChangeMaterialNo}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <DatePickerFieldV1
                                label={t("lblFromDate") as string}
                                valueDate={(params: any) => { getValueDate(params, 'dateStart') }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <DatePickerFieldV1
                                label={t("lblToDate") as string}
                                valueDate={(params: any) => { getValueDate(params, 'dateEnd') }}
                            />
                        </Grid>
                        <Grid item>
                            <MyButton height='2rem' name={t('btnSearch')} onClick={handleSearchMaterialNo} disabled={disable} />
                        </Grid>
                    </Grid>
                </Stack>
                <Stack sx={{ height: '100%', overflow: 'hidden' }}>
                    <TableStockOut
                        tableName="stockout-detail"
                        columns={columns}
                        rows={ArrayStockout}
                        onDoubleClick={handleDoubleClick}
                        arrNotShowCell={arrnotshow}
                    />
                </Stack>
                {cofirmType === 'no-authorize' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblTitleNoAuthorize") as string} />}
                {cofirmType === 'no-recover' && <ModalCofirm showCancel={false} onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("noRecoverStamp") as string} />}
                {modalCofirm && <ModalCofirm onPressOK={recoverStamp} open={modalCofirm} onClose={() => setModalCofirm(false)} title={t("msgYouWantUpdate") + qrcodedelte} />}
            </Box>
        </Modal>
    )
}

export default ReturnStamp