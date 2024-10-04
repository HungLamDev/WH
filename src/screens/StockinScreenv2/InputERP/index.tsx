//#region Import
import { Autocomplete, Box, Checkbox, Divider, FormControlLabel, FormGroup, Grid, IconButton, Modal, Stack, TextField, Typography } from "@mui/material"
import { useTranslation } from "react-i18next";
import { BiArrowBack } from "react-icons/bi";
import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { styletext } from "../StockinForm";
import MyButton from "../../../components/MyButton";
import TableCheckBox from "../../../components/TableCheckBox";
import TableOrigin from "../../../components/TableOrigin";
import DatePickerFieldV1 from "../../../components/DatePickerField/index_new";
import InputFieldV1 from "../../../components/InputField/index_new";
import { listSupplier } from "../../DeliveryScreen/Data";
import MyAutocomplete from "../../../components/Autocomplete";
import { GridColDef } from "@mui/x-data-grid";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import { useSelector } from "react-redux";
import axios from "axios";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListboxComponent from "./list_autocomplete";
import { debounce, random } from "lodash";
import useDebounced from "../../../components/CustomHook/useDebounce";
import TableCheckBoxSimple from "../../../components/TableCheckBox/TableCheckBoxSimple";

//#endregion


interface InputERPProps {
    open?: any,
    onClose?: any
}

//#region Style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    bgcolor: '#1c2538',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column'

};
//#endregion

const InputERP = (props: InputERPProps) => {
    const { open, onClose } = props
    const { t } = useTranslation();

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion


    //#region column header table
    const columnsTop: GridColDef[] = [
        {
            field: '_id',
            headerName: "",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'RKNO_Stock_In_No',
            headerName: "RKNO No",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'F_Factory',
            headerName: "Fac.",
            width: 150,
            headerClassName: 'custom-header'
        },
        {
            field: 'WH',
            headerName: "WH",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Supplier_No',
            headerName: t("lblSupplier") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Print_Date',
            headerName: t("dcpPrint_Date") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Order_No',
            headerName: t("dcpNum_No") as string,
            width: 300,
            headerClassName: 'custom-header'
        },
        {
            field: 'DOCNO',
            headerName: "DOCNO",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Material_No',
            headerName: t("dcmMaterial_No") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "Qty",
            headerName: "QtyWH",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "RKQty",
            headerName: "RKQty",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "Get_Total_RY_ERP",
            headerName: "RYQty",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "QC",
            headerName: "QC",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "Remark",
            headerName: t("dcpRemak_RY") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "CFMID",
            headerName: "CFMID",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "YN",
            headerName: "YN",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "Value_HGLB",
            headerName: "HGLB",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "RKSB",
            headerName: "RKSB",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "CostID",
            headerName: "CostID",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "User_Confirm",
            headerName: "UserID",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "Date_Confirm",
            headerName: "UserDate",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "Label_Status",
            headerName: "Label_Status",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "Confirm_Status",
            headerName: "Confirm",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "IsClock",
            headerName: "IsClock",
            width: 160,
            headerClassName: 'custom-header'
        },
    ];

    const columnsLeft: GridColDef[] = [
        {
            field: 'RKNO_Stock_In_No',
            headerName: "RKNO No",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'F_Factory',
            headerName: "Fac.",
            width: 150,
            headerClassName: 'custom-header'
        },
        {
            field: 'WH',
            headerName: "WH",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Supplier_No',
            headerName: t("lblSupplier") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'Order_No',
            headerName: t("dcpNum_No") as string,
            width: 300,
            headerClassName: 'custom-header'
        },
        {
            field: "Value_HGLB",
            headerName: "HGLB",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "User_Confirm",
            headerName: "UserID",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "Date_Confirm",
            headerName: "UserDate",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "CFMID",
            headerName: "CFMID",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "YN",
            headerName: "YN",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'DOCNO',
            headerName: "DOCNO",
            width: 160,
            headerClassName: 'custom-header'
        },
    ];

    const columnsRight: GridColDef[] = [
        {
            field: '_id',
            headerName: "",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'RKNO',
            headerName: "RKNO No",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'CLBH',
            headerName: t("dcmMaterial_No") as string,
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: 'ZLBH',
            headerName: "RY",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "RKSB",
            headerName: "RKSB",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "Qty",
            headerName: "Qty",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "PaQty",
            headerName: "PaQty",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "CostID",
            headerName: "CostID",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "CNO_HGLB",
            headerName: "CNO HGBH",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "HGPM",
            headerName: "HGPM",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "UserID",
            headerName: "UserID",
            width: 160,
            headerClassName: 'custom-header'
        },
        {
            field: "YN",
            headerName: "YN",
            width: 160,
            headerClassName: 'custom-header'
        },
    ];
    //#endregion

    //#region Variable
    const [supplier, setSupplier] = useState<any>(null)
    const [listSupplier, setListSupplier] = useState([])
    const [materialNo, setMaterialNo] = useState("")
    const [orderNo, setOrderNo] = useState("")
    const [chxQC, setChxQC] = useState(true)
    const [materialName, setMaterialName] = useState("")
    const [dateFrom, setDateFrom] = useState(moment());
    const [dateTo, setDateTo] = useState(moment());
    const [chxHQ, setChxHQ] = useState(false)
    const [chxDNK, setChxDNK] = useState(false)
    const [dataTop, setDataTop] = useState<any[]>([])
    const [originalDataTop, setOriginalDataTop] = useState([])
    const [dataBottomLeft, setDataBottomLeft] = useState([])
    const [dataBottomRight, setDataBottomRight] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [listCheckData, setListCheckData] = useState<any[]>([]);


    //#endregion

    //#region handleOnchange
    const handleMaterialNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialNo(event.target.value);
    };

    const handleOrderNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNo(event.target.value);
    };

    const handleQCChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChxQC(event.target.checked);
    };

    const handleMaterialNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialName(event.target.value);
    };

    const handleDateChange = (name: string, param: any) => {
        if (name === 'dateFrom') {
            setDateFrom(param);
        }
        if (name === 'dateTo') {
            setDateTo(param);
        }
    };

    const handleHQChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChxHQ(event.target.checked);
        if (event.target.checked === true) {
            const filteredData = dataTop.filter((item: any) => item?.Value_HGLB !== "");
            setDataTop(filteredData);
        } else {
            setDataTop(originalDataTop);
        }
    };

    const handleDNKChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChxDNK(event.target.checked);
        if (event.target.checked === true) {
            const filteredData = dataTop.filter((item: any) => item?.RKNO_Stock_In_No === "" && item?.Get_Total_RY_ERP !== "0");
            setDataTop(filteredData);
        } else {
            setDataTop(originalDataTop);
        }
    };



    //#endregion

    //#region  handleLogic

    useEffect(() => {
        handleLoadCombobox()
    }, [])

    const handleClearData = () => {
        setSupplier(null)
        setMaterialNo("")
        setOrderNo("")
        setMaterialName("")
        setChxHQ(false)
        setChxDNK(false)
        setDataTop([])
        setDataBottomLeft([])
        setDataBottomRight([])
    }

    const handleSearchData = () => {
        setLoading(true)
        const url = connect_string + 'api/Search_Data_Input_ERP'
        const data = {
            User_Serial_Key: dataUser[0].UserId,
            dtpFrom_Date: moment(dateFrom).format("YYYY-MM-DD"),
            dtpTo_Date: moment(dateTo).format("YYYY-MM-DD"),
            Value_Supplier: supplier?.value,
            cboSupplier: supplier?.label,
            txtOrder_No: orderNo,
            txtMaterial_No: materialNo,
            txtMaterial_Name: materialName,
            chxCheck_QC: chxQC
        }

        axios.post(url, data).then(res => {
            const arr = res?.data?.map((item: any, index: any) => ({
                _id: index + 1,
                ...item
            }))
            setDataTop(arr)
            setOriginalDataTop(arr)
            setLoading(false)
            setChxDNK(false)
            setChxHQ(false)
            setDataBottomLeft([])
            setDataBottomRight([])
        }).catch(() => {
            setLoading(false)
        })
    }

    const handleLoadCombobox = () => {
        const url = connect_string + 'api/load_data_combobox_input_ERP'
        axios.post(url).then(res => {
            const arr = res?.data?.map((item: any, index: number) => ({
                label: item?.zsywjc,
                id: index,
                value: item?.zsdh
            }))
            setListSupplier(arr)
        })
    }

    // Debounce the input value to delay search
    const debouncedInputValue = useDebounced(inputValue, 300);

    const filteredSuppliers = useMemo(() => {
        return listSupplier.filter((supplier: any) =>
            supplier.label.toLowerCase().includes(debouncedInputValue.toLowerCase())
        );
    }, [debouncedInputValue, listSupplier]);

    const handlerowClick = (params: any, item: any) => {
        setDataBottomLeft([])
        setDataBottomRight([])
        if (item?.RKNO_Stock_In_No !== "") {
            setDataBottomLeft([item] as never)
            setLoading(true)
            const url = connect_string + 'api/show_List_RY_KCRKS'
            const data = {
                RKNO: item?.RKNO_Stock_In_No,
                Order_No: item?.Order_No,
                Material_No: item?.Material_No,
                Qty_In: item?.RKQty,
                User_Serial_Key: dataUser[0].UserId,
            }

            axios.post(url, data).then(res => {
                const arr = res?.data?.map((item: any, index: any) => ({
                    _id: index + 1,
                    ...item
                }))
                setDataBottomRight(arr)
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
        }
    }

    const handleConfirm = () => {
        console.log(listCheckData)
        // const arr = listCheckData.map(item => ({
        //     ...item,
        //     ID: item?._id
        // }))
        // const url = connect_string + "api/input_in_ERP"
        // const data =
        // {
        //     list_set: arr,
        //     user_id_login: dataUser[0].UserId
        // }
        // axios.post(url, data).then(res => {
        //     const items = dataTop.map((item1: any) => {
        //         const matchedItem = res?.data?.find((item2: any) => item2.id == item1._id)
        //         return {
        //             ...item1,
        //             Input_In_ERP_Serial: matchedItem ? matchedItem?.Input_In_ERP_Serial_new : item1?.Input_In_ERP_Serial,
        //             RKNO_Stock_In_No: matchedItem ? matchedItem?.RKNO_Stock_In_No_new : item1?.RKNO_Stock_In_No
        //         }
        //     })
        //     setDataTop(items)
        // })

    }

    const checkCondition = (row: any) => {
        return (
            row?.Get_Total_RY_ERP !== "0" && 
            row?.Value_HGLB !== ""
        );
    };

    const handleCheckItemClick = (rowInd: number, colName: string, value: boolean) => {
        if (value === true) {
            dataTop[rowInd][colName] = "1";
        }
        else {
            dataTop[rowInd][colName] = "0";
        }
    };

    const determineCheckedState = (row: any, field: string) => {
        return row[field] === '1';
      };
    


    //#endregion

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack>
                    <Stack alignItems={"center"}>
                        <Stack width={'100%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <IconButton className={'back-button'} onClick={onClose}>
                                <BiArrowBack className="icon-wrapper" />
                            </IconButton>
                            {/* Tiêu đề */}
                            <Typography variant="h4" component="h4" color={'white'}>{t("btnEnter_Stock") + " ERP" as string}</Typography>
                            <Typography></Typography>
                        </Stack>
                        <Divider
                            light={true}
                            sx={{
                                width: "60%",
                                borderColor: "white",
                            }}
                        />
                    </Stack>
                    <Stack alignItems={'center'} paddingTop={1}>
                        <Grid container rowGap={1} width={'80%'} justifyContent={'center'}>
                            {/* Nhà cung ứng */}
                            <Grid item xs={5} display={'flex'} justifyContent={'center'}>
                                <Stack
                                    direction={"row"}
                                    alignItems={"center"}
                                    width={'100%'}
                                >
                                    <Grid container alignItems={'center'} flexWrap={'nowrap'} columnGap={'5px'}
                                    >
                                        <Grid item xs={4} display={'flex'} >
                                            <Typography className="textsize" sx={{ wordBreak: 'break-word' }}>{t("dcpSupplier") as string}</Typography>
                                        </Grid>
                                        <Grid item xs={7} flexShrink={0}>
                                            <Autocomplete
                                                value={supplier}
                                                onInputChange={(event: any, newValue: string) => {
                                                    setInputValue(newValue);
                                                }}
                                                onChange={(event: any, newValue: string | null) => {
                                                    setSupplier(newValue);
                                                }}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter') {
                                                        event.defaultPrevented = true;
                                                        handleSearchData();
                                                    }
                                                }}
                                                className="dark-bg-primary"
                                                disablePortal
                                                options={Array.isArray(filteredSuppliers) ? filteredSuppliers : []}
                                                id="combo-box-demo"
                                                getOptionLabel={(option: any) => option?.label}
                                                isOptionEqualToValue={(option: any, value: any) => option?.id === value?.id} // Compare by id
                                                sx={{
                                                    borderRadius: "50px",
                                                    border: "1px solid",
                                                    width: '100%',
                                                    "& .MuiInputBase-root": {
                                                        height: "2rem",
                                                        paddingX: '14px',
                                                        paddingY: '0px',
                                                        '@media screen and (max-width: 1200px)': {
                                                            height: "1.8rem !important",
                                                        },
                                                        '@media screen and (max-width: 900px)': {
                                                            height: "1.5rem !important",
                                                        },
                                                    },
                                                }}
                                                renderInput={(params: any) => (
                                                    <TextField
                                                        {...params}
                                                        className="dark-bg-primary"
                                                        sx={{
                                                            borderRadius: "50px",
                                                            color: "white",
                                                            height: "2rem",
                                                            "& fieldset": {
                                                                borderColor: "white",
                                                                border: "none",
                                                            },
                                                            "& .MuiInputBase-input": {
                                                                '@media screen and (max-width: 1200px)': {
                                                                    fontSize: '14px',
                                                                },
                                                                '@media screen and (max-width: 900px)': {
                                                                    fontSize: '12px',
                                                                },
                                                            },
                                                            '@media screen and (max-width: 1200px)': {
                                                                height: "1.8rem",
                                                            },
                                                            '@media screen and (max-width: 900px)': {
                                                                height: "1.5rem",
                                                            },
                                                        }}
                                                        ListboxComponent={ListboxComponent}
                                                    />
                                                )}
                                                renderOption={(props, option) => (
                                                    <li {...props} key={option.id}>
                                                        {option.label}
                                                    </li>
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={1} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                                <Typography className="textsize" color={'#41A2E4'}>{supplier?.value}</Typography>
                            </Grid>
                            {/* Mã vật tư */}
                            <Grid item xs={5} display={'flex'} justifyContent={'center'} >
                                <InputFieldV1
                                    label={t("dcmMaterial_No") as string}
                                    handle={handleMaterialNoChange}
                                    keydown={null}
                                    value={materialNo}
                                    disable={loading}
                                />
                            </Grid>
                            {/* Đơn hàng */}
                            <Grid item xs={5} display={'flex'} justifyContent={'center'}>
                                <InputFieldV1
                                    label={t("dcpNum_No") as string}
                                    handle={handleOrderNoChange}
                                    keydown={null}
                                    value={orderNo}
                                    disable={loading}
                                />
                            </Grid>
                            {/* Check qc */}
                            <Grid item xs={1} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                                <FormGroup>
                                    <FormControlLabel className="text" sx={styletext} control={<Checkbox sx={{ color: 'white' }} checked={chxQC} onChange={handleQCChange} />} label={"QC"} />
                                </FormGroup>
                            </Grid>
                            {/* Tên vật tư */}
                            <Grid item xs={5} display={'flex'} justifyContent={'center'}>
                                <InputFieldV1
                                    label={t("dcmMaterial_Name") as string}
                                    handle={handleMaterialNameChange}
                                    keydown={null}
                                    value={materialName}
                                    disable={loading}
                                />
                            </Grid>
                            {/* Từ ngày */}
                            <Grid item xs={5} display={'flex'} justifyContent={'center'} >
                                <DatePickerFieldV1
                                    label={t("lblFromDate") as string}
                                    valueDate={(param: any) => handleDateChange('dateFrom', param)}
                                    readonly={loading}
                                />
                            </Grid>
                            <Grid item xs={1} ></Grid>
                            {/* Đến ngày */}
                            <Grid item xs={5} display={'flex'} justifyContent={'center'}>
                                <DatePickerFieldV1
                                    label={t("lblToDate") as string}
                                    valueDate={(param: any) => handleDateChange('dateTo', param)}
                                    readonly={loading}
                                />
                            </Grid>
                        </Grid>
                        <Stack flexDirection={'row'} gap={2} paddingY={1}>
                            {/* Mã hải quan */}
                            <FormGroup>
                                <FormControlLabel className="text" sx={styletext} control={<Checkbox sx={{ color: 'white' }} checked={chxHQ} onChange={handleHQChange} />} label={"Mã hải quan"} />
                            </FormGroup>
                            {/* Đơn nhập kho */}
                            <FormGroup>
                                <FormControlLabel className="text" sx={styletext} control={<Checkbox sx={{ color: 'white' }} checked={chxDNK} onChange={handleDNKChange} />} label={"Đơn nhập kho"} />
                            </FormGroup>
                            {/* Nút tìm kiếm */}
                            <MyButton name={t('btnSearch')} onClick={handleSearchData} disabled={loading} />
                            {/* Nút xuất excel */}
                            <MyButton name={t('btnExcel')} onClick={undefined} disabled={loading} />
                            {/* Nút làm mới */}
                            <MyButton name={t('btnClean')} onClick={handleClearData} disabled={loading} />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack height={'100%'} overflow={'hidden'}>
                    <Stack height={'55%'} overflow={'hidden'} borderTop={'1px solid white'}>
                        <TableCheckBoxSimple
                            tableName="inputERP"
                            selectedAll={false}
                            columns={columnsTop}
                            rows={dataTop}
                            onDoubleClick={null}
                            handlerowClick={handlerowClick}
                            arrEditCell={['DOCNO']}
                            listChx={(value: any) => setListCheckData(value)}
                            isCheckAllowed={checkCondition}
                            arrCheckedCell={['QC']}
                            determineCheckedState={determineCheckedState}
                            handleCheckItemClick={handleCheckItemClick}
                        />
                    </Stack>
                    <Stack height={'45%'} direction={'row'} overflow={'hidden'} borderTop={'1px solid white'}>
                        <Stack width={'40%'} borderRight={'1px solid white'} >
                            <Stack height={'85%'} overflow={"hidden"}>
                                <TableOrigin
                                    columns={columnsLeft}
                                    rows={dataBottomLeft}
                                    arrNotShowCell={['_id']}
                                />
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} height={'15%'} justifyContent={'flex-end'} paddingX={1} gap={1} >
                                {/* Nút kiểm tra */}
                                <MyButton name={t('btnCheck_Data')} onClick={undefined} customClass='customBtn' disabled={false} />
                            </Stack>
                        </Stack>
                        <Stack width={'60%'}>
                            <Stack height={'85%'} overflow={"hidden"}>
                                <TableOrigin columns={columnsRight} rows={dataBottomRight} />
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} height={'15%'} justifyContent={'space-between'} paddingX={1} gap={1} >
                                <Typography className="textsize" color={'#41A2E4'}>Total Qty: {dataBottomRight[dataBottomRight.length - 1]?.Value_Total_Qty} </Typography>
                                {/* Nút xác nhận */}
                                <MyButton name={t('btnConfirm_Out')} onClick={handleConfirm} customClass='customBtn' disabled={false} />
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}

export default InputERP


