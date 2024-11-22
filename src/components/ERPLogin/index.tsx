import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, InputAdornment, Modal, Paper, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModalCofirm from "../ModalConfirm";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { connect_string } from "../../screens/LoginScreen/ChooseFactory";
import axios from "axios";
import { config } from "../../utils/api";
import { useDispatch } from "react-redux";
import { addUserERP } from "../../redux/UserERP";


interface ERPLoginProps {
    open?: any,
    onClose?: any
}

//#region Style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '100%',
    // height: '100%',
    bgcolor: '#1c2538',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
};
//#endregion


const ERPLogin = (props: ERPLoginProps) => {
    const { open, onClose } = props
    const { t } = useTranslation();
    const nav = useNavigate();
    const dispatch = useDispatch()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalType, setModalType] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleOpen = (name: string) => {
        setModalType(name)
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
        setModalType('');
    };

    const handleBackBtn = () => {
        nav("/")
        onClose()
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        const url = connect_string + "api/Login_ERP"
        const data = {
            UserID: username,
            PWD: password
        }
        axios.post(url, data, config).then(response => {
            if (response.data === true) {
                setIsLoading(false)
                onClose()
                dispatch(
                    addUserERP([
                        {
                            UserERP: username
                        }
                    ]))
                setUsername("")
                setPassword("")
            }
            else{
                handleOpen("loginIncorrect")
            }
        })
        .catch(() => {
            handleOpen("error")
        })
        .finally(() => {
            setIsLoading(false)
        })

    }


    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            slotProps={{
                backdrop: {
                    style: {
                        backdropFilter: "blur(5px)", // Hiệu ứng làm mờ nền
                    },
                },
            }}
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit} >
                    <Paper
                        className={"my-login-form"}
                        sx={{
                            // p: 5,
                            zIndex: 10,
                        }}
                    >
                        {/* Nút back */}
                        <IconButton className={'back-button'} onClick={handleBackBtn}>
                            <BiArrowBack className=" icon-wrapper" />
                        </IconButton>
                        <Stack
                            justifyContent={"center"}
                            alignItems={"center"}
                            padding={5}
                            gap={4}
                            sx={{
                                "@media screen and (max-width: 1000px)": {
                                    gap: 2
                                },
                            }}
                        >

                            <Typography variant="h6">{t("btnLogin") + " ERP"}</Typography>
                            <TextField
                                sx={{
                                    width: '90%'
                                }}
                                label={t("lblUser_Name")}
                                variant="outlined"
                                autoComplete="off"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoFocus
                            />
                            <TextField
                                sx={{ width: '90%' }}
                                label={t("lblUser_Password")}
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                style={{ fontWeight: '600', color: 'black', width: '90%' }}
                                variant={"contained"}
                                fullWidth type={"submit"}
                                startIcon={isLoading && <CircularProgress size={'25px'} color="inherit" />}
                            >
                                {t("btnLogin")}
                            </Button>

                            {modalType === "loginIncorrect" && <ModalCofirm title={t("msgLoginIncorrect") as string} open={openModal} onClose={handleClose} showOk={false} />}
                            {modalType === "error" && <ModalCofirm title={t("lblNetworkError") as string} open={openModal} onClose={handleClose} showOk={false} />}
                        </Stack>
                    </Paper>
                </form>
            </Box>
        </Modal>
    )
}

export default ERPLogin