import { Box, Checkbox, FormControlLabel, Grid, IconButton, Modal, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiArrowBack } from "react-icons/bi";
import MyButton from "../../MyButton";
import MyTableNew from "../../MyTableNew";
import { checkPermissionPrint, connect_string } from "../../../screens/LoginScreen/ChooseFactory";
import { styletext } from "../../../screens/StockinScreenv2/StockinForm";
import InputFieldV1 from "../../InputField/index_new";
import axios from "axios";
import { over } from "lodash";
import ModalCofirm from "../../ModalConfirm";
import { useSelector } from "react-redux";
import GenericAutocomplete from "../../GenericAutocomplete";

interface DetailMergeBOMProps {
    item: any;
    open: boolean;
    onClose: () => void;
}

const DetailMergeBOM = (props: DetailMergeBOMProps) => {
    const { item, open, onClose } = props;
    const { t } = useTranslation();

    const columnsBOM: any[] = [
        {
            field: "MatNo",
            headerName: "Material No",
            align: "center",
            headerAlign: 'center',
            width: 180,

        },
        {
            field: "MJBH",
            headerName: "MJBH",
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "USAGE",
            headerName: "USAGE",
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Qty",
            headerName: "Qty",
            align: "center",
            headerAlign: 'center',
        },
        {
            field: "CLSLMin",
            headerName: "CLSLMin",
            align: "center",
            headerAlign: 'center',
        },
        {
            field: "Unit",
            headerName: "Unit",
            align: "center",
            headerAlign: 'center'

        },
        {
            field: "SIZE",
            headerName: "SIZE",
            align: "center",
            headerAlign: 'center'

        },
        {
            field: "SuppID",
            headerName: "Supplier	ID",
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "Supplier",
            headerName: "Supplier",
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "ARTICLE",
            headerName: "ARTICLE",
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "stage",
            headerName: "Stage",
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "season",
            headerName: "Season",
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "po",
            headerName: "Po No",
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "MatName",
            headerName: "Material Name",
            align: "center",
            headerAlign: 'center',
            width: 150,
        },
    ];

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
        display: "flex",
        flexDirection: "column",
        overflow: 'hidden',
    };

    const dataUser = useSelector((state: any) => state.UserLogin.user);

    useEffect(() => {
        if (open) {
            setDataWaiting([])
            getDataWaiting(item);
        }
    }, [])

    const [dataWaiting, setDataWaiting] = useState<any[]>([]);
    const [dataWaitingFilter, setDataWaitingFilter] = useState<any[]>([]);
    const [disable, setDisable] = useState(false);
    const [listChx, setListChx] = useState<any[]>([]);
    const [checkSole, setCheckSole] = useState(false);
    const [cofirmType, setCofirmType] = useState('')
    const [openCofirm, setOpenCofirm] = useState(false)
    const [materialNo, setMaterialNo] = useState("")

    const listChooseMaterial = [
        {
            value: "all",
            title: t("chxAll")
        },
        {
            value: "lieu_don",
            title: t("lblSingleMaterials")
        },
        {
            value: "lieu_gia_cong",
            title: t("lblOutsourceMaterials")
        },
    ]

    const [valueChooseMaterial, setValueChooseMaterial] = useState({
        value: "all",
        title: t("chxAll")
    })

    const listChooseWarehouse = [
        {
            value: "all",
            title: t("chxAll")
        },
        {
            value: "da-vai-pu",
            title: t("lblLeather-Fabric-PU")
        },
        {
            value: "may-baobi",
            title: t("lblSewing-Packaging")
        },
        {
            value: "kho_de",
            title: t("lblSoleWarehouse")
        },
    ]

    const [valueChooseWarehouse, setValueChooseWarehouse] = useState({
        value: "all",
        title: t("chxAll")
    })



    const handleOpenConfirm = (confirmName: string) => {
        setCofirmType(confirmName)
        setOpenCofirm(true)
    }

    const handleCloseConfirm = () => {
        setCofirmType('')
        setOpenCofirm(false)
    }


    const handleCheckSole = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckSole(event.target.checked)
    }

    const handleOnChangeMaterialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setMaterialNo(value)
        if (value === "") {
            setDataWaitingFilter(dataWaiting)
        }
        else {
            const dataFilter = dataWaiting.filter((item: any) =>
                item?.MatNo.toLowerCase().includes(value.toLowerCase())
            );
            setDataWaitingFilter(dataFilter)
        }

    }


    const getDataWaiting = (value: any) => {
        setDataWaiting([])
        if (value !== '') {
            setDataWaiting([])
            setDataWaitingFilter([])
            setDisable(true)
            const url = connect_string + "api/get_Merge_Bom_ERP"
            const data = {
                Po_No: value?.Po_No,
                check_de: valueChooseWarehouse?.value,
                check_Gia_Cong_Lieu_Don: valueChooseMaterial?.value
            }

            axios.post(url, data).then(res => {
                const arr = res.data.map((item: any, index: any) => ({
                    _id: index,
                    stage: value?.KFJD || "",
                    season: value?.JiJie || "",
                    po: value?.Po_No || "",
                    ...item
                }))

                arr.sort((a: any, b: any) => {
                    const statusComparison = b.Status.localeCompare(a.Status);
                    if (statusComparison !== 0) return statusComparison;

                    return b.MJBH.localeCompare(a.MJBH);
                });

                setDataWaiting(arr)
                setDataWaitingFilter(arr)
            })
                .finally(() => {
                    setDisable(false)
                })

        }
    }

    const handleSearch = () => {
        getDataWaiting(item)
    }

    const handlePrint = async () => {
        // user mayin sẽ in tem thông tin kho mẫu
        if (await checkPermissionPrint("mayin")) {
            if (listChx.length > 0) {
                handleOpenConfirm("print")
            }
        }
        else {
            handleOpenConfirm('print-permission')
        }
    }

    const handlePrintOK = () => {
        if (listChx.length > 0) {
            handleCloseConfirm()
            //setDisable(true)
            const list_Prints = listChx.map((item) => ({
               // standard: item?.Qty || "",
                standard: item?.CLSLMin || "",
                Name_Material: item?.MatName || "",
                article: item?.ARTICLE || "",
                Stage: item?.stage || "",
                Season: item?.season || "",
                Pono: item?.po || "",
                Supplier_Name: item?.Supplier || "",
                Material_No: item?.MatNo || ""
            }))

            const data = {
                list_Prints: list_Prints,
                // user mayin sẽ in tem thông tin kho mẫu
                UserID: "mayin"
            }
            const url = connect_string + "api/PrintLabel_Delivery_Sample_CLick_Standard"

            axios.post(url, data).then(res => {
                if (res.data == true) {
                    handleOpenConfirm('print-success')
                }
                setDisable(false)
            }).catch(() => {
                handleOpenConfirm('print-permission')
                setDisable(false)
            })

        }
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            slotProps={{
                backdrop: {
                    style: {
                        backdropFilter: "blur(2px)",
                    },
                },
            }}
        >
            <Box sx={style}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} style={{ borderBottom: '1px solid gray' }}>
                    {/* Nút back */}
                    <IconButton className={'back-button'} onClick={onClose}>
                        <BiArrowBack className=" icon-wrapper" />
                    </IconButton>
                    {/* Tittle */}
                    <Typography variant="h5" component="h5" color={'white'}>{t("lblDetail") + " BOM"}</Typography>
                    <div></div>
                </Stack>
                <Stack flex={1} >
                    <Grid container padding={'10px'} gap={1} >
                        <Grid item container xs={12}>

                            <Grid item xs={4} display={'flex'} alignItems={'center'} justifyContent={"center"}>
                                <span className='textsize' style={{ color: 'orangered', overflow: "hidden", textOverflow: "ellipsis" }}> {item?.Article ? "Article: " + item?.Article : ""}</span>
                            </Grid>

                            <Grid item xs={4} display={'flex'} alignItems={'center'} justifyContent={"center"}>
                                <span className='textsize' style={{ color: 'orangered', overflow: "hidden", textOverflow: "ellipsis" }}> {item?.KFJD ? "Stage: " + item?.KFJD : ""}</span>
                            </Grid>
                            <Grid item xs={4} display={'flex'} alignItems={'center'} justifyContent={"center"}>
                                <span className='textsize' style={{ color: 'orangered', overflow: "hidden", textOverflow: "ellipsis" }}> {item?.JiJie ? "Season: " + item?.JiJie : ""}</span>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} display={'flex'} alignItems={'center'}>
                            <InputFieldV1
                                xsLabel={4}
                                xsInput={8}
                                label={t("btnSearch") as string}
                                disable={disable}
                                value={materialNo}
                                focus={true}
                                handle={handleOnChangeMaterialNo}
                            />
                        </Grid>
                        <Grid item display={'flex'} alignItems={'center'} xs={2}>
                            {/* Chọn kho */}
                            <GenericAutocomplete
                                options={listChooseWarehouse}
                                value={valueChooseWarehouse}
                                onChange={(newValue: any | "") => {
                                    if (newValue === null) {
                                        setValueChooseWarehouse({
                                            value: "all",
                                            title: t("chxAll")
                                        })
                                    }
                                    else {
                                        setValueChooseWarehouse(newValue || "")
                                    }
                                }}

                                getOptionLabel={(option) =>
                                    typeof option === "string" ? option : option.title
                                }
                                isOptionEqualToValue={(option, value) => {
                                    if (typeof value === 'string') {
                                        return option.title === value;
                                    }
                                    return option.title === value.title;
                                }}
                            />
                        </Grid>
                        <Grid item display={'flex'} alignItems={'center'} xs={2}>
                            {/* Chọn loại vật tư */}
                            <GenericAutocomplete
                                options={listChooseMaterial}
                                value={valueChooseMaterial}
                                onChange={(newValue: any | "") => {
                                    if (newValue === null) {
                                        setValueChooseMaterial({
                                            value: "all",
                                            title: t("chxAll")
                                        })
                                    }
                                    else {
                                        setValueChooseMaterial(newValue || "")
                                    }
                                }}

                                getOptionLabel={(option) =>
                                    typeof option === "string" ? option : option.title
                                }
                                isOptionEqualToValue={(option, value) => {
                                    if (typeof value === 'string') {
                                        return option.title === value;
                                    }
                                    return option.title === value.title;
                                }}
                            />
                        </Grid>

                        <Grid item display={'flex'} alignItems={'center'}>
                            {/* Nút tìm kiếm */}
                            <MyButton height='2rem' name={t('btnSearch')} onClick={handleSearch} disabled={disable} />
                        </Grid>
                        <Grid item display={'flex'} alignItems={'center'}>
                            {/* Nút in */}
                            <MyButton height='2rem' name={t('btnPrint')} onClick={handlePrint} disabled={disable} />
                        </Grid>
                    </Grid>
                    {cofirmType === "print" && <ModalCofirm open={openCofirm} onClose={handleCloseConfirm} title={t("msgCofirmPrint") as string} onPressOK={handlePrintOK} />}
                    {cofirmType === 'print-permission' && <ModalCofirm onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("lblPrintPermission") as string} />}
                    {cofirmType === 'print-success' && <ModalCofirm showCancel={false} onPressOK={handleCloseConfirm} open={openCofirm} onClose={handleCloseConfirm} title={t("msgPrintSuccess") as string} />}
                </Stack>
                <Stack
                    overflow={"hidden"}
                    sx={{ height: '100%' }}
                >
                    {/* Bảng */}
                    <MyTableNew
                        columns={columnsBOM}
                        rows={dataWaitingFilter}
                        checkBox={true}
                        listChx={(value: any) => setListChx(value)}
                        handleCheckBox={() => { return true }}
                    />
                </Stack>
            </Box>
        </Modal>
    )
}

export default DetailMergeBOM;