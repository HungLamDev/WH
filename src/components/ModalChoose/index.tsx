import { Paper, Grid, Stack, Typography, Modal, Box, Button } from "@mui/material";
import importIcon from "../../../assets/import.png";
import exportIcon from "../../../assets/export.png";
import printerIcon from "../../../assets/printer.png";
import inventoryIcon from "../../../assets/inventory.png";
import reportIcon from "../../../assets/report.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Load from "../../../src/assets/load.gif";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAppLang, setAppLang, setWareHouse, setWareHouseAcount } from "../../utils/localStorage";
import { LanguageName } from "../../screens/LoginScreen/ChooseLanguage/type";
import { useState } from "react";
import './style.scss'
import { connect_string } from "../../screens/LoginScreen/ChooseFactory";
import { addFOC } from "../../redux/FOC";

const GridItem = (props: any) => {
    return (
        <div
            {...props}
            item xs={2}
            padding={'10px'}
            textAlign={"center"}
            color={"white"}
            height={'100%'}
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}
            alignItems={'center'}
            gap={'5px'}
            sx={{ '&:hover': { backgroundColor: '#7F8487', cursor: 'pointer', borderRadius: '20px' } }}
        >
        </div>
    );
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    // height: '30%',
    width: '85%',
    bgcolor: '#1c2538',
    border: '2px solid white',
    borderRadius: 3,
    boxShadow: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
const ModalChoose = ({ array, open, onClose, setShowState }: { array?: any, open: any, onClose: any, setShowState?: (value: boolean) => void; }) => {
    const dataUser = useSelector((state: any) => state.UserLogin.user);

    const dispatch = useDispatch()
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [showPage, setShowPage] = useState(true);
    const appLang = getAppLang();
    const [selectedValue, setSelectedValue] = useState<LanguageName>(
        appLang ? appLang : "VN"
    );

    const handleClickItem = (lng: LanguageName) => {
        i18n.changeLanguage(lng)
        setSelectedValue(lng);
        // Change global language
        i18n.changeLanguage(lng);
        // Set local storage
        setAppLang(lng);
    }

    const handleClickWareHouse = (wareHouse: string) => {
        if (wareHouse !== 'FOC') {
            setWareHouseAcount(wareHouse)
            setWareHouse(wareHouse)
            dispatch(addFOC(false))
        }
        else {
            dispatch(addFOC(true))
        }
    }

    // api lưu log check point
    const handleNavigate = (path: any, title: any) => {
        const url = connect_string + 'api/CheckPoint'
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const data = {
            data: dataUser,
            point: title,
            get_version: dataUser[0].WareHouse

        }
        onClose(true)
        setShowPage(false);
        if (setShowState) {
            setShowState(false);
        }
        setTimeout(() => {
            navigate(path);
        }, 1400);
        axios.post(url, data, config)
    }

    const IconWrapper = (props: any) => {
        return (
            <Button
                sx={{
                    width: "fit-content",
                    height: "fit-content",
                    p: 1.5,
                    borderRadius: "20%",
                    cursor: "pointer",
                    color: "white",
                    marginTop: '10px',
                    background: "#9DB2BF",
                    ':disabled': {
                        background: 'gray', // Thay đổi màu nền khi vô hiệu hóa
                        opacity: 0.5
                    },
                }}
                {...props}
            ></Button>
        );
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            slotProps={{
                backdrop: {
                    style: {
                        backdropFilter: "blur(1px)", // Hiệu ứng làm mờ nền
                    },
                },
            }}
        >
            <Box sx={style} >
                {/* <Grid container flexWrap={'nowrap'} alignContent={'center'} justifyContent={'center'} >
                    {array.map(({ title, icon, path, language, value, vWareHouse, disabled, hidden }: any, index: number) => {
                        return (
                            <GridItem style={{ display: hidden ? 'none' : 'flex', }} sx={{ '&:hover': { backgroundColor: '#7F8487', cursor: 'pointer', borderRadius: '20px' } }} item key={index}>
                                <IconWrapper
                                    onClick={() => {
                                        {
                                            path && !vWareHouse ? handleNavigate(path, title) : path && vWareHouse ? [handleNavigate(path, title), handleClickWareHouse(vWareHouse)] :
                                                handleClickItem(value);
                                        }
                                    }}
                                    disabled={disabled ? disabled : false}
                                >
                                    <img style={{ width: '64px' }} src={icon} alt={title} />
                                </IconWrapper>
                                <Typography
                                    marginTop={'5px'}
                                    whiteSpace={"normal"}
                                    style={{
                                        width: '100%',

                                    }}
                                >
                                    {title ? t(title) : language}
                                </Typography>
                            </GridItem>
                        );
                    })}
                </Grid> */}
                <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%' }}>
                    {array.map(({ title, icon, path, language, value, vWareHouse, disabled, hidden }: any, index: number) => {
                        return (
                            <div style={{
                                display: hidden ? 'none' : 'flex',
                                width: '100%',
                            }}
                                key={index}
                                className="item-choose"
                            >
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '10px',
                                    textAlign: "center",
                                    color: "white",
                                    height: '100%',
                                    // justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '5px',
                                    flex: 1

                                }}>
                                    <IconWrapper
                                        onClick={() => {
                                            {
                                                path && !vWareHouse ? handleNavigate(path, title) : path && vWareHouse ? [handleNavigate(path, title), handleClickWareHouse(vWareHouse)] :
                                                    handleClickItem(value);
                                            }
                                        }}
                                        disabled={disabled ? disabled : false}
                                    >
                                        <img className="hover-effect" width={'32px'} src={icon} alt={title} />
                                    </IconWrapper>
                                    <Typography
                                        marginTop={'5px'}
                                        whiteSpace={"normal"}
                                        style={{
                                            width: '100%',

                                        }}
                                        sx={{ fontSize: '15px' }} className="textsize-960px"
                                    >
                                        {title ? t(title) : language}
                                    </Typography>
                                </div>
                                <div style={{ height: '100%' }}>
                                    {
                                        index !== (array.length - 1) &&
                                        < hr style={{ height: '100%' }} />
                                    }
                                </div>
                            </div>
                        );
                    })}
                </div>

            </Box>
        </Modal>

    )
}

export default ModalChoose