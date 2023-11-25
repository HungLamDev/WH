//#region import
import InputField from '../../../components/InputField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack, Box, Modal, Typography, IconButton, Divider, Grid, TextField, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import changepasswordIcon from "../../../assets/reset-password.png"
import userIcon from "../../../assets/user.png"
import { GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { config } from '../../../utils/api';
import { connect_string } from '../../LoginScreen/ChooseFactory';
import axios from 'axios';
import TableOrigin from '../../../components/TableOrigin';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import MyButton from '../../../components/MyButton';
import md5 from 'md5';
import ModalCofirm from '../../../components/ModalConfirm';
import { Visibility, VisibilityOff } from '@mui/icons-material';
//#endregion
const ChangePassword = ({ open, onClose }: { open?: any, onClose?: any }) => {
    const { t } = useTranslation();
    //#region style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        "@media screen and (max-width: 1000px)": {
            width: "50%",
        },
        height: '90%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,

    };
    //#endregion
   
    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region Variable
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [openconfirm, setOpenConfirm] = useState(false);
    const [txtStatus, setTxtStatus] = useState('')
    const [showPassword, setShowPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    //#endregion

    //#region Func OnChange Input
    const handleCurrentPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(event.target.value)
    };

    const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value)
    };

    const handleCofirmNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmNewPassword(event.target.value)
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    //#endregion

    //#region Func Logic
    const handleSave = () => {
        const url = connect_string + "api/Change_Password_Action"
        const data = {
            txtCurrenPass: md5(currentPassword).toUpperCase(),
            txtNewPass: md5(newPassword).toUpperCase(),
            txtConfirmPass: md5(confirmNewPassword).toUpperCase(),
            txtUserID: dataUser[0].UserId,
            txtName_User: dataUser[0].UserName,
            get_version: dataUser[0].WareHouse
        }
        axios.post(url, data, config).then(response => {
            if (response.data === false) {
                setTxtStatus(t("msgNoChangePassword") as string)
                setOpenConfirm(true)
            }
            else {
                setTxtStatus(t("msgChangePassword") as string)
                setOpenConfirm(true)
            }
        })
    }

    const handleOk = () => {
        setCurrentPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
        setOpenConfirm(false)
    }

    const handleClickShowPassword = (name: string) => {
        setShowPassword(name)
        if(name === showPassword){
            setShowPassword('')
        }
    }
    //#endregion

    return (
        <Modal
            open={open}
            // onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack height={'100%'} paddingBottom={'20px'}>
                    <Stack height={'10%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <IconButton className={'back-button'} onClick={onClose}>
                            <BiArrowBack className=" icon-wrapper" sx={{ color: 'white' }} />
                        </IconButton>
                        <Typography variant="h4" component="h4" color={'white'}>{t("btnChangepassword") as string}</Typography>
                        <Typography></Typography>
                    </Stack>
                    <Stack height={'90%'} alignItems={'center'} justifyContent={'center'}>
                        <Stack height={'80%'} width={'100%'} alignItems={'center'}>
                            <Stack marginTop={'10px'} marginBottom={'20px'} width={'100%'} height={'30%'} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                                <img src={userIcon} alt="enter" width={"70px"} />
                                <Box marginLeft={'20px'}>
                                    <Typography>{dataUser[0].UserId}</Typography>
                                    <Typography>{dataUser[0].UserName}</Typography>
                                </Box>
                            </Stack>
                            <Stack height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                                <Grid width={'50%'} >
                                    <Grid item xs={12}>
                                        <Typography marginBottom={'10px'} textAlign={'left'}>{t("lblPassword_Old")}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-select-currency"
                                            value={currentPassword}
                                            onChange={handleCurrentPassword}
                                            autoComplete="off"
                                            type={showPassword === 'pwd-old' ? "text" : "password"}
                                            sx={{ width: '100%', }}
                                            InputProps={{
                                                inputProps: {
                                                    step: null,
                                                },
                                                className: "dark-bg-primary textsize",
                                                sx: {
                                                    borderRadius: "50px",
                                                    color: "white",
                                                    height: "2rem",
                                                    "& fieldset": { borderColor: "white" },
                                                    marginBottom: '20px'
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => handleClickShowPassword('pwd-old')}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword === 'pwd-old' ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography marginBottom={'10px'} textAlign={'left'}>{t("lblPassword_New")}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-select-currency"
                                            value={newPassword}
                                            onChange={handleNewPassword}
                                            autoComplete="off"
                                            type={showPassword === 'pwd-new' ? "text" : "password"}
                                            sx={{ width: '100%', }}
                                            InputProps={{
                                                inputProps: {
                                                    step: null,
                                                },
                                                className: "dark-bg-primary textsize",
                                                sx: {
                                                    borderRadius: "50px",
                                                    color: "white",
                                                    height: "2rem",
                                                    "& fieldset": { borderColor: "white" },
                                                    marginBottom: '20px'
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => handleClickShowPassword('pwd-new')}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword === 'pwd-new' ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography marginBottom={'10px'} textAlign={'left'} >{t("lblCofirm_Password")}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-select-currency"
                                            value={confirmNewPassword}
                                            onChange={handleCofirmNewPassword}
                                            autoComplete="off"
                                            type={showPassword === 'confirm-pwd' ? "text" : "password"}
                                            sx={{ width: '100%', }}
                                            InputProps={{
                                                inputProps: {
                                                    step: null,
                                                },
                                                className: "dark-bg-primary textsize",
                                                sx: {
                                                    borderRadius: "50px",
                                                    color: "white",
                                                    height: "2rem",
                                                    "& fieldset": { borderColor: "white" },
                                                    marginBottom: '20px'
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => handleClickShowPassword('confirm-pwd')}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword === 'confirm-pwd' ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid xs={12} display={'flex'} justifyContent={'center'} >
                                        <MyButton name={t('btnSave') as string} onClick={handleSave} />
                                    </Grid>
                                </Grid>
                            </Stack>

                            {/* <Stack width={'50%'} height={'70%'} justifyContent={'center'}>
                                <Typography width={'22rem'} marginBottom={'10px'} marginLeft={'16px'} textAlign={'left'}>{t("lblPassword_Old")}</Typography>
                                <Box display={'flex'} marginBottom={'10px'}>
                                    <InputField focus={true} handle={handleCurrentPassword} value={currentPassword} type='password'/>
                                </Box>
                                <Typography width={'22rem'} marginBottom={'10px'} marginLeft={'16px'} textAlign={'left'}>{t("lblPassword_New")}</Typography>
                                <Box display={'flex'} marginBottom={'10px'}>
                                    <InputField handle={handleNewPassword} value={newPassword} type='password'/>
                                </Box>
                                <Typography width={'22rem'} marginBottom={'10px'} marginLeft={'16px'} textAlign={'left'} >{t("lblCofirm_Password")}</Typography>
                                <Box display={'flex'} marginBottom={'10px'}>
                                    <InputField handle={handleCofirmNewPassword} value={confirmNewPassword} type='password'/>
                                </Box>
                                <Box display={'flex'} justifyContent={'center'} marginBottom={'10px'}>
                                    <MyButton name={t('btnSave') as string} onClick={handleSave} />
                                </Box>
                            </Stack> */}
                        </Stack>
                    </Stack>
                </Stack>
                {openconfirm && <ModalCofirm open={openconfirm} onClose={() => setOpenConfirm(false)} title={txtStatus} onPressOK={handleOk} />}
            </Box>
        </Modal>

    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default ChangePassword