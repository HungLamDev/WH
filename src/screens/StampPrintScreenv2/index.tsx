//#region  import
import {
    Box,
    Stack,
    FormControlLabel,
    Checkbox,
    Grid
} from "@mui/material";
import DatePickerField from "../../components/DatePickerField";
import FullScreenContainerWithNavBar from "../../components/FullScreenContainerWithNavBar";
import InputField from "../../components/InputField";
import MyButton from "../../components/MyButton";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { connect, useDispatch, useSelector } from 'react-redux';
import { copyValues, clearArrayRowDowns } from "../../redux/ArrayRowDowns";
import { copyValuesRowUps, clearArrayRowUps, removeItemByBarcodeRowUps, changeItemsByBarcodeArrayRowUps, addItemRowUps } from "../../redux/ArrayRowUps";
import { clearArrayDeleteAndPrint, copyValuesArrayDeleteAndPrint, changeItemsByBarcodeArrayDeleteAndPrint } from "../../redux/ArrayDeleteAndPrint";
import { clearArrayRowDowntoUp } from "../../redux/ArrayRowDowntoUp";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { config, createConfig } from "../../utils/api";
import { checkPermissionPrint } from "../LoginScreen/ChooseFactory";
import { connect_string } from "../LoginScreen/ChooseFactory";
import CircularProgress from '@mui/material/CircularProgress';
import TableCheckBox from "../../components/TableCheckBox";
import { useTranslation } from "react-i18next";
import Formprint from "../../components/Formprint";
import ModalCofirm from "../../components/ModalConfirm";
import TableDateTimePicker from "../../components/TableDateTimePicker";
import { styletext } from "../StockinScreenv2/StockinForm";
import { useNavigate } from "react-router-dom";
//#endregion
const StampPrintScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //#region column header  
    const columnsUp: GridColDef[] = [
        {
            field: "Supplier",
            headerName: t("dcpSupplier") as string,
            align: "center",
            editable: true,
            headerAlign: 'center',
            width: 150,
        },
        {
            field: "Material_No",
            headerName: t("dcpMaterial_No") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Material_Name",
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
            field: "Unit",
            headerName: t("dcpUnit") as string,
            align: "center",
            headerAlign: 'center'

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
            field: "ngay",
            headerName: t("dcpDate") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Production",
            headerName: t("dcpProduction") as string,
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
            field: "Material_Type",
            headerName: t("dcmMaterial_Type") as string,
            align: "center",
            headerAlign: 'center'

        },
        {
            field: "Barcode",
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
            field: "qty_roll",
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
            headerName: t("dcmRoll") as string + "\u2002" + "\u2002" + "\u2002",
            align: "center",
            width: 150,
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
            field: "Name_Material_Detail",
            headerName: "",
            align: "center",
            width: 200,
            headerAlign: 'center'
        },
    ];
    //#endregion

    //#region  useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    const ArrayRowUps = useSelector((state: any) => state.ArrayRowUps.items);
    const ArrayRowDowns = useSelector((state: any) => state.ArrayRowDowns.items);
    const ArrayRowDowntoUp = useSelector((state: any) => state.ArrayRowDowntoUp.items);
    const ArrayDeleteAndPrint = useSelector((state: any) => state.ArrayDeleteAndPrint.items);
    //#endregion

    //#region State
    //#region  Cancel request axios
    const controllerRef = useRef(new AbortController());
    const configNew = createConfig(controllerRef.current.signal);
    // Func cancel Request
    const cancelRequest = () => {
        controllerRef.current.abort();
    };
    //#endregion

    const [openCofirm, setOpenCofirm] = useState(false)
    const [cofirmType, setCofirmType] = useState('')
    const [open, setOpen] = useState(false)
    const [rowDowns, setrowDowns] = useState<any[]>([])
    const [rowUps, setrowUps] = useState<any[]>([])
    const [orderNo, setOrderNo] = useState("")
    const [outSource, setOutSource] = useState("")
    const [material_no, setMaterial_No] = useState("")
    const [workorder, setWorkOrder] = useState("")
    const [chxRY, setChxRY] = useState(false)
    const [chxPrint_All_RY, setchxPrint_All_RY] = useState(false)
    const [chxResidual_supplies, setchxResidual_supplies] = useState(false)
    const [chxPrint_RY, setchxPrint_RY] = useState(false)
    const [chxReprint, setchxReprint] = useState(false)
    const [chxReprint_RY, setchxReprint_RY] = useState(false)
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const [dataInRowUps, setDataInRowUps] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [resetCheckbox, setResetCheckbox] = useState(false);
    const [disable, setDisable] = useState(false)
    const [isApi, setIsApi] = useState(true)
    //#endregion

    //#region Func OnChange Input
    const handleOrderNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNo(event.target.value);
        if (event.target.value.length === 15 || event.target.value.length === 16) {
            searchByBarcode(event.target.value)
        }
    };

    const handleOutSource = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOutSource(event.target.value);
    };

    const handleMaterialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterial_No(event.target.value);
    };

    const handleWorkOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWorkOrder(event.target.value);
    };

    const handlechxRY = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChxRY(event.target.checked);
    };

    const handlechxPrint_All_RY = (event: React.ChangeEvent<HTMLInputElement>) => {
        setchxPrint_All_RY(event.target.checked);
    };

    const handlechxResidual_supplies = (event: React.ChangeEvent<HTMLInputElement>) => {
        setchxResidual_supplies(event.target.checked);
    };

    const handlechxPrint_RY = (event: React.ChangeEvent<HTMLInputElement>) => {
        setchxPrint_RY(event.target.checked);
    };

    const handlechxReprint = (event: React.ChangeEvent<HTMLInputElement>) => {
        setchxReprint(event.target.checked);
    };

    const handlechxReprint_RY = (event: React.ChangeEvent<HTMLInputElement>) => {
        setchxReprint_RY(event.target.checked);
    };

    //#endregion

    //#region useEffect
    // useEffect(() => {
    //     // const ArrTemp = ArrayRowDowns.map((item: any, index: any) => ({
    //     //     // item,
    //     //     // ngay: moment(item.CGDate_Date).format('DD/MM/yyyy')
    //     //     _id: index,
    //     //     zsywjc_Supplier: item.zsywjc_Supplier,
    //     //     CLBH_Material_No: item.CLBH_Material_No,
    //     //     ywpm_Material: item.ywpm_Material,
    //     //     Color: item.Color,
    //     //     Size: item.Size,
    //     //     qty_roll: item.qty_roll,
    //     //     Arrival_QTY: item.Arrival_QTY,
    //     //     QTY: item.QTY,
    //     //     dwbh_Units: item.dwbh_Units,
    //     //     CGNO_Order_No: item.CGNO_Order_No,
    //     //     Roll: item.Roll,
    //     //     ngay: moment(item.CGDate_Date).format('YYYY-MM-DD'),
    //     //     ywsm_Production: item.ywsm_Production,
    //     //     ZLBH_Work_Order: item.ZLBH_Work_Order,
    //     //     cllb_Material_Type: item.cllb_Material_Type,
    //     //     Name_Material_Detail: item.Name_Material_Detail,
    //     // }));
    //     // setrowDowns(ArrTemp)
    //     setrowUps(ArrayRowUps)

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [ArrayRowDowns, ArrayRowUps]);
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

    const Search = () => {
        setDisable(true)
        setIsLoading(true);
        //dispatch(clearArrayDeleteAndPrint())
        // dispatch(clearArrayRowUps())
        dispatch(clearArrayRowDowns())
        dispatch(clearArrayRowDowntoUp())
        // setDataInRowUps([])
        const url = connect_string + 'api/btnSearch'
        const data = {
            user_id: dataUser[0].UserId,
            Order_No: orderNo,
            txtOutsource: outSource,
            Material_No: material_no,
            Order_Word: workorder,
            chxRY: chxRY,
            chxPrint_All_RY: chxPrint_All_RY,
            chxResidual_supplies: chxResidual_supplies,
            chxPrint_RY: chxPrint_RY,
            CGDate_Date: date,
            get_version: dataUser[0].WareHouse

        }

        axios.post(url, data, configNew).then(response => {
            const arr = response.data.map((item: any, index: any) => ({
                _id: index,
                zsywjc_Supplier: item.zsywjc_Supplier,
                CLBH_Material_No: item.CLBH_Material_No,
                ywpm_Material: item.ywpm_Material,
                Color: item.Color,
                Size: item.Size,
                qty_roll: item.qty_roll,
                Arrival_QTY: item.Arrival_QTY,
                QTY: item.QTY,
                dwbh_Units: item.dwbh_Units,
                CGNO_Order_No: item.CGNO_Order_No,
                Roll: item.Roll,
                ngay: moment(item.CGDate_Date).format('YYYY-MM-DD'),
                ywsm_Production: item.ywsm_Production,
                ZLBH_Work_Order: item.ZLBH_Work_Order,
                cllb_Material_Type: item.cllb_Material_Type,
                Name_Material_Detail: item.Name_Material_Detail,
            }))
            dispatch(copyValues(arr))
            setrowUps([]);
            setResetCheckbox(true);
        }).finally(() => {
            setIsLoading(false);
            setDisable(false)
        });

    }

    const handleDoubleClick = (name: any, params: any) => {
        if (isApi === true) {
            const date_temp = params.ngay.toString().replaceAll("/", "-").split('-')
            const ngay = date_temp[0] + '-' + date_temp[1] + '-' + date_temp[2]
            setIsApi(false)
            setIsLoading(true)
            setDisable(true)
            const url1 = connect_string + 'api/Divide_stamp'
            const data_stamp = {
                Order_No: params.CGNO_Order_No,
                Material_No: params.CLBH_Material_No,
                Material_Type: params.cllb_Material_Type,
                Color: params.Color,
                Unit: params.dwbh_Units,
                Qty_ROLL: params.qty_roll ? params.qty_roll : "",
                QTY: params.QTY,
                Arrival_QTY: params.Arrival_QTY,
                Roll: params.Roll,
                Size: params.Size,
                Material_Name: params.ywpm_Material,
                Supplier: params.zsywjc_Supplier,
                Date: moment(ngay).format("YYYY-MM-DD"),
                Work_Order: params.ZLBH_Work_Order,
                user_id: dataUser[0].UserId,
                chxResidual_supplies: chxResidual_supplies,
                chxRY: chxRY,
                chxReprint: chxReprint,
                chxReprint_RY: chxReprint_RY,
                chxPrint_All_RY: chxPrint_All_RY,
                chxPrint_RY: chxPrint_RY,
                get_version: dataUser[0].WareHouse,
                Production: params.ywsm_Production

            }

            axios.post(url1, data_stamp, configNew).then(response => {
                setDataInRowUps(dataInRowUps1 => {
                    const newDataInRowUps = response.data.map((item: any, index: any) => {
                        return {
                            _id: item.Barcode,
                            Supplier: item.Supplier,
                            Print_Date: item.Print_Date,
                            Supplier_No: item.Supplier_No,
                            Material_No: item.Material_No,
                            Material_Name: item.Material_Name,
                            Color: item.Color,
                            Size: item.Size,
                            Print_QTY: item.Print_QTY,
                            QTY: item.QTY,
                            Unit: item.Print_QTY.split(" ")[1],
                            Order_No: item.Order_No,
                            Roll: item.Roll,
                            ngay: moment(item.Print_Date).format("YYYY-MM-DD"),
                            Production: item.Production,
                            Work_Order: item.Work_Order,
                            Material_Type: item.Material_Type,
                            Barcode: item.Barcode,
                        };
                    });
                    // xóa phần tử có qrcode trùng trên bảng
                    const filteredDataInRowUps1 = dataInRowUps1.filter((oldItem: any) => {
                        return !newDataInRowUps.some((newItem: any) => {
                            return newItem.Barcode === oldItem.Barcode;
                        });
                    });
                    const mergedDataInRowUps = [...filteredDataInRowUps1, ...newDataInRowUps];
                    // setrowUps(mergedDataInRowUps);

                    // dispatch(copyValues(rowDowns));
                    dispatch(copyValuesRowUps(mergedDataInRowUps));
                    return mergedDataInRowUps;
                });

            }).finally(() => {
                setIsLoading(false)
                setDisable(false)
                setIsApi(true)
            })
        }


    }

    const handleRefresh = () => {
        setDataInRowUps([])
        setrowUps([])
        setrowDowns([])
        dispatch(clearArrayDeleteAndPrint())
        dispatch(clearArrayRowUps())
        dispatch(clearArrayRowDowns())
        dispatch(clearArrayRowDowntoUp())
    }

    const handleDelete = () => {
        setIsLoading(true)
        setDisable(true)
        setDataInRowUps([])
        const objectArray = ArrayDeleteAndPrint.map((params: any) => ({
            dcpBarcode: params.Barcode,
            chxResidual_supplies: chxResidual_supplies,
            chxRY: chxRY,
            chxReprint: chxReprint,
            chxReprint_RY: chxReprint_RY,
            chxPrint_All_RY: chxPrint_All_RY,
            chxPrint_RY: chxPrint_RY,
            dcpCheck: true,
            user_id: dataUser[0].UserId,
            get_version: dataUser[0].WareHouse

        }));
        const url = connect_string + 'api/Delete'


        axios.post(url, objectArray, configNew).then(response => {
            if (response.data == true) {
                ArrayDeleteAndPrint.map(async (params: any) => {
                    dispatch(removeItemByBarcodeRowUps(params.Barcode))
                })
            }
            else {
                handleOpenConfirm('print-error')
            }
        }).finally(() => {
            setIsLoading(false)
            setDisable(false)
        })
    }

    const handlePrint = async () => {
        if (await checkPermissionPrint(dataUser[0].UserId)) {
            if (ArrayDeleteAndPrint.length > 0) {
                handleOpenConfirm('print')
            }
            else {
                handleOpenConfirm('error-data')
            }
        }
        else {
            handleOpenConfirm('print-permission')
        }
    }

    const handlePrintOK = () => {
        handleOpenConfirm('print-success')
        setIsLoading(true)
        setDisable(true)
        setDataInRowUps([])
        const url = connect_string + 'api/PrintLabel_CLick'
        const dataprint = ArrayDeleteAndPrint.map((item: any) => ({
            Qty_ROLL: item["Print_QTY"],
            user_id: dataUser[0].UserId,
            ...item,
            Date: moment(item["ngay"]).format("YYYY-MM-DD").toString(),
            Print_Date: moment(item["ngay"]).format("YYYY-MM-DD").toString(),
            ngay: moment(item["ngay"]).format("YYYY-MM-DD").toString(),
            QRCode: item["Barcode"],
            dcpBarcode: item["Barcode"],
            chxResidual_supplies: chxResidual_supplies,
            chxRY: chxRY,
            chxReprint: chxReprint,
            chxReprint_RY: chxReprint_RY,
            chxPrint_All_RY: chxPrint_All_RY,
            chxPrint_RY: chxPrint_RY,
            dcpCheck: true,
            get_version: dataUser[0].WareHouse

        }))
        axios.post(url, dataprint, config).then(response => {
            if (response.status == 200) {
                // handleOpenConfirm('print-success')
            }
        }).catch(() => {
            handleOpenConfirm('print-permission')
        }).finally(() => {
            setIsLoading(false)
            setDisable(false)
        })
    }

    const handleOrderWordKeyDown = (event: any) => {

        if (event.key === 'Enter' && chxReprint_RY === true && ArrayDeleteAndPrint.length > 0) {
            setIsLoading(true)
            setDisable(true)
            const url = connect_string + "api/txtOrder_Word_KeyDown"
            const listBarcode = ArrayDeleteAndPrint.map((item: any) => item.Barcode)
            const dateChange = moment(date).format("YYYY-MM-DD").toString()
            const data = {
                chxReprint_RY: chxReprint_RY,
                List_Barcode: listBarcode,
                txtOrder_Word: workorder,
                dtpDate_Order: dateChange,
                USERID: dataUser[0].UserId,
            }

            axios.post(url, data, config).then(response => {
                if (response.data === true) {
                    dispatch(changeItemsByBarcodeArrayRowUps({ barcodes: listBarcode, modifyDate: dateChange, Work_Order: workorder }))
                    setrowUps(ArrayRowUps)
                }
                else {
                    handleOpenConfirm('changedatefail')
                }
            }).finally(() => {
                setIsLoading(false)
                setDisable(false)
            })
        }
    }

    const searchByBarcode = (barcode: string) => {
        const url = connect_string + "api/txtOrderNo_TextChanged_Print"
        const data = {
            Scan: barcode
        }
        axios.post(url, data, config).then(response => {
            if (response.data.Barcode !== null) {
                const date_temp = response.data.Print_Date.toString().replaceAll("/", "-").split('-')
                const ngay = date_temp[2] + '-' + date_temp[1] + '-' + date_temp[0]
                const item: any = {}
                item._id = response.data.Barcode
                item.Supplier = response.data.Supplier
                item.Print_Date = moment(ngay).format("YYYY-MM-DD").toString()
                item.Supplier_No = response.data.Supplier_No
                item.Material_No = response.data.Material_No
                item.Material_Name = response.data.Material_Name
                item.Color = response.data.Color
                item.Size = response.data.Size
                item.Print_QTY = response.data.Print_QTY
                item.QTY = response.data.QTY
                item.Unit = response.data.Print_QTY.split(" ")[1]
                item.Order_No = response.data.Order_No
                item.Roll = response.data.Roll
                item.ngay = moment(ngay).format("YYYY-MM-DD").toString()
                item.Production = response.data.Production
                item.Work_Order = response.data.Work_Order
                item.Material_Type = response.data.Material_Type
                item.Barcode = response.data.Barcode
                dispatch(removeItemByBarcodeRowUps(item.Barcode))
                dispatch(addItemRowUps(item))
                setrowUps(ArrayRowUps)
                setOrderNo('')
            }
        })
    }

    //#endregion

    return (
        <FullScreenContainerWithNavBar
            sideBarDisable={true}
            sideBarNavigate=""
            title={t("btnERP_Print") as string}
            navigate="/"
            cancelRequest={cancelRequest}>
            <Box
                paddingX={1}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Stack direction={"row"}>
                    <Grid container alignItems={'center'}>
                        {/* Số phiếu */}
                        <Grid item xs={5} display={'flex'}>
                            <InputField focus={true} label={t("dcmOrder_No") as string} handle={handleOrderNo} keydown={null} value={orderNo} disable={disable} />
                        </Grid>
                        {/* Check RY */}
                        <Grid item xs={1} display={'flex'}>
                            <FormControlLabel
                                sx={styletext}
                                control={<Checkbox defaultChecked={false} onChange={handlechxRY} />}
                                label={t("dcpDDBH") as string}
                            />
                        </Grid>
                        {/* Mã vật tư */}
                        <Grid item xs={5} display={'flex'}>
                            <InputField label={t("dcpMaterial_No") as string} handle={handleMaterialNo} keydown={null} value={material_no} disable={disable} />
                        </Grid>
                    </Grid>
                </Stack>
                <Stack direction={"row"} alignItems={'center'}>
                    <Grid container alignItems={'center'} >
                        {/* Đơn gia công */}
                        <Grid item xs={5} display={'flex'}>
                            <InputField label={t("lblOutsource") as string} handle={handleOutSource} keydown={null} value={outSource} disable={disable} />
                        </Grid>
                        {/* Check In Lại */}
                        <Grid item xs={1}>
                            <FormControlLabel
                                sx={styletext}
                                control={<Checkbox defaultChecked={false} onChange={handlechxReprint} />}
                                label={t("chxReprint") as string}
                            />
                        </Grid>
                        {chxReprint_RY ? (
                            <>
                                {/* Lệnh */}
                                <Grid item xs={3} display={'flex'}>
                                    <InputField label={t("dcpWork_Order") as string + "\u2002"} handle={handleWorkOrder} keydown={handleOrderWordKeyDown} value={workorder} disable={disable} />
                                </Grid>
                                {/* Ngày */}
                                <Grid item xs={1.8} display={'flex'}>
                                    <DatePickerField onValueChange={date}
                                        valueDate={(params: any) => {
                                            setDate(params);
                                        }} />
                                </Grid>

                            </>
                        ) : (
                            // Lệnh
                            chxRY && <InputField label={t("dcpWork_Order") as string} handle={handleWorkOrder} keydown={null} value={workorder} disable={disable} />
                        )}
                    </Grid>
                </Stack>
                <Stack direction={"row"}>
                    <Grid container alignItems={'center'}>
                        {/* Check tất cả */}
                        <Grid item xs={2}>
                            <FormControlLabel
                                sx={styletext}
                                control={<Checkbox defaultChecked />}
                                label={t("chxAll") as string}
                            />
                        </Grid>
                        {/* Check in vật tư bù */}
                        <Grid item xs={2}>
                            {(dataUser[0].TLLanguage === 'TW' || dataUser[0].UserRole === "Administrator") &&
                                <FormControlLabel
                                    sx={styletext}
                                    control={<Checkbox defaultChecked={false} onChange={handlechxResidual_supplies} />}
                                    label={t("chxResidual_supplies") as string}
                                />
                            }
                        </Grid>
                        {/* Check in lại RY */}
                        <Grid item xs={2}>
                            <FormControlLabel
                                sx={styletext}
                                control={<Checkbox defaultChecked={false} onChange={handlechxReprint_RY} />}
                                label={t("chxReprint") + ' ' + t("chxRY") as string}
                            />
                        </Grid>
                        {/* Check in chia lệnh */}
                        <Grid item xs={2}>
                            <FormControlLabel
                                sx={styletext}
                                control={<Checkbox defaultChecked={false} onChange={handlechxPrint_RY} />}
                                label={t("chxPrint_RY") as string}
                            />
                        </Grid>
                        {/* Check tất cả RY */}
                        <Grid item xs={2}>
                            <FormControlLabel
                                sx={styletext}
                                control={<Checkbox defaultChecked={false} onChange={handlechxPrint_All_RY} />}
                                label={t("chxAll") + ' ' + t("chxRY") as string}
                            />
                        </Grid>
                    </Grid>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={'center'}>
                    {/* Tìm kiếm  */}
                    <MyButton name={t("btnSearch") as string} onClick={Search} disabled={disable} />
                    {/* Làm mới */}
                    <MyButton name={t("btnClean") as string} onClick={handleRefresh} disabled={disable} />
                    {/* Xóa */}
                    <MyButton name={t("btnDelete") as string} onClick={handleDelete} disabled={disable} />
                    {/* In */}
                    <MyButton name={t("btnPrint") as string} onClick={handlePrint} disabled={disable} />
                    {/* Xem trước */}
                    <MyButton name={t("btnPrivewPrint") as string} onClick={() => setOpen(true)} disabled={disable} />
                    {/* Đăng ký */}
                    <MyButton name={t("btnRegister")} disabled={disable} onClick={() => navigate("/register-label")} />
                    {isLoading && <CircularProgress size={'25px'} color="info" />}
                    {cofirmType === 'print' && <ModalCofirm onPressOK={handlePrintOK} open={openCofirm} onClose={handleCloseConfirm} title={t("msgCofirmPrint") as string} />}
                    {/* {cofirmType === 'print-success' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgPrintSuccess") as string} />} */}
                    {cofirmType === 'print-error' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgPrintDelete") as string} />}
                    {cofirmType === 'error-data' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgChooseStamp") as string} />}
                    {cofirmType === 'print-permission' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblPrintPermission") as string} />}
                    {cofirmType === 'changedatefail' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblChangeDateFail") as string} />}
                </Stack>
                {open && <Formprint open={open} onClose={() => setOpen(false)} rows={ArrayDeleteAndPrint} />}
            </Box>
            <Stack overflow={"hidden"} sx={{ height: '100%' }}>
                <Stack sx={{ height: '50%', }}>
                    <TableCheckBox columns={columnsUp} rows={ArrayRowUps} listChx={(params: any) => { dispatch(copyValuesArrayDeleteAndPrint(params)) }} arrNotShowCell={['_id']} />
                </Stack>
                <Stack sx={{ height: '50%' }} >
                    <TableDateTimePicker columns={columnsDown} rows={ArrayRowDowns} onDoubleClick={handleDoubleClick} arrEditCell={["Size", "qty_roll", "Roll", "ywpm_Material", "Arrival_QTY", "ywsm_Production", "ZLBH_Work_Order", "ngay", "Color"]} arrNotShowCell={['_id']} />
                </Stack>
            </Stack>
        </FullScreenContainerWithNavBar>
    );
};

export default StampPrintScreen;
