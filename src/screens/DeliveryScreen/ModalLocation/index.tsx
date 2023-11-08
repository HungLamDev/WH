//#region import
import { Box, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, IconButton, Modal, Stack, Typography } from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { BiArrowBack } from "react-icons/bi";
import TableOrigin from "../../../components/TableOrigin";
import { useTranslation } from 'react-i18next';
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { config, connect_string } from "../../../utils/api";
import axios from "axios";
import TableCheckBox from "../../../components/TableCheckBox";
import ModalCofirm from "../../../components/ModalConfirm";
import moment from "moment";
import { clearArrayDelivery, copyArrayDelivery } from "../../../redux/ArrayDelivery";
//#endregion
function ModalLocation({ open, onClose, dataUpdate, materialNo, dtpFrom_Open, dtpFrom_Date, dtpTo_Open, dtpTo_Date }: { open: any, onClose: any, dataUpdate: any, materialNo: string, dtpFrom_Open: any, dtpFrom_Date: any, dtpTo_Open: any, dtpTo_Date: any }) {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    //#region Style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        height: '90%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
    };
    //#endregion

    //#region column header table
    const columns: GridColDef[] = [
        {
            field: "Location",
            headerName: "Location",
            width: 250,
        },
    ];
    //#endregion

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region Variable
    const [listCheck, setListCheck] = useState([])
    //#endregion

    //#region Func Logic
    const handleBack = () => {
        const url = connect_string + "api/Back_Get_Data_Material_Location"
        const data = {
            Material_No: materialNo,
            Total_Location: listCheck.map((item: any) => `'${item.Location}'`).join(','),
            version: dataUser[0].WareHouse,
            User_Serial_Key: dataUser[0].UserId,
            dtpFrom_Open: moment(dtpFrom_Open).format("DD/MM/YYYY"),
            dtpFrom_Date: moment(dtpFrom_Date).format("DD/MM/YYYY"),
            dtpTo_Open: moment(dtpTo_Open).format("DD/MM/YYYY"),
            dtpTo_Date: moment(dtpTo_Date).format("DD/MM/YYYY")
        }
        if (listCheck.length > 0) {
            axios.post(url, data, config).then(response => {
                const array = response.data.map((item: any, index: any) => ({
                    _id: index,
                    Date_Start: item.Date_Start,
                    Num_No: item.Num_No,
                    Material_No: item.Material_No,
                    Count_Stock_Qty: item.Count_Stock_Qty,
                    Material_Name: item.Material_Name,
                    Color: item.Color,
                    RY_Status: item.RY_Status,
                    RY: item.RY,
                    Rack: item.Rack,
                    RY_Status1: "",
                    RY_Status2: item.RY_Status1,
                    User_Serial_Key: item.User_Serial_Key,
                    Delivery_Serial: item.Delivery_Serial
                }));
                dispatch(clearArrayDelivery())
                dispatch(copyArrayDelivery(array))
            })
           
        }
        onClose()
    }
    //#endregion
    
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack height={'100%'}>
                    <Stack height={'10%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <IconButton className={'back-button'} onClick={handleBack}>
                            <BiArrowBack className=" icon-wrapper" sx={{ color: 'white' }} />
                        </IconButton>
                        <Typography variant="h6" component="h6" color={'lightblue'}>{dataUpdate[0] ? dataUpdate[0].Material_No : ""}</Typography>

                    </Stack>
                    <Stack overflow={"hidden"} height={'90%'} >
                        <TableCheckBox columns={columns} rows={dataUpdate} listChx={(params: any) => setListCheck(params)} />
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
export default ModalLocation