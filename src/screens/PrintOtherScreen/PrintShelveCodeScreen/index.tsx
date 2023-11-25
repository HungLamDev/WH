//#region import
import { Autocomplete, Box, Checkbox, CircularProgress, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material"
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar";
import InputField from "../../../components/InputField";
import { useTranslation } from "react-i18next";
import MyButton from "../../../components/MyButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { config } from "../../../utils/api";
import { checkPermissionPrint } from "../../LoginScreen/ChooseFactory";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import ModalCofirm from "../../../components/ModalConfirm";
//#endregion
const PrintShelveCode = () => {
    const { t } = useTranslation();

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region Variable
    const [listRack, setListRack] = useState([])
    const [oneRack, setOneRack] = useState('')
    const [manyRackFrom, setManyRackFrom] = useState('')
    const [manyRackTo, setManyRackTo] = useState('')
    const [selectedValue, setSelectedValue] = useState('oneRack');
    const [openCofirm, setOpenCofirm] = useState(false)
    const [open, setOpen] = useState(false)
    const [cofirmType, setCofirmType] = useState('')
    //#endregion

    //#region  useEffect
    useEffect(() => {
        const url = connect_string + "api/Show_Rack"
        axios.post(url, config).then(response => {
            setListRack(response.data)
        })
    }, [])
    //#endregion

    //#region Func OnChange Input
    const handleChange = (event: any) => {
        setSelectedValue(event.target.value);
    };

    const handleOneRack = (value: any) => {
        setOneRack(value);
    };

    const handleManyRackFrom = (value: any) => {
        setManyRackFrom(value);
    };

    const handleManyRackTo = (value: any) => {
        setManyRackTo(value);
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

    const handleRefresh = () => {
        setOneRack('')
        setManyRackFrom('')
        setManyRackTo('')
    }

    const handlePrint = async () => {
        if (await checkPermissionPrint(dataUser[0].UserId)) {

            setOpenCofirm(true)
        }
        else {
            handleOpenConfirm('print-permission')
        }
    }

    const handleOK = () => {
        const url = connect_string + "api/Print_Rack"
        const data = {
            rbtPrint_One: selectedValue === "oneRack" ? true : false,
            rbtPrint_Many: selectedValue === "manyRack" ? true : false,
            rbtPrint_All: selectedValue === "allRack" ? true : false,
            cboRack_ID: oneRack,
            User_Serial_Key: dataUser[0].UserId,
            cboRack_ID_From: manyRackFrom,
            cboRack_ID_To: manyRackTo,
            get_version: dataUser[0].WareHouse
        }
        axios.post(url, data, config).then(response => {
            if (response.data === true) {
                setOpen(true)
            }
            setOpenCofirm(false)
        })

    }

    //#endregion
    
    return (
        <FullScreenContainerWithNavBar navigate="/" sideBarDisable={true} sideBarNavigate="" title={t("btnPrintRack_QRcode")}>
            <Box
                height={'100%'}
                paddingX={4}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Stack direction={'row'} height={'100%'} justifyContent={'center'}>
                    <Grid spacing={4} container width={'90%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Grid item xs={3}>
                            <RadioGroup value={selectedValue} onChange={handleChange}>
                                <FormControlLabel value="oneRack" control={<Radio />} label={t("rbtPrint_One") as string} />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={4.5}>
                            <Typography>{t("dcmRack_ID")}</Typography>
                        </Grid>
                        <Grid item xs={4.5}>
                            {/* <TextField
                                value={oneRack}
                                onChange={handleOneRack}
                                id="outlined-select-currency"
                                sx={{ width: '100%', }}
                                select
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
                                {listRack &&
                                    listRack.map((item: any) => (
                                        <MenuItem key={item.rack} value={item.rack}>
                                            {item.rack}
                                        </MenuItem>
                                    ))}
                            </TextField> */}

                            <Autocomplete
                                value={oneRack}
                                onChange={(event: any, newValue: string | null) => {
                                    handleOneRack(newValue)
                                }}
                                className="dark-bg-primary"
                                disablePortal
                                options={listRack.map((item: any) => item.rack)}
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
                                            },
                                            
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <RadioGroup value={selectedValue} onChange={handleChange}>
                                <FormControlLabel value="manyRack" control={<Radio />} label={t("rbtPrint_Many") as string} />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={1.5}>
                            <Typography>{t("lblFrom")}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            {/* <TextField
                                id="outlined-select-currency"
                                sx={{ width: '100%', }}
                                value={manyRackFrom}
                                onChange={handleManyRackFrom}
                                select
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
                                {listRack &&
                                    listRack.map((item: any) => (
                                        <MenuItem key={item.rack} value={item.rack}>
                                            {item.rack}
                                        </MenuItem>
                                    ))}
                            </TextField> */}
                             <Autocomplete
                                value={manyRackFrom}
                                onChange={(event: any, newValue: string | null) => {
                                    handleManyRackFrom(newValue)
                                }}
                                className="dark-bg-primary"
                                disablePortal
                                options={listRack.map((item:any) => item.rack)}
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
                        <Grid item xs={1.5}>
                            <Typography sx={{ textAlign: 'center' }}>{t("lblTo")}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            {/* <TextField
                                id="outlined-select-currency"
                                sx={{ width: '100%', }}
                                value={manyRackTo}
                                onChange={handleManyRackTo}
                                select
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
                                {listRack &&
                                    listRack.map((item: any) => (
                                        <MenuItem key={item.rack} value={item.rack}>
                                            {item.rack}
                                        </MenuItem>
                                    ))}
                            </TextField> */}
                            <Autocomplete
                                value={manyRackTo}
                                onChange={(event: any, newValue: string | null) => {
                                    handleManyRackTo(newValue)
                                }}
                                className="dark-bg-primary"
                                disablePortal
                                options={listRack.map((item:any) => item.rack)}
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

                        <Grid item xs={12}>
                            <RadioGroup value={selectedValue} onChange={handleChange}>
                                <FormControlLabel value="allRack" control={<Radio />} label={t("rbtPrint_All") as string} />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
                            <MyButton name={t("btnSave")} onClick={handlePrint} />
                        </Grid>
                        <Grid item xs={6}>
                            <MyButton name={t("btnClean")} onClick={handleRefresh} />
                        </Grid>
                    </Grid>
                </Stack>
                {open && <ModalCofirm open={open} onClose={() => setOpen(false)} onPressOK={() => setOpen(false)} title={t("msgPrintSuccess") as string} />}
                {openCofirm && <ModalCofirm onPressOK={handleOK} open={openCofirm} onClose={() => setOpenCofirm(false)} title={t("msgCofirmPrint") as string} />}
                {cofirmType === 'print-permission' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblPrintPermission") as string} />}
            </Box>
        </FullScreenContainerWithNavBar >
    )
}

export default PrintShelveCode