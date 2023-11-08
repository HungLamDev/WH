//#region import
import { useTranslation } from "react-i18next";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar"
import { Autocomplete, Box, Checkbox, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import InputField from "../../../components/InputField";
import MyButton from "../../../components/MyButton";
import DatePickerField from "../../../components/DatePickerField";
import TableCheckBox from "../../../components/TableCheckBox";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { config, connect_string } from "../../../utils/api";
import { useSelector } from "react-redux";
import TableOrigin from "../../../components/TableOrigin";
import { styletext } from "../../StockinScreenv2/StockinForm";
//#endregion
const PermissionRack = () => {
    const { t } = useTranslation();
    //#region column header table
    const columns: GridColDef[] = [
        {
            field: "_id",
            headerName: t("dcpNum") as string,
            align: "center",
            editable: true,
            headerAlign: 'center',
            width: 150,
        },
        {
            field: "Rack",
            headerName: t("dcpRack") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "StartDate",
            headerName: t("dcmStart_Date") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "ModifyDate",
            headerName: t("dcpModify_Date") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Material_Type",
            headerName: t("dcpMaterial") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },

    ];
    //#endregion
    
    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region Variable
    const [rows, setRows] = useState([])
    const [listrack, setListRack] = useState<any []>([])
    const [onerowRack, setOneRowRack] = useState('')
    const [manyRackFrom, setManyRackFrom] = useState('')
    const [manyRackTo, setManyRackTo] = useState('')
    const [listManyRackTo, setListManyRackTo] = useState([])
    const [selectedValue, setSelectedValue] = useState('Update1rowRack');
    const [txtPersionID, setTxtPersonID] = useState('')
    //#endregion

    //#region Func OnChange Input
    const handleOneRowRack = (value: any) => {
        setOneRowRack(value);
    };
    const handleManyRowRackFrom = (value: any) => {
        setManyRackFrom(value);
    };
    const handleManyRowRackTo = (value: any) => {
        setManyRackTo(value);
    };

    const handleChange = (event: any) => {
        setSelectedValue(event.target.value);
    };

    const handleTxtPersionID = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTxtPersonID(event.target.value);
    };
    //#endregion

    //#region  useEffect
    useEffect( () => {
        loadComboBox()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const url = connect_string + 'api/Textchanged_Data_Storage'
        const data = {
            cbValue: manyRackFrom,
            get_version: dataUser[0].WareHouse
        }
        axios.post(url, data, config).then(response => {
            setListManyRackTo(response.data)
        })

    }, [manyRackFrom])
    //#endregion

    //#region Func Logic
    const loadComboBox = async () =>{
        const url = connect_string + 'api/load_ComboBox'
        await axios.post(url, dataUser[0].UserId, config).then(response => {
            setListRack(response.data)
        })
    }

    const handleSearch = () => {
        const url = connect_string + "api/Search_Data_Storage"
        const data = {
            User_Serial_Key: dataUser[0].UserId,
            cboRack_ID1: selectedValue === 'Update1rowRack' ? onerowRack : "",
            cboRackIDFrom: selectedValue === 'UpdateManyRack' ? manyRackFrom : "",
            cboRackIDTo: manyRackFrom ? manyRackTo : "",
            rbtUpdate1rowRack: selectedValue === 'Update1rowRack' ? true : false,
            rbtUpdateManyRack: selectedValue === 'UpdateManyRack' ? true : false,
            txtPersonID: txtPersionID,
            get_version: dataUser[0].WareHouse
        }
        axios.post(url, data, config).then(response => {
            const arr = response.data.map((item: any, index: any) => ({
                _id: index + 1,
                ...item,
            }))
            setRows(arr)

        })
    }

    const handleUpdate = () => {
        const url = connect_string + "api/Update_Data_Storage"
        const data = {
            User_Serial_Key: dataUser[0].UserId,
            cboRack_ID1: selectedValue === 'Update1rowRack' ? onerowRack : "",
            cboRackIDFrom: selectedValue === 'UpdateManyRack' ? manyRackFrom : "",
            cboRackIDTo: manyRackFrom ? manyRackTo : "",
            rbtUpdate1rowRack: selectedValue === 'Update1rowRack' ? true : false,
            rbtUpdateManyRack: selectedValue === 'UpdateManyRack' ? true : false,
            txtPersonID: txtPersionID,
            get_version: dataUser[0].WareHouse
        }
        axios.post(url, data, config).then(response => {
            if (response.data === true) {
                handleSearch()
            }

        })
    }

    const handleRefresh = () => {
        setTxtPersonID('')
        setOneRowRack('')
        setManyRackFrom('')
        setManyRackTo('')
    }
    //#endregion
    
    return (
        <FullScreenContainerWithNavBar navigate="/" sideBarDisable={true} sideBarNavigate="" title={t("lblManagement_Rack") as string} >
            <Box
                paddingX={1}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Stack justifyContent={'center'} alignItems={'center'}>
                    <Grid container marginBottom={'10px'} justifyContent={'center'} width={'70%'} alignItems={'center'}>
                        <Grid item xs={4} display={'flex'} justifyContent={'start'} >
                            <RadioGroup value={selectedValue} onChange={handleChange}>
                                <FormControlLabel
                                    sx={styletext}
                                    value="Update1rowRack"
                                    control={<Radio />}
                                    label={t("rbtUpdate1rowRack")}
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={2} paddingLeft={'20px'}>
                            <Typography className="textsize">{t("dcmRack_ID")}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            {/* <TextField
                                id="outlined-select-currency"
                                select
                                onChange={handleOneRowRack}
                                sx={{ width: '100%' }}
                                InputProps={{
                                    inputProps: {
                                        step: null,
                                    },
                                    className: "dark-bg-primary",
                                    sx: {
                                        borderRadius: "50px",
                                        color: "white",
                                        height: "2rem",
                                        "& fieldset": { borderColor: "white" },
                                    },
                                }}
                            >
                                {listrack[0] &&
                                    listrack[0].map((item: any) => (
                                        <MenuItem key={item.cbValue} value={item.cbValue}>
                                            {item.cbValue}
                                        </MenuItem>
                                    ))}
                            </TextField> */}

                            <Autocomplete
                                value={onerowRack}
                                onChange={(event: any, newValue: string | null) => {
                                    handleOneRowRack(newValue);
                                }}
                                className="dark-bg-primary"
                                disablePortal
                                options={ listrack[0] != undefined && listrack[0].map((item: any) => item.cbValue)}
                                id="combo-box-demo"
                                sx={{
                                    borderRadius: "50px",
                                    border: "1px solid",
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
                        </Grid>
                        <Grid item xs={4}></Grid>

                        <Grid item xs={4} display={'flex'} justifyContent={'start'} >
                            <RadioGroup value={selectedValue} onChange={handleChange}>
                                <FormControlLabel
                                    sx={styletext}
                                    value="UpdateManyRack"
                                    control={<Radio />}
                                    label={t("rbtUpdateManyRack")}
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={2} paddingLeft={'20px'}>
                            <Typography className="textsize">{t("lblFrom")}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            {/* <TextField
                                id="outlined-select-currency"
                                select
                                onChange={handleManyRowRackFrom}
                                sx={{ width: '100%' }}
                                InputProps={{
                                    inputProps: {
                                        step: null,
                                    },
                                    className: "dark-bg-primary",
                                    sx: {
                                        borderRadius: "50px",
                                        color: "white",
                                        height: "2rem",
                                        "& fieldset": { borderColor: "white" },
                                    },
                                }}
                            >
                                {listrack[1] &&
                                    listrack[1].map((item: any) => (
                                        <MenuItem key={item.cbValue} value={item.cbValue}>
                                            {item.cbValue}
                                        </MenuItem>
                                    ))}
                            </TextField> */}
                            <Autocomplete
                                value={manyRackFrom}
                                onChange={(event: any, newValue: string | null) => {
                                    handleManyRowRackFrom(newValue);
                                }}
                                className="dark-bg-primary"
                                disablePortal
                                options={ listrack[1] != undefined && listrack[1].map((item: any) => item.cbValue)}
                                id="combo-box-demo"
                                sx={{
                                    borderRadius: "50px",
                                    border: "1px solid",
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
                        </Grid>
                        <Grid item xs={2} paddingLeft={'20px'}>
                            <Typography className="textsize">{t("lblTo")}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            {/* <TextField
                                select
                                id="outlined-select-currency"
                                sx={{ width: '100%' }}
                                onChange={handleManyRowRackTo}
                                InputProps={{
                                    inputProps: {
                                        step: null,
                                    },
                                    className: "dark-bg-primary",
                                    sx: {
                                        borderRadius: "50px",
                                        color: "white",
                                        height: "2rem",
                                        "& fieldset": { borderColor: "white" },
                                    },
                                }}
                            >
                                {listManyRackTo &&
                                    listManyRackTo.map((item: any) => (
                                        <MenuItem key={item.cbvalue_return} value={item.cbvalue_return}>
                                            {item.cbvalue_return}
                                        </MenuItem>
                                    ))}
                            </TextField> */}
                            <Autocomplete
                                value={manyRackTo}
                                onChange={(event: any, newValue: string | null) => {
                                    handleManyRowRackTo(newValue);
                                }}
                                className="dark-bg-primary"
                                disablePortal
                                options={ listManyRackTo && listManyRackTo.map((item: any) => item.cbvalue_return)}
                                id="combo-box-demo"
                                sx={{
                                    borderRadius: "50px",
                                    border: "1px solid",
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
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3} paddingLeft={'20px'}>
                            <Typography className="textsize">{t("lblPersonID_Rack")}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="outlined-select-currency"
                                sx={{ width: '100%' }}
                                onChange={handleTxtPersionID}
                                value={txtPersionID}
                                InputProps={{
                                    inputProps: {
                                        step: null,
                                    },
                                    className: "dark-bg-primary",
                                    sx: {
                                        borderRadius: "50px",
                                        color: "white",
                                        height: "2rem",
                                        "& fieldset": { borderColor: "white" },
                                    },
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                    <Stack direction={"row"} spacing={2} alignItems={'center'}>
                        <MyButton name={t("btnSearch") as string} onClick={handleSearch} />
                        <MyButton name={t("btnUpdate_Delivery") as string} onClick={handleUpdate} />
                        <MyButton name={t("btnClean") as string} onClick={handleRefresh} />
                    </Stack>
                </Stack>
            </Box>
            <Stack overflow={"hidden"} sx={{ height: '100%' }}>
                <TableOrigin columns={columns} rows={rows} />
            </Stack>
        </FullScreenContainerWithNavBar>
    )
}
export default PermissionRack