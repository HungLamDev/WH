//#region Import
import { Backdrop, Box, CircularProgress, Grid, IconButton, Modal, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BiArrowBack } from "react-icons/bi";
import MyButton from "../../../../components/MyButton";
import { useEffect, useState } from "react";
import InputFieldV1 from "../../../../components/InputField/index_new";
import MyTableNew from "../../../../components/MyTableNew";
import useDebounced from "../../../../components/CustomHook/useDebounce";
import { connect_string } from "../../../LoginScreen/ChooseFactory";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import ModalCofirm from "../../../../components/ModalConfirm";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import QRScanner from "../../../../components/QRScanner";

//#endregion

interface CreateMergeBomProps {
    title?: string,
    open?: any,
    onClose?: any,
    onPressOK?: any,
    showOk?: boolean
}

const CreateMergeBom = (props: CreateMergeBomProps) => {

    //#region columnHeader
    const columns: any[] = [
        {
            field: "TestNo",
            headerName: "Test No",
            align: "center",
            headerAlign: 'center',
            width: 180,
        },
        // {
        //     field: "Po_No",
        //     headerName: "Po No",
        //     align: "center",
        //     headerAlign: 'center',
        //     width: 180,
        // },
        {
            field: "Article",
            headerName: "Article",
            align: "center",
            headerAlign: 'center',
            width: 150,
        },
        {
            field: "KFJD",
            headerName: "Stage",
            align: "center",
            headerAlign: 'center',
            width: 150,
        },
        {
            field: "JiJie",
            headerName: "Sesson",
            align: "center",
            headerAlign: 'center',
        },
        {
            field: "YPDH",
            headerName: "YPDH",
            align: "center",
            headerAlign: 'center'
        },
        {
            field: "User_ID",
            headerName: "User ID",
            align: "center",
            headerAlign: 'center'
        },
        {
            field: "YPZLBH",
            headerName: "Merge No",
            align: "center",
            headerAlign: 'center'
        },
        {
            field: "Modify_Date",
            headerName: "Modify Date",
            align: "center",
            headerAlign: 'center',
            width: 150,
        },
    ];
    //#endregion

    const { title, open, onClose, onPressOK, showOk = true } = props
    const { t } = useTranslation();

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region style
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
        display: 'flex',
        flexDirection: 'column'
    };
    //#endregion

    //#region Variable
    const [disable, setDisable] = useState(false)
    const [valueScan, setValueScan] = useState("")
    const [itemRow, setItemRow] = useState<any>({})
    const [data, setData] = useState<any[]>([])
    const [mergeNo, setMergeNo] = useState("")
    const [cofirmType, setCofirmType] = useState('')
    const [openCofirm, setOpenCofirm] = useState(false)
    const [modalScan, setModalScan] = useState(false)

    //#endregion

    //#region handleOnChange

    const handleOpenConfirm = (confirmName: string) => {
        setCofirmType(confirmName)
        setOpenCofirm(true)
    }

    const handleCloseConfirm = () => {
        setCofirmType('')
        setOpenCofirm(false)
    }

    const handleValueScanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueScan(event.target.value);
    };

    const handleMergeNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMergeNo(event.target.value);
    };
    //#endregion

    //#region useDebounced
    const debouncedSearchTerm = useDebounced(valueScan, 200);
    useEffect(() => {
        //Phiên bản có kiểm tra chất lượng vật tư
        if (
            debouncedSearchTerm !== "" &&
            debouncedSearchTerm.length > 10 &&
            debouncedSearchTerm.includes("-")
        ) {
            scanPoNo(debouncedSearchTerm)
        }
    }, [debouncedSearchTerm]);

    //#endregion

    //#region Func Logic

    const handleScanClick = () => {
        setModalScan(true);
    }

    const handleScan = async (result: any | null) => {

        if (result || result.text) {
            setValueScan(result.text)
            // setModalScan(false)
        }
    }


    const handleRowClick = (params: any, item: any) => {
        setItemRow(item)
    }

    const handleDeleteRow = () => {
        const findItemIndex = data.findIndex(
            (item) => item.Po_No === itemRow.Po_No
        );

        if (findItemIndex !== -1) {
            const updatedData = [...data];
            updatedData.splice(findItemIndex, 1);

            setData(updatedData);
        }
    }

    const addPoNo = (prev: any[], newItem: any): any[] => {
        // Tìm xem đã có phần tử nào trong mảng trong không, nếu ko có trả về -1
        const existingItemIndex = prev.findIndex(
            (item) => item.TestNo === newItem.TestNo
        );
        setValueScan("")

        // Nếu khác -1 thì gom hàng
        if (existingItemIndex === -1) {
            return [...prev, newItem];
        }
        else {
            const updatedArray = [...prev];
            updatedArray.splice(existingItemIndex, 1); // Xóa phần tử cũ
            updatedArray.push(newItem); // Thêm phần tử mới
            return updatedArray;
        }
    };

    const scanPoNo = (value: any) => {
        const POAndTestNo = value.split("-")

        const url = connect_string + "api/Create_Merge_Bom"
        const dataPoNo = {
            User_WH: dataUser[0].UserId,
            Po_No: POAndTestNo[0]?.trim() || "",
            TestNo: [POAndTestNo[1]?.trim() || ""]
        }

        axios.post(url, dataPoNo).then(res => {
            if (res?.data?.TestNo !== null) {

                const checkKFJDAndJiJie = data.some(
                    (item: any) => item.KFJD === res?.data?.KFJD && item.JiJie === res?.data?.JiJie
                )

                if (checkKFJDAndJiJie === true || data.length === 0) {
                    const _id = Math.floor(Math.random() * 10000000) + 1;
                    const newItem = {
                        ...res.data,
                        _id: _id,
                        Modify_Date: moment(res.data.Modify_Date).format("DD/MM/YYYY HH:mm:ss"),
                    }
                    setData((prev: any[]) => addPoNo(prev, newItem));
                }
                else if (data.length > 0 && checkKFJDAndJiJie === false) {
                    handleOpenConfirm("no-KFJD-JiJie")
                }
                setValueScan("")

            }
        })
        // .finally(() => {
        //     setDisable(false)
        // })

    }

    const createBOM = () => {
        if (data.length > 0) {
            setDisable(true)

            const hasMatchingItem = data.some(
                (item) => item.YPZLBH !== "" && item.YPZLBH !== null
            );

            const listTestNo = data.map(item => item.TestNo);

            if (!hasMatchingItem) {
                const url = connect_string + "api/insert_Merge_Bom_ERP"

                const data = {
                    list_TestNo: listTestNo,
                    user_id: dataUser[0].UserId
                }

                axios.post(url, data).then(res => {
                    if (res.data.length === 0) {
                        handleOpenConfirm("no-create-bom")
                    }
                    const arr = res.data.map((item: any, index: any) => ({
                        _id: index + 1,
                        ...item
                    }))
                    setData(arr)


                }).finally(() => {
                    setDisable(false)
                })
            }
            else {
                setDisable(false)
                handleOpenConfirm("exist-mergeno")
            }
        }

    }

    const handleMergeNoToPono = () => {
        setDisable(true)
        const url = connect_string + "api/Merge_No_To_Pono"
        const data = {
            ypzlbh: mergeNo
        }

        axios.post(url, data).then(res => {
            const arr = res.data.map((item: any, index: any) => ({
                _id: index + 1,
                ...item,
                Modify_Date: moment(item.Modify_Date).format("DD/MM/YYYY HH:mm:ss")
            }))
            setData(arr)
            setMergeNo("")
        })
            .finally(() => {
                setDisable(false)
            })
    }

    //#endregion

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
                    <Typography variant="h5" component="h5" color={'white'}>{t("btnCreateBOM")}</Typography>
                    {/* Camera */}
                    <IconButton sx={{ marginLeft: '20px' }}  >
                        <CameraAltIcon onClick={handleScanClick} />
                    </IconButton>
                </Stack>
                <Stack flex={1} >
                    <Grid container padding={'10px'} spacing={2}>
                        <Grid item display={'flex'} xs={3.5}>
                            {/* Scan xuất */}
                            <InputFieldV1
                                xsLabel={2}
                                xsInput={8}
                                label={t("gpbScan") as string}
                                disable={disable}
                                value={valueScan}
                                handle={handleValueScanChange}
                            />
                        </Grid>
                        <Grid item display={'flex'} xs={3.5}>
                            {/* Merge No */}
                            <InputFieldV1
                                xsLabel={4}
                                xsInput={8}
                                label={"Merge No"}
                                disable={disable}
                                value={mergeNo}
                                handle={handleMergeNoChange}
                            />
                        </Grid>

                        <Grid item display={'flex'} xs={1.5}>
                            {/* Nút tìm kiếm */}
                            <MyButton height='2rem' name={t('btnSearch')} onClick={handleMergeNoToPono} disabled={disable} />
                        </Grid>

                        <Grid item display={'flex'} xs={1.5}>
                            {/* Nút xóa */}
                            <MyButton height='2rem' name={t('btnDelete')} onClick={handleDeleteRow} disabled={disable} />
                        </Grid>

                        <Grid item display={'flex'} xs={1.5}>
                            {/* Nút lamf mới */}
                            <MyButton height='2rem' name={t('btnClean')} onClick={() => setData([])} disabled={disable} />
                        </Grid>

                        {/* <Grid item xs={0.5} display={"flex"} alignItems={'center'}>
                            {disable && <CircularProgress size={'24px'} color='info' />}
                        </Grid> */}
                    </Grid>
                    <Stack sx={{ height: '100%' }}>
                        <Stack
                            overflow={"hidden"}
                            sx={{ height: '100%' }}
                        >
                            {/* Bảng */}
                            <MyTableNew
                                columns={columns}
                                rows={data}
                                checkBox={false}
                                handlerowClick={handleRowClick}
                            />
                        </Stack>
                        <Stack alignItems={'flex-end'} padding={'10px'}>
                            {/* Tạo BOM */}
                            <MyButton height='2rem' name={t('btnCreateBOM')} onClick={createBOM} disabled={disable} />
                        </Stack>
                    </Stack>

                    {cofirmType === "no-create-bom" && <ModalCofirm showOk={false} open={openCofirm} onClose={handleCloseConfirm} title={t("btnCreateBOMError") as string} />}
                    {cofirmType === "exist-mergeno" && <ModalCofirm showOk={false} open={openCofirm} onClose={handleCloseConfirm} title={t("lblExistMergeno") as string} />}
                    {cofirmType === "no-KFJD-JiJie" && <ModalCofirm showOk={false} open={openCofirm} onClose={handleCloseConfirm} title={t("lblKFJDAndJiJie") as string} />}
                    {modalScan && <QRScanner onScan={handleScan} open={modalScan} onClose={() => { setModalScan(false); }} />}

                    {/* Loading khi tạo phiếu */}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={disable}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Stack>
            </Box>
        </Modal>
    )
}

export default CreateMergeBom