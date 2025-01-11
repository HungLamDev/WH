//#region Import
import { Box, Checkbox, FormControlLabel, Grid, Modal, Stack, Typography } from "@mui/material"
import MyButton from "../../../components/MyButton"
import InputFieldV1 from "../../../components/InputField/index_new"
import { useEffect, useState } from "react"
import GenericAutocomplete from "../../../components/GenericAutocomplete"
import DatePickerFieldV1 from "../../../components/DatePickerField/index_new"
import moment from "moment"
import { connect_string } from "../../LoginScreen/ChooseFactory"
import axios from "axios"
import MyTableNewSample from "../../../components/MyTableNewSample"
import { styletext } from "../../StockinScreenv2/StockinForm"
//#endregion

const MaterialTraceSample = () => {

    //#region Columns Top1
    const columnsTop1 = [
        {
            field: "CGDATE",
            headerName: "Pur Date",
            width: "90px"
        },
        {
            field: "ZLBH",
            headerName: "Article",
            width: "80px"
        },
        {
            field: "SEASON",
            headerName: "Season",
            width: "80px"
        },
        {
            field: "Stage",
            headerName: "Stage",
            width: "80px"
        },
        {
            field: "CGNO",
            headerName: "Pur NO",
            width: "100px"
        },
        {
            field: "Qty",
            headerName: "Qty",
            width: "80px"
        },
        {
            field: "ETD",
            headerName: "ETD",
            width: "90px"
        },
        {
            field: "ZSYWJC",
            headerName: "Supplier",
            width: "250px"
        },
        {
            field: "RKStatus",
            headerName: "Deliver",
            width: "70px"
        },
    ]
    //#endregion

    //#region Columns Top2
    const columnsTop2 = [
        {
            field: "FD",
            headerName: "FD",
            width: "120px"
        },
        {
            field: "Article",
            headerName: "Article",
            width: "80px"
        },
        {
            field: "season",
            headerName: "Season",
            width: "80px"
        },
        {
            field: "kfjd",
            headerName: "Stage",
            width: "80px"
        },
        {
            field: "qty",
            headerName: "Use Stock",
            width: "120px"
        },
        {
            field: "LLQty",
            headerName: "Out Qty",
            width: "120px"
        },
        {
            field: "SamplePurchaser_Name",
            headerName: "Purchaser",
            width: "120px"
        },
        {
            field: "USERDATE",
            headerName: "UserDate",
            width: "100px"
        },
    ]
    //#endregion

    //#region Columns Top3
    const columnsTop3 = [
        {
            field: "RKNO",
            headerName: "Inbound",
            width: "120px"
        },
        {
            field: "USERDATE",
            headerName: "Date",
            width: "120px"
        },
        {
            field: "Qty",
            headerName: "Qty",
            width: "120px"
        },
        {
            field: "Memo",
            headerName: "Pur. /DL NO.",
            width: "120px"
        },
        {
            field: "SEASON",
            headerName: "Season",
            width: "120px"
        },
        {
            field: "CKBH",
            headerName: "Stage",
            width: "120px"
        },
        {
            field: "Article_All",
            headerName: "Article_All",
            width: "120px"
        },
        {
            field: "RKSB",
            headerName: "RKSB",
            width: "120px"
        },
        {
            field: "Supplier",
            headerName: "Supplier",
            width: "200px"
        },
        {
            field: "USERID",
            headerName: "UserID",
            width: "120px"
        },
        {
            field: "CKBH",
            headerName: "CKBH",
            width: "120px"
        },
        {
            field: "MEMO1",
            headerName: "MEMO1",
            width: "200px"
        },
    ]
    //#endregion

    //#region Columns Top3
    const columnsTop4 = [
        {
            field: "LLNO",
            headerName: "Outbound",
            width: "100px"
        },
        {
            field: "SCBH",
            headerName: "Article/DL NO",
            width: "120px"
        },
        {
            field: "CKBH",
            headerName: "Stage",
            width: "80px"
        },
        {
            field: "CFMDate",
            headerName: "Date",
            width: "70px"
        },
        {
            field: "Qty",
            headerName: "Qty",
            width: "100px"
        },
        {
            field: "XXCC",
            headerName: "XXCC",
            width: "50px"
        },
        {
            field: "REASON",
            headerName: "REASON",
            width: "100px"
        },
        {
            field: "KJMemo",
            headerName: "Memo",
            width: "150px"
        },
        {
            field: "CFMID",
            headerName: "CFMID",
            width: "100px"
        },
        {
            field: "Request_Person",
            headerName: "Request_Person",
            width: "120px"
        },
        {
            field: "TP",
            headerName: "TP",
            width: "50px"
        },
        {
            field: "Memo",
            headerName: "Department",
            width: "200px"
        },
        {
            field: "CKBH",
            headerName: "CKBH",
            width: "70px"
        },
    ]
    //#endregion

    //#region Variable
    const [disable, setDisable] = useState(false)
    const [matNo, setMatNo] = useState("")
    const [listWH, setListWH] = useState<any[]>([])
    const [valueWH, setValueWH] = useState<any>("")
    const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
    const [dateFrom, setDateFrom] = useState(moment().startOf('month').format("YYYY-MM-DD"));
    const [qty, setQty] = useState("");
    const [materialName, setMaterialName] = useState("");
    const [check_all_Purchase_Order, setCheck_all_Purchase_Order] = useState(false)
    const [check_all_Use_Stock, setCheck_all_Use_Stock] = useState(false)
    const [dataMatertialTraceSample1, setDataMatertialTraceSample1] = useState<any[]>([])
    const [dataMatertialTraceSample1Total, setDataMatertialTraceSample1Total] = useState<any[]>([
        {
            "SEASON": null,
            "CGDATE": null,
            "ZSYWJC": null,
            "Stage": null,
            "CGNO": null,
            "Qty": "",
            "ETD": null,
            "RKStatus": null,
            "ZLBH": 0
        }
    ])
    const [dataMatertialTraceSample2, setDataMatertialTraceSample2] = useState<any[]>([])
    const [dataMatertialTraceSample2Total, setDataMatertialTraceSample2Total] = useState<any[]>([
        {
            "YPDH": null,
            "qty": "",
            "kfjd": null,
            "season": null,
            "FD": null,
            "SamplePurchaser_Name": null,
            "USERDATE": null,
            "LLQty": "",
            "Article": 0
        }
    ])
    const [dataMatertialTraceSample3, setDataMatertialTraceSample3] = useState<any[]>([])
    const [dataMatertialTraceSample4, setDataMatertialTraceSample4] = useState<any[]>([])
    //#endregion

    //#region handleOnChange
    const handleMatNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMatNo(event.target.value);
    };

    const handleDateChange = (name: string, param: any) => {
        if (name === 'dateFrom') {
            setDateFrom(param);
        }
        if (name === 'dateTo') {
            setDateTo(param);
        }
    };

    const handleCheck_all_Purchase_Order = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheck_all_Purchase_Order(event.target.checked);
        if (matNo !== "") {
            handleMatertialTraceSample1(event.target.checked)
        }
    };

    const handleCheck_all_Use_Stock = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheck_all_Use_Stock(event.target.checked);
        if (matNo !== "") {
            handleMatertialTraceSample2(event.target.checked)
        }
    };

    const handleQTYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQty(event.target.value);
    };

    const handleMaterialNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialName(event.target.value);
    };
    //#endregion

    //#region handle Logic
    useEffect(() => {
        handleLoadDataWH()
    }, [])

    const handleLoadDataWH = () => {
        const url = connect_string + "api/get_KCCK_ERP"
        axios.post(url).then(res => {
            setListWH(res.data)
        })
    }

    const handleSearch = () => {
        if (matNo !== "") {
            Promise.all([handleMatertialTraceSample1(check_all_Purchase_Order), handleMatertialTraceSample2(check_all_Use_Stock), handleMatertialTraceSample3(), handleMatertialTraceSample4(), handleLoadQtyAndMatName()])
        }
    }

    const handleMatertialTraceSample1 = (checkbox: boolean) => {
        setDataMatertialTraceSample1([])
        setDataMatertialTraceSample1Total([])
        setDisable(true)
        const url = connect_string + "api/MatertialTraceSample1"
        const data = {
            CLBH: matNo,
            CKBH: valueWH?.CKBH,
            date_from: moment(dateFrom).format("YYYY/MM/DD"),
            date_to: moment(dateTo).format("YYYY/MM/DD"),
            check_all_Purchase_Order: checkbox
        }

        axios.post(url, data).then(res => {
            const arr = res.data.Item1.map((item: any, index: number) => ({
                ...item,
                _id: index + 1
            }))

            const arr1 = {
                ...res.data.Item2,
                _id: arr?.length + 1 || 0,
                ZLBH: res.data.Item2.cout
            }
            setDataMatertialTraceSample1Total([arr1])
            setDataMatertialTraceSample1(arr)
        }).finally(() => {
            setDisable(false)
        })
    }

    const handleMatertialTraceSample2 = (checkbox: boolean) => {
        setDataMatertialTraceSample2([])
        setDataMatertialTraceSample2Total([])
        setDisable(true)
        const url = connect_string + "api/MatertialTraceSample2"
        const data = {
            CLBH: matNo,
            CKBH: valueWH?.CKBH,
            date_from: moment(dateFrom).format("YYYY/MM/DD"),
            date_to: moment(dateTo).format("YYYY/MM/DD"),
            check_all_Use_Stock: checkbox
        }

        axios.post(url, data).then(res => {
            const arr = res.data.Item1.map((item: any, index: number) => ({
                ...item,
                _id: index + 1
            }))
            setDataMatertialTraceSample2(arr)
            const arr1 = {
                ...res.data.Item2,
                _id: arr?.length + 1 || 0,
                Article: res.data.Item2.cout
            }
            setDataMatertialTraceSample2Total([arr1])

        }).finally(() => {
            setDisable(false)
        })
    }

    const handleMatertialTraceSample3 = () => {
        setDataMatertialTraceSample3([])
        setDisable(true)
        const url = connect_string + "api/MatertialTraceSample3"
        const data = {
            CLBH: matNo,
            CKBH: valueWH?.CKBH,
            date_from: moment(dateFrom).format("YYYY/MM/DD"),
            date_to: moment(dateTo).format("YYYY/MM/DD"),
        }

        axios.post(url, data).then(res => {
            const arr = res.data.map((item: any, index: number) => ({
                ...item,
                _id: index + 1
            }))
            setDataMatertialTraceSample3(arr)

        }).finally(() => {
            setDisable(false)
        })
    }

    const handleMatertialTraceSample4 = () => {
        setDataMatertialTraceSample4([])
        setDisable(true)
        const url = connect_string + "api/MatertialTraceSample4"
        const data = {
            CLBH: matNo,
            CKBH: valueWH?.CKBH,
            date_from: moment(dateFrom).format("YYYY/MM/DD"),
            date_to: moment(dateTo).format("YYYY/MM/DD"),
        }

        axios.post(url, data).then(res => {
            const arr = res.data.map((item: any, index: number) => ({
                ...item,
                _id: index + 1,
                CFMDate: moment(item.CFMDate, "YYYY-MM-DD", true).isValid() ? moment(item.CFMDate).format("MM/DD") : ""
            }))
            setDataMatertialTraceSample4(arr)

        }).finally(() => {
            setDisable(false)
        })
    }

    const handleLoadQtyAndMatName = () => {
        setMaterialName("")
        setQty("")
        const url = connect_string + "api/Qty_Name_MatertialTraceSample"
        const data = {
            date_from: moment(dateFrom).format("YYYY/MM/DD"),
            date_to: moment(dateTo).format("YYYY/MM/DD"),
            CKBH: valueWH?.CKBH,
            CLBH: matNo
        }
        axios.post(url, data).then(res => {
            setMaterialName(res.data[0]?.Name || "")
            setQty(res.data[0]?.Qty || "")
        })
    }

    //#endregion

    return (
        <Stack height={"100%"}>
            <Stack paddingX={0.5} justifyContent={"center"} height={"10%"}>
                <Grid container spacing={1}>
                    <Grid item xs={1.5} display={'flex'}>
                        <DatePickerFieldV1
                            xsLabel={0}
                            xsDate={12}
                            valueDate={(param: any) => handleDateChange('dateFrom', param)}
                            onValueChange={dateFrom}
                        />
                    </Grid>
                    {/* Ngày cập nhật đến */}
                    <Grid item xs={1.5} display={'flex'}>
                        <DatePickerFieldV1
                            xsLabel={0}
                            xsDate={12}
                            valueDate={(param: any) => handleDateChange('dateTo', param)}
                            onValueChange={dateTo}
                        />
                    </Grid>
                    <Grid item display={"flex"} xs={1.5}>
                        <GenericAutocomplete
                            value={valueWH}
                            onChange={(newValue: any | "") => {
                                setValueWH(newValue);
                            }}
                            getOptionLabel={(option) => (typeof option === 'string' ? option : option?.CKBH || "")}
                            isOptionEqualToValue={(option, value) => {
                                if (typeof value === 'string') {
                                    return option.CKBH === value; // So sánh chuỗi với chuỗi
                                }
                                return option.CKBH === value?.CKBH; // So sánh object với object
                            }}
                            options={Array.isArray(listWH) ? listWH : []}
                        />
                    </Grid>
                    <Grid item xs={1.5} display={'flex'}>
                        <InputFieldV1
                            xsLabel={0}
                            xsInput={12}
                            label={""}
                            disable={disable}
                            value={matNo}
                            handle={handleMatNoChange}
                        />
                    </Grid>
                    <Grid item display={'flex'} justifyContent={'center'} xs={1} alignItems={"center"}>
                        {/* Nút làm mới */}
                        <MyButton height='1.7rem' name={"Search"} onClick={handleSearch} disabled={disable} />
                    </Grid>
                    <Grid item xs={1.5} display={'flex'} justifyContent={'center'}>
                        <InputFieldV1
                            xsLabel={0}
                            xsInput={12}
                            label={""}
                            disable={disable}
                            value={qty}
                        // handle={handleQTYChange}
                        />
                    </Grid>
                    <Grid item xs={3} display={'flex'} justifyContent={'center'}>
                        <InputFieldV1
                            xsLabel={0}
                            xsInput={12}
                            label={""}
                            disable={disable}
                            value={materialName}
                        //handle={handleMaterialNameChange}
                        />
                    </Grid>
                </Grid>
            </Stack>
            <Stack direction={"column"} height={'90%'} width={"100%"} overflow={"hidden"}>
                <Stack height={"50%"} borderBottom={"2px solid white"} overflow={"hidden"}>
                    <Stack direction={"row"} width={"100%"} height={"100%"} overflow={"hidden"}>
                        <Stack height={"100%"} width={"50%"} borderRight={"2px solid white"}>
                            <Box sx={{ paddingX: "20px" }}>
                                <FormControlLabel sx={[styletext, { color: "#A1D6CB" }]} control={<Checkbox size="small" checked={check_all_Purchase_Order} onChange={handleCheck_all_Purchase_Order} />} label="Show All Purchange Order" />
                            </Box>
                            <Stack overflow={"hidden"} className='table-sample-container' height={"90%"}>
                                <MyTableNewSample
                                    columns={columnsTop1}
                                    rows={dataMatertialTraceSample1}
                                    checkBox={false}
                                    lastRow={true}
                                    lastRowData={dataMatertialTraceSample1Total}
                                />
                            </Stack>
                        </Stack>

                        <Stack height={"100%"} width={"50%"}>
                            <Box sx={{ paddingX: "20px" }}>
                                <FormControlLabel sx={[styletext, { color: "#A1D6CB" }]} control={<Checkbox size="small" checked={check_all_Use_Stock} onChange={handleCheck_all_Use_Stock} />} label="Show All Use Stock" />
                            </Box>
                            <Stack overflow={"hidden"} height={'100%'} className='table-sample-container' >
                                <MyTableNewSample
                                    columns={columnsTop2}
                                    rows={dataMatertialTraceSample2}
                                    checkBox={false}
                                    lastRow={true}
                                    lastRowData={dataMatertialTraceSample2Total}
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack height={"50%"} overflow={"hidden"}>
                    <Stack height={"10%"} direction={"row"} columnGap={5} paddingX={"20px"}>
                        <Typography className="textsize" color={"#A1D6CB"}>VN=Supplier Deliver</Typography>
                        <Typography className="textsize" color={"#A1D6CB"}>DL=Transfer</Typography>
                        <Typography className="textsize" color={"#A1D6CB"}>JG=Treatment</Typography>
                        <Typography className="textsize" color={"#A1D6CB"}>SS=Normal Outbound</Typography>
                    </Stack>
                    <Stack direction={"row"} width={"100%"} height={"90%"} overflow={"hidden"}>
                        <Stack height={"100%"} width={"50%"} borderRight={"2px solid white"}>

                            <Stack overflow={"hidden"} className='table-sample-container' height={"100%"}>
                                <MyTableNewSample
                                    columns={columnsTop3}
                                    rows={dataMatertialTraceSample3}
                                    checkBox={false}

                                />
                            </Stack>
                        </Stack>

                        <Stack height={"100%"} width={"50%"}>

                            <Stack overflow={"hidden"} height={'100%'} className='table-sample-container' >
                                <MyTableNewSample
                                    columns={columnsTop4}
                                    rows={dataMatertialTraceSample4}
                                    checkBox={false}
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default MaterialTraceSample