//#region Import
import { Autocomplete, Box, Button, CircularProgress, Divider, FormControlLabel, FormGroup, Grid, IconButton, Modal, Stack, TextField, Typography } from "@mui/material"
import { useTranslation } from "react-i18next";
import InputField from "../../components/InputField";
import MyButton from "../../components/MyButton";
import ImageDefault from "../../assets/image-default.png";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Camera from "../Camera";
import { useEffect, useState } from "react";
import FileInput from "../FileInput";
import { BiArrowBack } from "react-icons/bi";
import { connect_string } from "../../screens/LoginScreen/ChooseFactory";
import { useSelector } from "react-redux";
import axios from "axios";
import { config } from "../../utils/api";
import ModalCofirm from "../../components/ModalConfirm";
import './styles.scss'
import CheckIcon from '@mui/icons-material/Check';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CachedIcon from '@mui/icons-material/Cached';
import CloseIcon from '@mui/icons-material/Close';
import { TbListSearch } from "react-icons/tb";
import ListRegister from "./ListRegister";
//#endregion

interface CheckQualityProps {
    open: any,
    onClose: any,
    data: any,
    qrcodeScan?: any
}

const CheckQuality = (props: CheckQualityProps) => {
    const { open, onClose, data, qrcodeScan } = props
    //#region Variable
    const { t } = useTranslation();
    const [imageCam, setImageCam] = useState("");
    const [currentMenu, setCurrentMenu] = useState("chooseImg");
    const [openModal, setOpenModal] = useState(false);
    const [openModalPreview, setOpenModalPreview] = useState(false);
    const [valueSelect, setValueSelect] = useState("");
    const [valueReason, setValueReason] = useState("");
    const [qrcode, setQRCode] = useState("")
    const [materialName, setMaterialName] = useState("")
    const [materialNo, setMaterialNo] = useState("")
    const [orderNo, setOrderNo] = useState("")
    const [location, setLocation] = useState("")
    const [time, setTime] = useState("")
    const [ry, setRY] = useState("")
    const [lean, setLean] = useState("")
    const [alert, setAlert] = useState("")
    const [describe, setDescribe] = useState("")
    const [openAlert, setOpenAlert] = useState(false)
    const [no, setNo] = useState("")
    const [decision, setDecision] = useState("")
    const [arrivalQty, setArrivalQty] = useState("")
    const [listAction, setListAction] = useState([])
    const [listDecision, setListDecision] = useState([])
    const [userIDCBQC, setUserIDCBQC] = useState("")
    const [passwordCBQC, setPasswordCBQC] = useState("")
    const [userIDCBKHO, setUserIDCBKHO] = useState("")
    const [passwordCBKHO, setPasswordCBKHO] = useState("")
    const [openSubmitAlert, setOpenSubmitAlert] = useState(false)
    const [submitAlert, setSubmitAlert] = useState("")
    const [checkCBQC, setCheckCBQC] = useState(false)
    const [checkCBKHO, setCheckCBKHO] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [listData, setListData] = useState<any[]>([])
    const [disable, setDisable] = useState(false)
    const [rotation, setRotation] = useState(0);
    const [scale, setScale] = useState(1);
    const [checkResultBarcode, setCheckResultBarcode] = useState("");
    const [openModalListRegister, setOpenModalListRegister] = useState(false);
    const [Material_No_goc, setMaterial_No_goc]= useState("");

    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: '30%',
        // height: '75%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
        padding: 2,
        display: 'flex',
        justifyContent: 'center',
    };

    const stylePreview = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '90%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
        padding: 2,

    };

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        bgcolor: '#1c2538',
        // border: '2px solid white',
        // borderRadius: 3,
        boxShadow: 24,
        display: 'flex',
        flexDirection: "column"
    };
    //#endregion

    //#region useEffect
    useEffect(() => {
        if (open === true) {
            handleCleanData()
            handleLoadComboBoxData()
        }
    }, [open])
    //#endregion

    //#region functionOnchange
    const handleChangeValueSelect = (value: any) => {
        setValueSelect(value);
        setValueReason(value)
    };

    const handleChangeValueReason = (event: any) => {
        setValueReason(event.target.value)
    };

    const handleChangeDecision = (value: any) => {
        setDecision(value)
        if (value !== null) {
            setValueReason(pre => pre + "\u2002" + value)
        }
    };

    const handleQRCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQRCode(event.target.value)
        if (event.target.value.length >= 15) {
            handleCheckBarcode(event.target.value, "", "", "")
        }
    };

    const handleMaterialNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialNo(event.target.value)
    };

    const handleOrderNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNo(event.target.value)
    };

    const handleAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value)
    };

    const handleLeanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLean(event.target.value)
    };

    const handleNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNo(event.target.value)
    };

    const handleChangeUserIDCBQC = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserIDCBQC(event.target.value)
    };

    const handleChangePasswordCBQC = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCBQC(event.target.value)
    };

    const handleChangeUserIDCBKHO = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserIDCBKHO(event.target.value)
    };

    const handleChangePasswordCBKHO = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCBKHO(event.target.value)
    };

    const handleNoKeyDown = (event: any) => {
        if (event.key === "Enter") {
            setValueReason(pre => pre + "\u2002" + no)
        }
    }
    //#endregion

    //#region functionLogic
    const handlePasswordCBQCKeyDown = (event: any) => {
        if (event.key === "Enter") {
            handleCheckLogin(userIDCBQC, passwordCBQC)
                .then(data => {
                    if (data !== true) {
                        setSubmitAlert("Tài khoản hoặc mật khẩu không chính xác")
                        setOpenSubmitAlert(true)
                        setCheckCBQC(false)
                    }
                    else if (data === true) {
                        setCheckCBQC(true)
                    }
                })
                .catch(error => {
                    console.error(error); // Xử lý lỗi nếu có
                });
        }
    }

    const handlePasswordCBKHOKeyDown = (event: any) => {
        if (event.key === "Enter") {
            handleCheckLogin(userIDCBKHO, passwordCBKHO)
                .then(data => {
                    if (data !== true) {
                        setSubmitAlert("Tài khoản hoặc mật khẩu không chính xác")
                        setOpenSubmitAlert(true)
                        setCheckCBKHO(false)
                    }
                    else if (data === true) {
                        setCheckCBKHO(true)
                    }
                })
                .catch(error => {
                    console.error(error); // Xử lý lỗi nếu có
                });
        }
    }

    const handleLoadComboBoxData = () => {
        setIsLoading(true)
        const url = connect_string + "api/Decision_Action"
        axios.post(url).then(res => {
            setListAction(res?.data["Item1"])
            setListDecision(res?.data["Item2"])
        }).finally(() => setIsLoading(false))
    }

    const onImageSelected = (selectedImg: any) => {
        setImageCam(selectedImg);
        setCurrentMenu("cropImg");
    };
    const onCancelCam = (selectedImg: any) => {
        setImageCam(selectedImg);
        setCurrentMenu("chooseImg");
    };

    const rotateImage = () => {
        setRotation(rotation => (rotation + 90) % 360);
    };

    const zoomIn = () => {
        setScale(scale => scale + 0.25);
    };

    const zoomOut = () => {
        setScale(scale => Math.max(0.25, scale - 0.25));
    };

    const handleCheckBarcode = (qrcode: string, materialNo: string, orderNo: string, lean: string) => {
        setIsLoading(true)
        const url = connect_string + "api/Scan_Barcode_From_QCCheck_Confirm"
        const data = {
            user_id: dataUser[0].UserId,
            Barcode: qrcode,
            Material_No: materialNo,
            Order_No: orderNo,
            Location: lean
        }
        axios.post(url, data, config).then((res) => {
            setListData(res.data)
            const result = res?.data[0]
            setMaterialNo(result?.Material_No)
            setMaterialName(result?.Material_Name)
            setOrderNo(result?.Order_No)
            setLocation(result?.Building)
            setTime(result?.Delivery_Date)
            setRY(result?.RY)
            setLean(result?.Lean)
            setArrivalQty(result?.Arrival_QTY)
            setDescribe(result?.Material_No_QCcheck)
            setMaterial_No_goc(result?.Material_No_goc)
            if(res?.data?.length > 0){
                setQRCode("")
            }
            // if (res.data === "Pass") {
            //     setAlert("Mã vật tư này đã đạt chất lượng")
            //     setOpenAlert(true)
            // }
            // else if (res.data === "Done") {
            //     setAlert("Mã vật tư này đã đăng ký")
            //     setOpenAlert(true)
            // }
            // else if (res.data === "Không Tìm Thấy Mã Vật Tư Từ Barcode") {
            //     setAlert("Không Tìm Thấy Mã Vật Tư Từ Barcode")
            //     setOpenAlert(true)
            // }
            // else {
            //     const arr = res.data.split(',')
            //     setMaterialNo(arr[0])
            //     setOrderNo(arr[1])
            //     setMaterialName(arr[2])
            //     setLocation(arr[3])
            //     setTime(arr[4])
            //     if (arr[5] === "Fail") {
            //         setCheckResultBarcode(arr[5])
            //         setDescribe("Vật tư có kết quả kiểm tra thị mục hoặc kết quả thử nghiệm rớt")
            //     }
            //     else if (arr[5] === "Null") {
            //         setCheckResultBarcode(arr[5])
            //         setDescribe("Vật tư chưa có đủ kết quả kiểm tra thị mục hoặc thử nghiệm")
            //     }
            // }
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleCheckLogin = (userid: string, pwd: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            setIsLoading(true)
            const url = connect_string + "api/check_Login_ERP_Confirm";
            const data = {
                userID: userid,
                PWD: pwd
            };
            axios.post(url, data)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
                .finally(() => {
                    setIsLoading(false)
                })
        });
    };

    const handleCleanData = () => {
        setQRCode("")
        setMaterialName("")
        setMaterialNo("")
        setOrderNo("")
        setLocation("")
        setTime("")
        setDescribe("")
        setValueReason("")
        setUserIDCBQC("")
        setPasswordCBQC("")
        setUserIDCBKHO("")
        setPasswordCBKHO("")
        setCheckCBKHO(false)
        setCheckCBQC(false)
        setDisable(false)
        setValueSelect("")
        setDecision("")
        setNo("")
        setRY("")
        setLean("")
        setArrivalQty("")
        setCurrentMenu("chooseImg")
        setImageCam("")
    }

    const handleSubmitData = () => {
        const url = connect_string + "api/Confirm_QC_Check_Fail"
        const data = {
            Area_WH: location,
            Order_No: orderNo,
            Material_No: materialNo,
            Print_Date: listData[0]?.Print_Date || "",
            Material_Name: materialName,
            Arrival_QTY: arrivalQty,
            Total_QTY: listData[0]?.Total_QTY || "",
            Confirm_Status: Material_No_goc,
            Confirm_Content: describe,
            Delivery_Date: time,
            RY_Content: ry,
            Lean: lean,
            Action_Taken: valueReason.replaceAll(decision,""),
            Final_Decision: decision,
            CBQC: "",
            CBWH: userIDCBKHO,
            Priority_Vote: no.trim() === "" ? 0 : 1,
            Priority_No: no,
            Path_Image: no.trim() !== "" ? no.trim() + ".jpg" : "",
            user_id: dataUser[0].UserId,
            sa_Factory: dataUser[0].factoryName,
            byte_Image: imageCam
        }
        if (checkCBKHO && materialNo.trim() !== "" && orderNo.trim() !== "" && describe.trim() !== "" && valueReason.trim() !== "" && decision.trim() !== "") {
            setIsLoading(true)
            setDisable(true)
            axios.post(url, data).then((res) => {
                if (res.data === true) {
                    handleCleanData()
                }
                else {
                    setAlert(t("msgCompleteInformation") as string)
                    setOpenAlert(true)
                }
            }).finally(() => {
                setIsLoading(false)
                setDisable(false)
            })
        }
    }

    const handleGetRyLocation = (materialNo: string) => {
        setIsLoading(true)
        const url = connect_string + "api/Get_Ry_Location"
        const data = {
            Material_No: materialNo
        }
        axios.post(url, data).then(res => {
            if (res?.data?.Ry !== null && res?.data?.Location !== null) {
                setRY(res?.data?.Ry)
                setLean(res?.data?.Location)
            }
            else {
                setRY("")
                setLean("")
            }
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleKeyDownLean = (event: any) => {
        if (event.key === "Enter") {
            handleCheckBarcode("", materialNo, orderNo, lean)
        }
    }
    //#endregion

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} style={{ borderBottom: '1px solid gray' }}>
                    {/* Nút back */}
                    <IconButton className={'back-button'} onClick={onClose}>
                        <BiArrowBack className=" icon-wrapper" />
                    </IconButton>
                    {/* Tittle */}
                    <Typography variant="h5" component="h5" color={'white'}>{"ICMWH - Kho Vật Tư"}</Typography>
                    {/* Nút xóa */}
                    <IconButton className={'back-button'} onClick={() => setOpenModalListRegister(true)}>
                        <TbListSearch className=" icon-wrapper" />
                    </IconButton>
                </Stack>
                <Stack direction={"row"} style={{ height: '100%', overflow: 'auto' }}>
                    <Stack style={{ width: '100%', }}>
                        <Stack style={{ border: '1px solid gray', display: 'flex', flex: 1, gap: 5, justifyContent: 'center', padding: '5px' }} >
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                {/* Tên vật tư */}
                                <Typography className='textsize text-hidden' style={{ flex: 2 }}> {t("lblMaterialName")}: <span className='textsize text-hidden text-color'>{materialName} </span>   </Typography>
                                {/* Quét */}
                                <div style={{ display: 'flex', width: '35%' }}>
                                    <InputField label={t("lblScanB") as string} value={qrcode} handle={handleQRCodeChange} />
                                </div>
                                <div  style={{ display: 'flex', width: '5%' }}>
                                    {isLoading && <CircularProgress size={'24px'} color='info' />}
                                </div>
                            </div>
                            <Grid container style={{ flex: 1.3, display: 'flex' }}>
                                <Grid item xs={1.7} className="display-center" style={{ borderRight: '1px solid gray', padding: 3 }}>
                                    {/* Mã vật tư */}
                                    <Typography className='textsize' style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{t("lblMaterialID")}</Typography>
                                    <div style={{ height: '50px' }}>
                                        <input
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                textAlign: 'center'
                                            }}
                                            className='textsize text-color text-hidden text-wrap'
                                            type="text"
                                            value={materialNo}
                                            onChange={handleMaterialNoChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={1.7} className="display-center" style={{ borderRight: '1px solid gray', padding: 3 }}>
                                    {/* Đơn hàng */}
                                    <Typography className='textsize' style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{t("lblShipment")}</Typography>
                                    <div style={{ height: '50px' }}>
                                        <input
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                textAlign: 'center'
                                            }}
                                            className='textsize text-color text-hidden text-wrap'
                                            type="text"
                                            value={orderNo}
                                            onChange={handleOrderNoChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={1.7} className="display-center" style={{ borderRight: '1px solid gray', padding: 3 }}>
                                    {/* Số lượng về */}
                                    <Typography className='textsize' style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{t("lblArrivalQty")}</Typography>
                                    <Typography className='textsize text-color text-hidden text-wrap' style={{ height: '50px', textAlign: 'center' }}>{arrivalQty}</Typography>
                                </Grid>
                                <Grid item xs={1.7} className="display-center" style={{ borderRight: '1px solid gray', padding: 3 }}>
                                    {/* Khu vực */}
                                    <Typography className='textsize' style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{t("lblArea")}</Typography>
                                    <div style={{ height: '50px' }}>
                                        <input
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                textAlign: 'center'
                                            }}
                                            className='textsize text-color text-hidden text-wrap'
                                            type="text"
                                            value={location}
                                            onChange={handleAreaChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={1.7} className="display-center" style={{ borderRight: '1px solid gray', padding: 3 }}>
                                    {/* Thời gian phát hàng */}
                                    <Typography className='textsize' style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{t("lblTime")}</Typography>
                                    <Typography className='textsize text-color text-hidden text-wrap' style={{ height: '50px', whiteSpace: 'break-spaces', textAlign: 'center' }}>{time}</Typography>
                                </Grid>
                                <Grid item xs={1.7} className="display-center" style={{ display: 'flex', borderRight: '1px solid gray', padding: 3, height: '100%' }}>
                                    {/* Lệnh */}
                                    <Typography className='textsize' style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{t("lbl_RY")}</Typography>
                                    <Typography className='textsize text-color text-hidden text-wrap' style={{ whiteSpace: 'pre-line', overflowY: 'auto', height: '50px', textAlign: 'center' }}>{ry}
                                    </Typography>
                                </Grid>
                                {/* Lean */}
                                <Grid item xs={1.7} className="display-center" style={{ padding: 3 }}>
                                    <Typography className='textsize' style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{`Lean \r\n (Chuyền)`}</Typography>
                                    <div style={{ height: '50px' }}>
                                        <input
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                textAlign: 'center',
                                                overflowY:'auto'
                                            }}
                                            className='textsize text-color  text-wrap'
                                            type="text"
                                            value={lean}
                                            onChange={handleLeanChange}
                                            onKeyDown={handleKeyDownLean}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </Stack>
                        <Stack style={{ flex: 2, flexDirection: 'row' }}>
                            <Stack style={{ flex: 2 }}>
                                <Stack direction={'row'} style={{ flex: 1, }}>
                                    <Stack style={{ border: '1px solid gray', flex: 1, padding: '5px', }}>
                                        <Typography className='textsize' color={"#FF8911"} marginBottom={'10px'}> {t("lblDescribe")} </Typography>
                                        <Typography className='textsize' sx={{ overflow: 'auto', height: '100px' }}>{describe}
                                        </Typography>
                                    </Stack>
                                    <Stack style={{ border: '1px solid gray', flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10, padding: '5px' }}>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'center' }}>
                                            <Typography className='textsize'>No</Typography>
                                            <div style={{ display: 'flex', width: '100%' }}>
                                                <InputField customClass="customStack1" value={no} handle={handleNoChange} keydown={handleNoKeyDown} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }} >
                                            {currentMenu === "chooseImg" ? (
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ height: '100px', width: '140px' }}
                                                    >
                                                        <img src={ImageDefault} style={{ width: '140px', height: '140px', marginTop: '-20px' }} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '100%', marginLeft: '25px' }}>
                                                        <button
                                                            style={{ cursor: 'pointer', width: '50px', background: 'transparent', border: '2px solid white', color: "white", padding: '5px', borderRadius: '12px' }}
                                                            className="textsize"
                                                            onClick={() => { setCurrentMenu("Camera"), setOpenModal(true) }}
                                                        >
                                                            <CameraAltIcon />
                                                        </button>
                                                        <div style={{ width: '50px' }}>
                                                            <FileInput onImageSelected={onImageSelected} />
                                                        </div>
                                                    </div>

                                                </div>
                                            ) : currentMenu === "Camera" ? (
                                                <Modal
                                                    open={openModal}
                                                    //onClose={() => setOpenModal(false)}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <Camera
                                                            onCancelCam={onCancelCam}
                                                            onImageSelected={onImageSelected}
                                                        />
                                                    </Box>
                                                </Modal>
                                            ) : (
                                                <div style={{ display: 'flex', gap: 10 }}>
                                                    <img onClick={() => { setOpenModalPreview(true), setRotation(0), setScale(1) }} src={imageCam} style={{ width: '140px', height: '100px' }} />
                                                    <Modal
                                                        open={openModalPreview}
                                                        onClose={() => setOpenModalPreview(false)}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                        style={{ display: 'flex' }}
                                                    >
                                                        <Box sx={stylePreview} display={'flex'} flexDirection={'column'}>
                                                            <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', flexDirection: 'column', gap: 10, overflow: 'auto' }}>
                                                                <div style={{ flex: 9.5, display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
                                                                    <img
                                                                        src={imageCam}
                                                                        style={{
                                                                            transform: `rotate(${rotation}deg) scale(${scale})`,
                                                                            maxWidth: '500px',
                                                                            maxHeight: '400px',
                                                                            objectFit: "contain"
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div style={{ flex: 0.5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <IconButton onClick={rotateImage}>
                                                                        <CachedIcon />
                                                                    </IconButton>
                                                                    <IconButton onClick={zoomIn}>
                                                                        <ZoomInIcon />
                                                                    </IconButton>
                                                                    <IconButton onClick={zoomOut}>
                                                                        <ZoomOutIcon />
                                                                    </IconButton>
                                                                </div>
                                                            </div>
                                                        </Box>
                                                    </Modal>
                                                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                                        <button
                                                            style={{ background: 'transparent', border: '2px solid white', color: "white", padding: '5px', borderRadius: '12px', cursor: 'pointer' }}
                                                            onClick={() => {
                                                                setCurrentMenu("chooseImg");
                                                                setImageCam("");

                                                            }}
                                                        >
                                                            <CloseIcon />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Stack>
                                </Stack>
                                <Stack style={{ flex: 1, padding: '5px', border: '1px solid gray' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography style={{ flex: 1 }} color={"#FF8911"} className='textsize'>{t("lblActionTaken")}</Typography>
                                        <div style={{ flex: 1.25 }}>
                                            <Autocomplete
                                                value={valueSelect}
                                                onChange={(event: any, newValue: string | null) => {
                                                    handleChangeValueSelect(newValue);
                                                }}
                                                className="dark-bg-primary"
                                                disablePortal
                                                options={listAction !== undefined ? listAction.map((item: any) => item.Action_Name) : []}
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
                                                                border: "none",

                                                            },
                                                            "& .MuiInputBase-input": {
                                                                paddingTop: "0 !important",
                                                                paddingBottom: "20px !important",
                                                                paddingLeft: "5px !important",
                                                                '@media screen and (max-width: 1200px)': {
                                                                    fontSize: '14px !important',
                                                                },
                                                            }
                                                        }}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', display: 'flex', flex: 2, alignItems: 'center' }}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={2}
                                            value={valueReason}
                                            onChange={handleChangeValueReason}
                                            sx={{
                                                width: '100%',
                                                "& fieldset": {
                                                    borderColor: "white",
                                                    border: "1px solid",

                                                },
                                            }}
                                        />
                                    </div>
                                </Stack>
                            </Stack>
                            <Stack rowGap={1} style={{ width: '20%', paddingLeft: '10px', paddingRight: '10px', justifyContent: 'center', height: '100%', display: 'flex', border: '1px solid gray' }}>
                                {/* Cán bộ QC */}
                                {/* <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            
                            <Typography color={checkCBQC === true ? "#BFEA7C" : "#FF8911"} style={{ fontSize: '16px' }}> {t("lblQCSup")} </Typography>
                            {checkCBQC === true && (
                                <CheckIcon style={{ width: '20px', color: '#BFEA7C' }} />
                            )
                            }
                        </div>
                        <Typography className='textsize'>{t("lblID")}</Typography>
                        <div style={{ display: 'flex' }}>
                            <InputField value={userIDCBQC} handle={handleChangeUserIDCBQC} />
                        </div>
                        <Typography className='textsize'>{t("lblPWD")}</Typography>
                        <div style={{ display: 'flex' }}>
                            <InputField type="password" value={passwordCBQC} handle={handleChangePasswordCBQC} keydown={handlePasswordCBQCKeyDown} />
                        </div>
                        <Divider /> */}
                                {/* Quyết định cuối cùng bởi */}
                                <Typography color={"#FF8911"} className="textsize">{t("lblDecision")}</Typography>
                                <Autocomplete
                                    value={decision}
                                    onChange={(event: any, newValue: string | null) => {
                                        handleChangeDecision(newValue);
                                    }}
                                    className="dark-bg-primary"
                                    disablePortal
                                    options={listDecision !== undefined ? listDecision.map((item: any) => item.Decision_Name) : []}
                                    id="combo-box-demo"
                                    sx={{
                                        width: '93%',
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
                                                    border: "none",

                                                },
                                                "& .MuiInputBase-input": {
                                                    paddingTop: "0 !important",
                                                    paddingBottom: "20px !important",
                                                    paddingLeft: "5px !important",
                                                    '@media screen and (max-width: 1200px)': {
                                                        fontSize: '14px !important',
                                                    },
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    {/* Cán bộ kho */}
                                    <Typography color={checkCBKHO === true ? "#BFEA7C" : "#FF8911"} className="textsize">{t("lblWarehouseSup")}</Typography>
                                    {checkCBKHO === true && (
                                        <CheckIcon style={{ width: '20px', color: '#BFEA7C' }} />
                                    )
                                    }
                                </div>
                                {/* Tài khoản */}
                                <Typography className='textsize'>{t("lblID")}</Typography>
                                <div style={{ display: 'flex' }}>
                                    <InputField value={userIDCBKHO} handle={handleChangeUserIDCBKHO} />
                                </div>
                                {/* Mật khẩu */}
                                <Typography className='textsize'>{t("lblPWD")}</Typography>
                                <div style={{ display: 'flex' }}>
                                    <InputField type="password" value={passwordCBKHO} handle={handleChangePasswordCBKHO} keydown={handlePasswordCBKHOKeyDown} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                                    {/* Xác nhận  */}
                                    <MyButton whiteSpace="pre-line" name={t("lblSubmit") + " \r\n (Xác nhận)"} onClick={handleSubmitData} disabled={disable} />
                                </div>
                            </Stack>
                        </Stack>
                    </Stack>

                </Stack>
                <ModalCofirm title={alert} open={openAlert} onClose={() => setOpenAlert(false)} onPressOK={() => setOpenAlert(false)} />
                <ModalCofirm title={submitAlert} open={openSubmitAlert} onClose={() => setOpenSubmitAlert(false)} onPressOK={() => setOpenSubmitAlert(false)} />
                <ListRegister open={openModalListRegister} onClose={() => setOpenModalListRegister(false)} />
            </Box>
        </Modal>
    )
}

export default CheckQuality