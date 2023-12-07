//#region  import
import { useTranslation } from "react-i18next";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar"
import MaterialDetail from "../../../components/MaterialDetail";
import { useLocation } from "react-router-dom";
import { Backdrop, Box, Card, CircularProgress, Stack, Typography } from "@mui/material";
import { useState, useEffect, useRef } from 'react'
import axios from "axios";
import { config } from "../../../utils/api";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import './tablestyle.scss'
import Detail from "../../StockinScreenv2/DetailForm";
import { saFactory_LHG } from "../../../utils/constants";
//#endregion
const MaterialDetailForm = () => {
    const { t } = useTranslation();
    const { state } = useLocation();
    //#region Variable
    const [listMaterial, setListMaterial] = useState<any[]>([])
    const [rackDataDict, setRackDataDict] = useState<Record<string, any[]>>({});
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [rackDetail, setRackDetail] = useState('')
    const [userName, setUserName] = useState('')
    const [avatar, setAvatar] = useState('')
    //#endregion
   
    //#region useEffect
    useEffect(() => {
        getListMaterial()
        getAvatar()
    }, [])
    //#endregion

    //#region Func Logic
    const url = connect_string + "api/show_rack_detail"
    const data = {
        rack: state.Rack_Total
    }
   
    const getListMaterial = () => {
        setIsLoading(true)
        axios.post(url, data, config).then(response => {
            setListMaterial(response.data)
            // lọc ra thành  object vật tư kệ nào sẽ theo kệ đó
            const groupedData = response.data.reduce((result: any, item: any) => {
                const rack = item.Rack;
                if (!result[rack]) {
                    result[rack] = [];
                }
                result[rack].push(item);
                return result;
            }, {});
            setRackDataDict(groupedData)
        }).finally(() => { setIsLoading(false) })
    }

    const getAvatar = () => {
        const url = connect_string + "api/Get_Picture"
        const data = {
            Value_Rack_Total: state.Rack_Total,
            saFactory: saFactory_LHG
        }
        axios.post(url, data, config).then(response => {
            setUserName(response.data.Person_Name)
            setAvatar(response.data.Person_Image_byte)
        })
    }

    const handleClickRack = (rack: string) => {
        setRackDetail(rack)
        setOpen(true)
    }
    //#endregion

    return (
        <FullScreenContainerWithNavBar state={state.wareHouse} navigate="/warehouse" sideBarDisable={true} sideBarNavigate="" title={t("lblTracking")}>
            <Box
                paddingX={4}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Typography variant="h4">{state.Rack_Total}</Typography>
                {
                    (avatar !== null || userName !== '') &&
                        (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px', height: '90px', position: 'absolute', right: 30, top: 10, background: '#2f3b52' }}>
                                <img
                                    src={"data:image/jpeg;base64," + avatar}
                                    alt=""
                                    height={"75px"}
                                    width={"80px"}
                                />
                                <Typography variant="body2" fontWeight={600}>{userName}</Typography>
                            </Box>
                        )
                }

            </Box>
            <Stack
                direction={'row'}
                overflow={'auto'}
                height={'100%'}
                paddingLeft={'10px'}

            >

                {Object.entries(rackDataDict).map(([rack, items]) => (
                    <div key={rack}  style={{marginLeft:'10px'}}>
                        {/* <h2 style={{ cursor: 'pointer', color: 'darkorange' }} onClick={() => handleClickRack(rack)}>{rack}</h2> */}
                        <table  >
                            <thead >
                                <tr >
                                    <th style={{ cursor: 'pointer', color: 'darkorange', fontSize:'30px' }} onClick={() => handleClickRack(rack)}>{rack}</th>
                                </tr>
                            </thead>
                            <tbody >
                                {items.map((item: any) => (
                                    <tr  key={item.Material_Name + item.Material_No + item.Color}>
                                        <MaterialDetail item={item} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
                {open && <Detail open={open} onClose={() => setOpen(false)} rack={rackDetail} />}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Stack>
        </FullScreenContainerWithNavBar>
    )
}

export default MaterialDetailForm