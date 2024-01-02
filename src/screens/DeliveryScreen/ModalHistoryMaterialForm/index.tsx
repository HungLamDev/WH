//#region import
import { Box, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, IconButton, Modal, Stack, Typography } from "@mui/material"
import { BiArrowBack } from "react-icons/bi";
import TableOrigin from "../../../components/TableOrigin";
import { useTranslation } from 'react-i18next';
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
//#endregion
function ModalHistoryMaterial({ open, onClose, dataUpdate }: { open: any, onClose: any, dataUpdate: any }) {
    const { t } = useTranslation();
    //#region column header table
    const columns: GridColDef[] = [
        {
            field: "DateStock",
            headerName: "Date Stock",
            width: 150,
        },
        {
            field: "Remark",
            headerName: "QTY",
            width: 150,
        },
        {
            field: "Location",
            headerName: "Location",
            width: 250,
        },
    ];
    //#endregion
    
    //#region Style
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
    };
    //#endregion

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack height={'100%'}>
                    <Stack height={'10%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        {/* Nút back */}
                        <IconButton className={'back-button'} onClick={onClose}>
                            <BiArrowBack className=" icon-wrapper" sx={{ color: 'white' }} />
                        </IconButton>
                        {/* Title */}
                        <Typography variant="h6" component="h6" color={'lightblue'}>{dataUpdate[0] ? dataUpdate[0].Material_No: ""}</Typography>
                        {/* Check */}
                        <FormGroup>
                            <FormControlLabel className="text" control={<Checkbox checked
                                sx={{ color: 'white' }} />}
                                label={''} />
                        </FormGroup>
                    </Stack>
                    <Stack overflow={"hidden"}  height={'90%'} >
                        <TableOrigin columns={columns} rows={dataUpdate} />
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}
export default ModalHistoryMaterial