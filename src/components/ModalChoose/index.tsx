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
import { useSelector } from "react-redux";
import { getAppLang, setAppLang, setWareHouse, setWareHouseAcount } from "../../utils/localStorage";
import { LanguageName } from "../../screens/LoginScreen/ChooseLanguage/type";
import { useState } from "react";
import './style.scss'
import { connect_string } from "../../screens/LoginScreen/ChooseFactory";
const GridItem = (props: any) => {
    return (
        <Grid
            {...props}
            item xs={2}
            padding={'10px'}
            textAlign={"center"}
            color={"white"}
            height={'100%'}
            display={'flex'}
            justifyContent={'center'}
        >
        </Grid>
    );
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '30%',
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
        setWareHouseAcount(wareHouse)
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
        >
            <Box sx={style} >
                <Grid container justifyContent={'center'} alignItems={'center'} height={'100%'} flexWrap={'nowrap'}>
                    {array.map(({ title, icon, path, language, value, vWareHouse, disabled, hidden }: any, index: number) => {
                        return (
                            <GridItem style={{display: hidden ? 'none' : 'flex'}} sx={index !== 0 ? { '&:hover': { backgroundColor: '#7F8487', cursor: 'pointer', borderRadius: '20px' }, borderLeft: '1px solid white' } : { '&:hover': { backgroundColor: '#7F8487', cursor: 'pointer', borderRadius: '20px' } }} item key={index}>
                                <Stack
                                    width={'100%'}
                                    borderRadius={"24px"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                >
                                    <IconWrapper
                                        onClick={() => {
                                            {
                                                path && !vWareHouse ? handleNavigate(path, title) : path && vWareHouse ? [handleNavigate(path, title), handleClickWareHouse(vWareHouse)] :
                                                    handleClickItem(value);
                                            }
                                        }}
                                        disabled={disabled ? disabled : false}
                                    >
                                        <img style={{width:'64px'}} src={icon} alt={title} />
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

                                </Stack>
                            </GridItem>
                        );
                    })}
                </Grid>

            </Box>
        </Modal>

    )
}

export default ModalChoose