//#region import
import { useTranslation } from "react-i18next";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar"
import { Box, Checkbox, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import InputField from "../../../components/InputField";
import MyButton from "../../../components/MyButton";
import TableCheckBox from "../../../components/TableCheckBox";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { config } from "../../../utils/api";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import { useSelector } from "react-redux";
import TableOrigin from "../../../components/TableOrigin";
import DatePickerField from "../../../components/DatePickerField";
import { styletext } from "../../StockinScreenv2/StockinForm";
import md5 from "md5";
//#endregion
const UserForm = () => {
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
            field: "User_ID",
            headerName: t("dcpInspectorID") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "User_Name",
            headerName: t("dcmUser_Name") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Group_Name",
            headerName: t("dcmGroup_Name") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Start_Date",
            headerName: t("dcmStart_Date") as string,
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Leave_Date",
            headerName: t("dcmLeave_Date") as string,
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
    const [listGroupUser, setListGroupUser] = useState<any []>([])
    const [userName, setUserName] = useState('')
    const [groupUser, setGroupUser] = useState('')
    const [userID, setUserID] = useState('')
    const [password, setPassword] = useState('')
    const [userSerialKey, setUserSerialKey] = useState('')
    const [startDate, setStartDate] = useState(moment())
    const [leaveDate, setLeaveDate] = useState(moment())
    const [lblUserName, setLblUserName] = useState(false)
    //#endregion

    //#region Func OnChange Input
    const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };
    const handleGroupUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupUser(event.target.value);
    };
    const handleUserID = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserID(event.target.value);
    };
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handlelblUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLblUserName(event.target.checked);
    };
    //#endregion

    //#region useEffect
    useEffect(() => {
        const url = connect_string + 'api/Load_Data_Combo_Box_User'
        const data = {
            User_Serial_Key: dataUser[0].UserId,
            get_version: dataUser[0].WareHouse

        }
        axios.post(url, data, config).then(response => {
            setListGroupUser(response.data)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //#endregion
   
    //#region Func Logic

    const handleSearch = () => {
        const url = connect_string + "api/Get_Data_User"
        const data = {
            User_Serial_Key: dataUser[0].UserId,
            cboGroup_Name: groupUser,
            txtUserID: userID,
            txtUser_Name: userName,
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
    const getValueDate = ((params: any, dtp_name: string) => {
        if (dtp_name === 'startDate') {
            setStartDate(params)
        }
        else {
            setLeaveDate(params)
        }
    })
    
    const handleUpdate = () => {

        const url = connect_string + "api/Save_Data_User"
        const data = {
            User_Serial_Key: dataUser[0].UserId, 
            txtUserID: userID,
            txtUser_Name: userName,
            txtUser_Password: password,
            cboGroup_Name: groupUser,
            txtUser_Serial_Key: userSerialKey,
            dtpStart_Date: startDate.format("YYYY-MM-DD"),
            dtpLeave_Date: leaveDate.format("YYYY-MM-DD"),
            lblUser_Name: false,
            get_version: dataUser[0].WareHouse,
            cboGroup_Serial_Key: listGroupUser.filter((item: any) =>  item.cbxText === groupUser)[0].cbxValue
        }
        
        axios.post(url, data, config).then(response => {
            if (response.data.length > 0) {
                const arr = response.data.map((item: any, index: any) => ({
                    _id: index + 1,
                    ...item,
                }))
                setRows(arr)
            }

        })
    }

    const handleRowClick = (columName: string,params: any) =>{
        setUserName(params.User_Name)
        setUserID(params.User_ID)
        setGroupUser(params.Group_Name)
        setUserSerialKey(params.User_Serial_Key)
        setPassword(params.User_Password)
    }

    const handleRefresh = () => {
        setUserName('')
        setUserID('')
        setGroupUser('')
        setPassword('')
    }
    //#endregion
    
    return (
        <FullScreenContainerWithNavBar navigate="/" sideBarDisable={true} sideBarNavigate="" title={t("btnUser") as string} >
            <Box
                paddingX={1}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Stack justifyContent={'center'} alignItems={'center'}>
                    <Grid container marginBottom={'10px'} justifyContent={'center'} width={'95%'} alignItems={'center'}>
                        <Grid item xs={0.5} >
                            <FormControlLabel
                                control={<Checkbox value={lblUserName} onChange={handlelblUserName}/>}
                                label={null}
                            />
                        </Grid>
                        <Grid item xs={1.5} >
                            <Typography className="textsize">{t("dcmUser_Name")}</Typography>
                        </Grid>
                        <Grid item xs={4} display={'flex'}>
                            <TextField
                                id="outlined-select-currency"
                                value={userName} 
                                onChange={handleUserName}
                                sx={{ width: '80%', marginTop: '10px' }}
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
                        
                        <Grid item xs={2} >
                            <Typography className="textsize">{t("dcpInspectorID")}</Typography>
                        </Grid>
                        <Grid item xs={4} display={'flex'}>
                            <TextField
                                id="outlined-select-currency"
                                value={userID}
                                onChange={handleUserID}
                                sx={{ width: '80%', }}
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
                        <Grid item xs={0.5} > </Grid>
                        <Grid item xs={1.5} >
                            <Typography className="textsize">{t("dcmGroup_Name")}</Typography>
                        </Grid>
                        <Grid item xs={4} display={'flex'}>
                            <TextField
                                id="outlined-select-currency"
                                value={groupUser}
                                select
                                onChange={handleGroupUser}
                                sx={{ width: '80%', marginTop: '10px' }}
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
                                {listGroupUser && listGroupUser.map((item: any) => (
                                    <MenuItem key={item.cbxText} value={item.cbxText}>
                                        {item.cbxText}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography className="textsize">{t("lblPassword")}</Typography>
                        </Grid>
                        <Grid item xs={4} display={'flex'}>
                            <TextField
                                id="outlined-select-currency"
                                value={password}
                                autoComplete="off"
                                onChange={handlePassword}
                                type="password"
                                sx={{ width: '80%', }}
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
                        <Grid item xs={12} display={'flex'} justifyContent={'center'} marginTop={'10px'}>
                            <DatePickerField label={t("dcmStart_Date") as string} valueDate={(params: any) => { getValueDate(params, 'startDate') }}/>
                        </Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'} marginTop={'10px'} >
                            <DatePickerField label={t("dcpDate_End") as string} valueDate={(params: any) => { getValueDate(params, 'endDate') }}/>
                        </Grid>
                    </Grid>
                    <Stack direction={"row"} spacing={2} alignItems={'center'}>
                        <MyButton name={t("btnSearch") as string} onClick={handleSearch} />
                        <MyButton name={t("btnSave") as string} onClick={handleUpdate}/>
                        <MyButton name={t("btnClean") as string} onClick={handleRefresh}/>
                    </Stack>
                </Stack>
            </Box>
            <Stack overflow={"hidden"} sx={{ height: '100%' }}>
                <TableOrigin columns={columns} rows={rows} handlerowClick={handleRowClick}/>
            </Stack>
        </FullScreenContainerWithNavBar>
    )
}
export default UserForm