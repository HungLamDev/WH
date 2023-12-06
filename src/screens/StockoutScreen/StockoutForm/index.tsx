//#region import
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar";
import { Box, Stack, FormControlLabel, Checkbox, Radio, Typography, Grid, FormControl, RadioGroup } from '@mui/material'
import { GridColDef } from "@mui/x-data-grid";
import MyButton from "../../../components/MyButton";
import InputField from "../../../components/InputField";
import ImportAndExport from "../../StockinScreenv2/ModelImportandExport";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addItemArrayStockout, removeArrayStockoutByBarcode, copyValuesArrayStockout, clearArrayStockout } from "../../../redux/ArrayStockout";
import moment from "moment-timezone";
import { config } from "../../../utils/api";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import DatePickerField from "../../../components/DatePickerField";
import CircularProgress from '@mui/material/CircularProgress';
import { addTotalQtyOut, clearTotalQtyOut } from "../../../redux/TotalQtyOut";
import ModalCofirm from "../../../components/ModalConfirm";
import TableCheckBox from "../../../components/TableCheckBox";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';
import { copyStockoutDetailChecked } from "../../../redux/StockoutCheckedDetail";
import QRScanner from "../../../components/QRScanner";
import { Howl } from 'howler';
import { FAILURE_SOUND_PATH, SUCCESS_SOUND_PATH, successSound } from '../../../utils/pathsound';
import { styletext } from "../../StockinScreenv2/StockinForm";
import TableCheckBoxRedux from "../../../components/TableCheckBoxRedux";
import Decimal from "decimal.js";
//#endregion
const StockoutScreen = () => {
    const location = useLocation();
    const stockout = location.state;
    const { t } = useTranslation();
    const dispatch = useDispatch()
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

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    const ArrayStockout = useSelector((state: any) => state.ArrayStockout.items);
    const TotalQtyOut = useSelector((state: any) => state.TotalQtyOut.items);
    //#endregion

    //#region Variable
    const [open, setOpen] = useState(false)
    const [modalCofirm, setModalCofirm] = useState(false)
    const [qrcode, setQRCode] = useState('')
    const [rows, setRows] = useState([])
    const [search, setSearch] = useState(false)
    const [mode, setMode] = useState(false)
    const [modalScan, setModalScan] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [chcolor, setCHColor] = useState(false)
    const [valuetotal, setValueTotal] = useState('')
    const [qrcodedelte, setQRCodeDelete] = useState('')
    const [Material_Label_Serial, setMaterial_Label_Serial] = useState('')
    const [totalqtyout, setTotalQtyOut] = useState('')
    const [dateStart, setDateStart] = useState(moment())
    const [dateEnd, setDateEnd] = useState(moment())
    const [txtMaterialNo, setTxtMaterialNo] = useState('')
    const [contentDetail, setContentDetail] = useState({})
    const [arrnotshow, setarrnotshow] = useState<string[]>(['_id', 'Value_Total', 'Material_Label_Serial'])
    const [value, setValue] = useState('A');
    const [disable, setDisable] = useState(false)
    const [stockoutDetailValue, setStockOutDetailValue] = useState(stockout && stockout[0].Value_Qty)
    const [stockoutTemp, setStockOutTemp] = useState(stockout && stockout[0].Value_Qty)
    const dataModal = {
        Value_Remain: stockout ? stockout[0].Value_Qty : "",
        chxColor: chcolor, // nếu có check xuất theo màu thì bằng true khong thì false
        rbtColor_A: chcolor === true && value === 'A' ? true : false,
        rbtColor_B: chcolor === true && value === 'B' ? true : false,
        rbtColor_C: chcolor === true && value === 'C' ? true : false,
        rbtColor_D: chcolor === true && value === 'D' ? true : false,
        rbtColor_E: chcolor === true && value === 'E' ? true : false,
        rbtColor_F: chcolor === true && value === 'F' ? true : false,
        rbtColor_G: chcolor === true && value === 'G' ? true : false,
        rbtColor_H: chcolor === true && value === 'H' ? true : false,
        rbtColor_O: chcolor === true && value === 'O' ? true : false,
    }
    //#endregion

    //#region Func OnChange Input
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMode(event.target.checked);
        setModalScan(event.target.checked);
    };

    const handleQRcode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQRCode(event.target.value);
    };

    const handleColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCHColor(event.target.checked)
    };

    const handleTxtMaterialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTxtMaterialNo(event.target.value)
    };

    const handlechxSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(true)
        if (event.target.checked !== true) {
            setSearch(false)
        }
    };
    //#endregion

    //#region useEffect
    useEffect(() => {
        const arrBarcode = ArrayStockout.map((item: any) => item.Barcode)
        const arrMaterial_No = ArrayStockout.map((item: any) => item.Material_No)
        const arrColor = ArrayStockout.map((item: any) => item.Color)
        if (stockout) {
            setContentDetail({
                chxColor: chcolor,
                Value_Material: stockout[0].Value_Material,
                Value_Qty: stockout[0].Value_Qty,
                Barcode: arrBarcode, // mảng barcode
                Material_No: arrMaterial_No, // mảng "Material_No": 
                Delivery_Serial: stockout[0].Delivery_Serial,
                list_Color: arrColor // mảng màu
            })
            //    dispatch(congTotalQtyOut(ArrayStockout.length.toString()))
            if (stockout) {
                const totalQty = ArrayStockout
                    .filter((item: any) => item.Material_No === stockout[0].Value_Material)
                    .reduce((accumulator: any, currentItem: any) => accumulator + currentItem.QTY, 0);

                const result = new Decimal(stockoutTemp).minus(totalQty).toNumber();
                // setStockOutDetailValue(stockoutTemp - totalQty)
                setStockOutDetailValue(result)

            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ArrayStockout])

    useEffect(() => {
        if (stockout) {
            dispatch(clearArrayStockout())
            dispatch(clearTotalQtyOut())
        }
    }, [])

    useEffect(() => {
        if (qrcode.length === 15 || qrcode.length === 16) {
            handleOutAll(qrcode)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qrcode])
    //#endregion

    //#region Func Logic 
    const handleScanClick = () => {
        setMode(true);
        setModalScan(true);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleScan = async (result: any | null) => {

        if (result || result.text) {
            setQRCode(result.text)
            // setModalScan(false)
            modalScan && successSound.play();
        }
    }

    const handleOutAll = (barcode: string) => {
        setDisable(true)
        setIsLoading(true)
        if (!stockout) {
            const data = {
                Version_ini: dataUser[0].WareHouse,
                txtScan: barcode,
                User_Serial_Key: dataUser[0].UserId,
                get_version: dataUser[0].WareHouse

            }
            const url = connect_string + 'api/getData_TextChange_Stock_Out'
            axios.post(url, data, config).then(response => {
                if (response.data.Barcode !== null) {
                    const item = response.data;
                    const newItem = {
                        _id: item.Barcode,
                        Barcode: item.Barcode,
                        Material_No: item.Material_No,
                        Supplier: item.Supplier,
                        Material_Name: item.Material_Name,
                        Color: item.colorValue,
                        Size: item.Size,
                        QTY: item.QTY,
                        Print_QTY: item.Print_QTY,
                        Order_No: item.Order_No,
                        Roll: item.Roll,
                        Production: item.Production,
                        Supplier_No: item.Supplier_No,
                        Work_Order: item.Work_Order,
                        ngay: moment(item.Modify_Date).format("DD/MM/YYYY HH:mm:ss"),
                        Modify_Date: moment(item.Modify_Date).format("DD/MM/YYYY HH:mm:ss"),
                        User_Serial_Key: item.User_Serial_Key,
                        Value_Total: item.Value_Total,
                        Material_Label_Serial: item.Material_Label_Serial,
                    };
                    dispatch(addItemArrayStockout(newItem));
                    // setValueTotal(response.data.Value_Total)
                    dispatch(addTotalQtyOut(response.data.Value_Qty_Out))
                    setQRCode('')

                }
            }).finally(() => {
                setDisable(false)
                setIsLoading(false)
            })

        }
        else {
            const url = connect_string + 'api/getData_TextChange_Stock_Out_Detail'
            const data = {
                txtScan: barcode,
                User_Serial_Key: dataUser[0].UserId,
                txtQty: "",
                Value_Qty_Out: "",
                Value_Total: "",
                Value_Remain: stockout[0].Value_Qty,
                Check_ScanMore: rows.findIndex((item: any) => item.Barcode == qrcode) != -1, //nếu tồn tại barcode trong bảng thì true không thì fale
                chxColor: chcolor, // nếu có check xuất theo màu thì bằng true khong thì false
                rbtColor_A: chcolor === true && value === 'A' ? true : false,
                rbtColor_B: chcolor === true && value === 'B' ? true : false,
                rbtColor_C: chcolor === true && value === 'C' ? true : false,
                rbtColor_D: chcolor === true && value === 'D' ? true : false,
                rbtColor_E: chcolor === true && value === 'E' ? true : false,
                rbtColor_F: chcolor === true && value === 'F' ? true : false,
                rbtColor_G: chcolor === true && value === 'G' ? true : false,
                rbtColor_H: chcolor === true && value === 'H' ? true : false,
                rbtColor_O: chcolor === true && value === 'O' ? true : false,
                get_version: dataUser[0].WareHouse

            }
            axios.post(url, data, config).then(response => {
                if (response.data.Barcode !== null) {

                    response.data.map((item: any, index: any) => {
                        const newItem = {
                            _id: item.Barcode,
                            Barcode: item.Barcode,
                            Material_No: item.Material_No,
                            Supplier: item.Supplier,
                            Material_Name: item.Material_Name,
                            Color: item.colorValue,
                            Size: item.Size,
                            QTY: item.QTY,
                            Print_QTY: item.Print_QTY,
                            Order_No: item.Order_No,
                            Roll: item.Roll,
                            Production: item.Production,
                            Supplier_No: item.Supplier_No,
                            Work_Order: item.Work_Order,
                            ngay: moment(item.Modify_Date).format("DD/MM/YYYY HH:MM:SS"),
                            User_Serial_Key: item.User_Serial_Key,
                            Value_Total: item.Value_Total,
                            Material_Label_Serial: item.Material_Label_Serial,
                            Modify_Date: moment(item.Modify_Date).format("DD/MM/YYYY HH:MM:SS"),

                        };
                        dispatch(addItemArrayStockout(newItem));
                        if (response.data[0].Material_No === stockout[0].Value_Material) {
                            dispatch(addTotalQtyOut(response.data[0].Value_Qty_Out))
                            const result = new Decimal(stockoutTemp).minus(response.data[0].Value_Qty_Out).toNumber();
                            //  setStockOutDetailValue(stockoutDetailValue - response.data[0].Value_Qty_Out)
                            setStockOutDetailValue(result)
                        }
                    });
                    setValueTotal((TotalQtyOut - response.data[0].Value_Remain).toString())
                    setQRCode('')

                    // dispatch(addTotalQtyOut(response.data[0].Value_Qty_Out + " | " + ArrayStockout.length))
                }

            }).finally(() => {
                setDisable(false)
                setIsLoading(false)
            })
        }

    }

    const getValueDate = ((params: any, dtp_name: string) => {
        if (dtp_name === 'dateStart') {
            setDateStart(params)
        }
        else {
            setDateEnd(params)
        }
    })

    const RowClick = (params: any, item: any) => {
        setValueTotal(item.QTY)
    }

    const handleDoubleClick = (params: any, item: any) => {
        setModalCofirm(true)
        setQRCodeDelete(item.Barcode)
        setMaterial_Label_Serial(item.Material_Label_Serial)
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
                if (stockout && result.Material_No === stockout[0].Value_Material) {
                    const cal = String(Number(TotalQtyOut) - Number(result.QTY));
                    dispatch(addTotalQtyOut(cal))
                }
                dispatch(removeArrayStockoutByBarcode(qrcodedelte))
            }
        }).finally(() => {
            setDisable(false)
        })
    }

    const handleSearchMaterialNo = (event: any) => {
        if (event.key === 'Enter') {
            const url = connect_string + "/api/ctrl_k"
            const data = {
                txtMaterial_Visible: search,
                txtMaterial: txtMaterialNo,
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
        }
    }

    const handleRowSelectionModelChange = (params: any) => {
        const selectedRowIds = params ? params.map((item: any) => parseInt(item._id.toString())) : [];
        const selectedRows = ArrayStockout.filter((row: any) => selectedRowIds.includes(row._id));
        dispatch(copyStockoutDetailChecked(selectedRows))
    };
    //#endregion

    return (
        <FullScreenContainerWithNavBar hidden={true} state={contentDetail} sideBarDisable={false} onShowScan={handleScanClick} sideBarNavigate="/list-stockout" title={t("lblStock_Out")} navigate={stockout ? "/delivery" : "/"}>
            <Box
                paddingX={1}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Stack direction={'row'}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '10px' }}>
                        <Stack width={'60%'} direction={'row'}>
                            <Stack width={'70%'} >
                                <Grid container>
                                    <Grid container>
                                        <Grid container >
                                            <Grid item xs={stockout ? 4 : 6}>
                                                <FormControlLabel
                                                    sx={styletext}
                                                    control={<Checkbox defaultChecked={false} onChange={handleChangeMode} />}
                                                    label={t("gpbMode")}
                                                />
                                            </Grid>
                                            {
                                                stockout &&
                                                <Grid item xs={4}>

                                                    <FormControlLabel
                                                        sx={styletext}
                                                        control={<Checkbox defaultChecked={false} onChange={handleColor} />}
                                                        label={t("dcmColor")}
                                                    />

                                                </Grid>
                                            }
                                            <Grid item xs={stockout ? 4 : 6}>
                                                <FormControlLabel
                                                    sx={styletext}
                                                    control={<Checkbox defaultChecked={false} onChange={handlechxSearch} />}
                                                    label={t("btnSearch")}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                <FormControlLabel sx={styletext} value="much" control={<Radio defaultChecked />} label={t("robBatch")} />
                                            </Grid>
                                            {/* màu */}
                                            {chcolor &&
                                                <>
                                                    <Grid item xs={7}>
                                                        <FormControl>
                                                            <RadioGroup
                                                                row
                                                                value={value}
                                                                onChange={handleChange}
                                                            >
                                                                <FormControlLabel sx={styletext} value="A" control={<Radio />} label="A" />
                                                                <FormControlLabel sx={styletext} value="B" control={<Radio />} label="B" />
                                                                <FormControlLabel sx={styletext} value="C" control={<Radio />} label="C" />
                                                                <FormControlLabel sx={styletext} value="D" control={<Radio />} label="D" />
                                                                <FormControlLabel sx={styletext} value="O" control={<Radio />} label="O" />
                                                                <FormControlLabel sx={styletext} value="E" control={<Radio />} label="E" />
                                                                <FormControlLabel sx={styletext} value="F" control={<Radio />} label="F" />
                                                                <FormControlLabel sx={styletext} value="G" control={<Radio />} label="G" />
                                                                <FormControlLabel sx={styletext} value="H" control={<Radio />} label="H" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Grid>
                                                </>
                                            }
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} display={'flex'} flexDirection={'row'}>
                                            <InputField focus={true} label={t("gpbScan") as string} handle={handleQRcode} value={qrcode} />
                                            {isLoading && <CircularProgress size={'25px'} color="info" />}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack width={'30%'} >
                                <Grid container rowSpacing={2} >
                                    <Grid item xs={12} justifyContent={'flex-end'} display={'flex'} paddingLeft={'5px'}>
                                        {search &&
                                            <InputField handle={handleTxtMaterialNo} label="" keydown={handleSearchMaterialNo} value={txtMaterialNo} disable={disable} />
                                        }
                                    </Grid>
                                    <Grid item xs={12} justifyContent={'flex-end'} display={'flex'} paddingRight={'16px'}>
                                        {search &&
                                            <DatePickerField label={''} valueDate={(params: any) => { getValueDate(params, 'dateStart') }} />
                                        }
                                    </Grid>
                                    <Grid item xs={12} justifyContent={'flex-end'} display={'flex'} paddingRight={'16px'}>
                                        {search &&
                                            <DatePickerField label={''} valueDate={(params: any) => { getValueDate(params, 'dateEnd') }} />
                                        }
                                    </Grid>
                                </Grid>
                            </Stack>

                        </Stack>
                        <Stack width={'40%'} justifyContent={'center'} spacing={2}>
                            <Grid container spacing={4}>
                                <Grid item >
                                    <MyButton name={t("btnConfirm")} disabled={true} />
                                </Grid>
                                <Grid item>
                                    <MyButton name={t("dcpExport")} onClick={handleOpen} disabled={disable} />
                                    <ImportAndExport dataColor={dataModal} onClose={handleClose} open={open} form={'stockout'} />
                                </Grid>
                            </Grid>
                            {/* tổng */}
                            <Typography className="textsize">{t("lblQty_In")} {stockout ? stockoutDetailValue : valuetotal}</Typography>
                            {/* tổng xuất */}
                            <Typography className="textsize">{t("lblQty_Out")} {TotalQtyOut}</Typography>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <Stack sx={{ height: '100%', overflow: 'hidden' }}>
                <TableCheckBoxRedux chxColor={chcolor} listChx={handleRowSelectionModelChange} tableName="stockout-detail" columns={columns} rows={ArrayStockout} onDoubleClick={handleDoubleClick} handlerowClick={RowClick} arrNotShowCell={arrnotshow} />
                {modalCofirm && <ModalCofirm onPressOK={handleOK} open={modalCofirm} onClose={() => setModalCofirm(false)} title={t("msgYouWantUpdate") + qrcodedelte} />}
                {modalScan && <QRScanner onScan={handleScan} open={modalScan} onClose={() => { setModalScan(false); setMode(false); }} />}
            </Stack>
        </FullScreenContainerWithNavBar>

    );
};


export default StockoutScreen;
