import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import MyTableNew from "../../../../components/MyTableNew";
import { useState } from "react";

interface ModalReturnMaterialSampleProps {
    title?: string,
    open?: any,
    onClose?: any,
    onPressOK?: any,
    showOk?: boolean,
    showCancel?: boolean,
    data?: any,
    columns?: any,
}

const ModalReturnMaterialSample = (props: ModalReturnMaterialSampleProps) => {
    const { title, open, onClose, onPressOK, showOk = true, showCancel = true, data = [], columns = [] } = props
    const { t } = useTranslation();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '35%',
        height: '50%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
        p: 2,
    };

    const [listCheck, setListCheck] = useState<any []>([])

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            slotProps={{
                backdrop: {
                    style: {
                        backdropFilter: "blur(2px)", // Hiệu ứng làm mờ nền
                    },
                },
            }}
        >
            <Box sx={style}>
                <Stack direction={'column'} height={'100%'} gap={1}>
                    <Stack  justifyContent={'center'}>
                        <Typography className='textsize' color={'white'} sx={{ fontSize: 20, textAlign:"center" }}>{title}</Typography>
                    </Stack>
                    <Stack sx={{ height: '100%', overflow: 'hidden' }}>
                        <MyTableNew
                            columns={columns || []}
                            rows={data || []}
                            checkBox={true}
                            handleCheckBox={() => { return true}}
                            listChx={(row: any) => setListCheck(row)}
                        />
                    </Stack>
                    <Stack  direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
                        {
                            showOk === true &&
                            (
                                <Button className='textsizebtn' onClick={() => onPressOK(listCheck)} style={{ color: 'white', backgroundColor: '#17594A', marginRight: 20, minWidth: '25%', border: '1px solid white' }}>{t("btnSuccess")}</Button>
                            )
                        }
                        {
                            showCancel === true &&
                            (
                                <Button className='textsizebtn' onClick={onClose} style={{ color: 'white', backgroundColor: '#F24C3D', minWidth: '25%', border: '1px solid white' }}>{t("btnCancel")}</Button>
                            )
                        }
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}

export default ModalReturnMaterialSample;