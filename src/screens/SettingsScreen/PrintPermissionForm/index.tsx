//#region import
import { Box, Grid, FormControlLabel, Checkbox, Button, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar";
import InputField from "../../../components/InputField";
import MyButton from "../../../components/MyButton";
import TableOrigin from "../../../components/TableOrigin";
import { config, connect_string } from "../../../utils/api";
import ModalCofirm from "../../../components/ModalConfirm";
//#endregion
const PermissionPrintScreen = () => {
    const { t } = useTranslation();
    //#region column header table
    const columns: GridColDef[] = [
        {
            field: '_id',
            headerName: t("dcpNum") as string,
            width: 70,
            headerClassName: 'custom-header'
        },
        {
            field: 'user_id',
            headerName: t("dcpMaterial") as string,
            width: 150,
            headerClassName: 'custom-header'
        },
        {
            field: 'name_print',
            headerName: t("lblPrintName") as string,
            width: 110,
            headerClassName: 'custom-header'
        },
        {
            field: 'print_ip',
            headerName: "IP",
            width: 300,
            headerClassName: 'custom-header'
        },
    ];
    //#endregion
    
    //#region Variable
    const [isLoading, setIsLoading] = useState(false)
    const [rows, setRows] = useState<any[]>([]);
    const [userID, setUserID] = useState('')
    const [printName, setPrintName] = useState('')
    const [printIP, setPrintIP] = useState('')
    const [openCofirm, setOpenCofirm] = useState(false)
    const [cofirmType, setCofirmType] = useState('')
    //#endregion

    //#region Func OnChange Input
    const handleUserID = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserID(event.target.value);
    };

    const handlePrintName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrintName(event.target.value);
    };

    const handlePrintIP = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrintIP(event.target.value);
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

    const Search = () => {
        setIsLoading(true)
        const url = connect_string + "api/Show_print_name"
        const data = {
            user_id: userID,
            name_print: printName,
            print_ip: printIP
        }
        axios.post(url, data, config).then(response => {
            const result = response.data.map((item: any, index: any) => ({
                _id: index + 1,
                ...item
            }))
            setRows(result)
        }).finally(()=>{
            setIsLoading(false)
        })
    }

    const Save = () => {
        setIsLoading(true)
        if (userID !== "" && printName !== "" && printIP !== "") {
            const url = connect_string + "api/Insert_print_name"
            const data = {
                user_id: userID,
                name_print: printName,
                print_ip: printIP
            }
            axios.post(url, data, config).then(respone => {
                if (respone.data === true) {
                    Search()
                }
                else{
                    handleOpenConfirm('erorr')
                }
            }).finally(()=>{
                setIsLoading(false)
            })
        }
    }

    const handlerowClick = (key: any, params: any) => {
        setUserID(params.user_id)
        setPrintName(params.name_print)
        setPrintIP(params.print_ip)
    }

    const Clean = () => {
        setUserID('')
        setPrintName('')
        setPrintIP('')
    }
    //#endregion
    
    return (
        <FullScreenContainerWithNavBar sideBarDisable={true} sideBarNavigate="" title={t("lblPrint") as string} navigate={"/"}>
            <Box
                paddingX={1}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Grid container display={'flex'} justifyContent={'center'}>
                    <Grid item xs={3.5} display={'flex'}>
                        <InputField focus={true} label={t("dcpMaterial") as string} handle={handleUserID} keydown={null} value={userID} />
                    </Grid>
                    <Grid item xs={3.5} display={'flex'}>
                        <InputField focus={true} label={t("lblPrintName") as string} handle={handlePrintName} keydown={null} value={printName} />
                    </Grid>
                    <Grid item xs={3.5} display={'flex'}>
                        <InputField label="IP" handle={handlePrintIP} keydown={null} value={printIP} />
                    </Grid>

                </Grid>
                <Grid container display={'flex'} justifyContent={'center'} marginTop={'10px'}>
                    <Grid item xs={2} display={'flex'} justifyContent={'center'}></Grid>
                    <Grid item xs={1.5} display={'flex'} justifyContent={'center'}>
                        <MyButton name={t("btnSearch") as string} onClick={Search} />
                    </Grid>
                    <Grid item xs={1.5} display={'flex'} justifyContent={'center'}>
                        <MyButton name={t("btnSave") as string} onClick={Save} />
                    </Grid>
                    <Grid item xs={1.5} display={'flex'} justifyContent={'center'}>
                        <MyButton name={t("btnClean") as string} onClick={Clean} />
                    </Grid>
                    <Grid item xs={2} display={'flex'} justifyContent={'flex-start'} alignItems={"center"}>
                        {isLoading && <CircularProgress size={'25px'} color="info" />}
                    </Grid>
                </Grid>
                {cofirmType === 'erorr' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblUpdateNotSuccess") as string} />}
            </Box>
            <Stack overflow={"hidden"} sx={{ height: '100%' }}>
                <TableOrigin columns={columns} rows={rows} handlerowClick={handlerowClick} />
            </Stack>
        </FullScreenContainerWithNavBar>
    )
};

export default PermissionPrintScreen;
