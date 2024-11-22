import { Box, CircularProgress, Grid, IconButton, Modal, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BiArrowBack } from "react-icons/bi";
import { TbListSearch } from "react-icons/tb";
import MyButton from "../../../../components/MyButton";
import { useEffect, useState } from "react";
import InputFieldV1 from "../../../../components/InputField/index_new";
import MyTableNew from "../../../../components/MyTableNew";
import useDebounced from "../../../../components/CustomHook/useDebounce";

interface CreateMergeBomProps {
    title?: string,
    open?: any,
    onClose?: any,
    onPressOK?: any,
    showOk?: boolean
}

const CreateMergeBom = (props: CreateMergeBomProps) => {

    const columns: any[] = [
        {
            field: "Po_No",
            headerName: "Po No",
            align: "center",
            headerAlign: 'center',
            width: 180,

        },
        {
            field: "Article",
            headerName: "Article",
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "KFJD",
            headerName: "KFJD",
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
        {
            field: "JiJie",
            headerName: "JiJie",
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
            field: "Modify_Date",
            headerName: "Modify Date",
            align: "center",
            headerAlign: 'center',
            width: 150,

        },
    ];

    const { title, open, onClose, onPressOK, showOk = true } = props
    const { t } = useTranslation();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '90%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column'
    };
    const [disable, setDisable] = useState(false)
    const [valueScan, setValueScan] = useState("")

    const handleValueScanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueScan(event.target.value);
    };

    //#region useDebounced
    const debouncedSearchTerm = useDebounced(valueScan, 200);
    useEffect(() => {
        //Phiên bản có kiểm tra chất lượng vật tư
        if (debouncedSearchTerm.length >= 15) {
            scanPoNo(debouncedSearchTerm)
        }
    }, [debouncedSearchTerm]);

    //#endregion

    const scanPoNo = (value: any) => {

    }

    return (
        <Modal
            open={open}
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
            <Box sx={style}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} style={{ borderBottom: '1px solid gray' }}>
                    {/* Nút back */}
                    <IconButton className={'back-button'} onClick={onClose}>
                        <BiArrowBack className=" icon-wrapper" />
                    </IconButton>
                    {/* Tittle */}
                    <Typography variant="h5" component="h5" color={'white'}>{t("btnCreateBOM")}</Typography>
                    <Typography variant="h5" component="h5" color={'white'}></Typography>
                </Stack>
                <Stack flex={1} gap={2} >
                    <Grid container  padding={'10px'}>
                        <Grid item display={'flex'} xs={4}>
                            {/* Scan xuất */}
                            <InputFieldV1
                                xsLabel={2}
                                xsInput={9}
                                label={t("gpbScan") as string}
                                disable={disable}
                                value={valueScan}
                                handle={handleValueScanChange}
                            />
                        </Grid>
                        <Grid item xs={1.5} display={"flex"}>
                            {disable && <CircularProgress size={'24px'} color='info' />}
                        </Grid>
                    </Grid>
                    <Stack sx={{ height: '100%' }}>
                        <Stack
                            overflow={"hidden"}
                            sx={{ height: '100%' }}
                        >
                            {/* Bảng */}
                            <MyTableNew
                                columns={columns}
                                rows={[]}
                                checkBox={false}
                            />
                        </Stack>
                        <Stack alignItems={'flex-end'} padding={'10px'}>
                            <MyButton height='2rem' name={t('btnCreateBOM')} onClick={undefined} disabled={disable} />
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
export default CreateMergeBom