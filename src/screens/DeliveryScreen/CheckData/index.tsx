//#region  import
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar";
import { Box, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, Stack } from "@mui/material";
import { styletext } from "../../StockinScreenv2/StockinForm";
import TableOrigin from "../../../components/TableOrigin";
import InputField from "../../../components/InputField";
import MyButton from "../../../components/MyButton";
import { config } from "../../../utils/api";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import axios from "axios";
import QRScanner from "../../../components/QRScanner";
import { successSound } from "../../../utils/pathsound";
//#endregion
const CheckData = () => {
    const { t } = useTranslation();
    //#region Style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '70%',
        width: '25%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingX: '20px'
    };
    //#endregion
    //#region  column table
    const columns: GridColDef[] = [
        {
            field: "_id",
            headerName: t("dcpNum") as string,
            width: 150,
        },
        {
            field: "Num_No",
            headerName: t("dcpNum_No") as string,
            width: 150,
        },
        {
            field: "Material_No",
            headerName: t("dcmMaterial_No") as string,
            width: 150,
        },
        {
            field: "Material_Name",
            headerName: t("dcmMaterial_Name") as string,
            width: 150,
        },
        {
            field: "Location",
            headerName: t("dcpLocation") as string,
            width: 150,
        },
        {
            field: "Qty",
            headerName: t("dcmQTY") as string,
            width: 250,
        },
        {
            field: "Qty_ERP",
            headerName: t("dcpQTY_ERP") as string,
            width: 150,
        },
        {
            field: "Qty_L",
            headerName: t("dcpDeviations") as string,
            width: 150,
        },
        {
            field: "RY",
            headerName: t("chxRY") as string,
            width: 400,
        },
        {
            field: "RY_ERP",
            headerName: "RY ERP",
            width: 90,
        },
        {
            field: "RY_L",
            headerName: t("dcpDeviations") as string,
            width: 200,
        },

    ];

    const columnsDownLeft: GridColDef[] = [
        {
            field: "_id",
            headerName: t("dcpNum") as string,
            width: 150,
        },
        {
            field: "Num_No",
            headerName: t("dcpNum_No") as string,
            width: 150,
        },
        {
            field: "Material_No",
            headerName: t("dcmMaterial_No") as string,
            width: 150,
        },
        {
            field: "RY",
            headerName: t("dcpDDBH") as string,
            width: 150,
        },
        {
            field: "Qty",
            headerName: t("dcmQTY") as string,
            width: 150,
        },
        {
            field: "Qty_ERP",
            headerName: t("dcpQTY_ERP") as string,
            width: 150,
        },
        {
            field: "Qty_L",
            headerName: t("dcpDeviations") as string,
            width: 150,
        },

    ];

    const columnsDownRight: GridColDef[] = [

        {
            field: "_id",
            headerName: t("dcpNum") as string,
            width: 150,
        },
        {
            field: "Num_No_thieu_lenh",
            headerName: t("dcpNum_No") as string,
            width: 150,
        },
        {
            field: "Material_No_thieu_lenh",
            headerName: t("dcmMaterial_No") as string,
            width: 150,
        },
        {
            field: "RY_thieu_lenh",
            headerName: t("dcpDDBH") as string,
            width: 150,
        },
        {
            field: "Qty_thieu_lenh",
            headerName: t("dcmQTY") as string,
            width: 150,
        },
    ];
    //#endregion
    //#region Var
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    const [rows, setRows] = useState([]);
    const [rowsLeft, setRowsLeft] = useState([]);
    const [rowsRight, setRowsRight] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [orderNo, setOrderNo] = useState('');
    const [materialNo, setMateriaNo] = useState('');
    const [disable, setDisable] = useState(false)
    const [mode, setMode] = useState(false)
    const [modalScan, setModalScan] = useState(false)
    //#endregion
    
    //#region Func OnChange Input
    const handleOrderNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNo(event.target.value)
    }
    const handleMateriaNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMateriaNo(event.target.value);
    };
    //#endregion

    //#region Func Logic
    const handleSearch = () => {
        setIsLoading(true)
        const url = connect_string + "api/btnSearch_Click_Report_Num_No_Delivery"
        const data = {
            txtNum_No: orderNo,
            txtMaterial_No: materialNo
        }
        axios.post(url, data, config).then(response => {
            const arr = response.data.map((item: any, index: any) => ({
                _id: index + 1,
                ...item
            }))
            setRows(arr)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleRowClick = (name: string, params: any) => {
        setIsLoading(true)
        const url = connect_string + "api/dgvData_Rack_MouseClick"
        const data = {
            Material_No: params.Material_No,
            Num_No: params.Num_No
        }
        axios.post(url, data, config).then(response => {
            const arrLeft = response.data[0].map((item: any, index: any) => ({
                _id: index + 1,
                ...item
            }))
            setRowsLeft(arrLeft)
            const arrRight = response.data[1].map((item: any, index: any) => ({
                _id: index + 1,
                ...item
            }))
            setRowsRight(arrRight)
        }).finally(() => {
            setIsLoading(false)
        })
    }
    const handleScanClick = () => {
        setMode(true);
        setModalScan(true);
    }
    const handleScanCam = async (result: any | null) => {
        if (result || result.text) {
            CheckScanMaterialNo(result.text)
            setModalScan(false)
            modalScan && successSound.play();
        }
    }
    const CheckScanMaterialNo = (barcode: string) => {

        const url = connect_string + 'api/Get_Material_No_Scan'
        const data = {
            Barcode_Scan: barcode
        }
        axios.post(url, data, config).then(response => {
            const arr = response.data;
            setMateriaNo(arr)

        })
    }
    //#endregion
   
    return (
        <FullScreenContainerWithNavBar hidden={true} onShowScan={handleScanClick} sideBarDisable={true} sideBarNavigate='' title={t("lblChecklistOfMaterialReleaseSlips")} navigate="/delivery">
            <Box
                paddingX={1}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
            >
                <Stack marginTop={'10px'} width={'100%'} direction={'row'} spacing={3} justifyContent={'center'}>
                    <Grid container display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Grid item xs={3.5} display={'flex'}>
                            <InputField value={orderNo} handle={handleOrderNoChange} label={t('dcmOrder_No') as string} focus={true} disable={disable} />
                        </Grid>
                        <Grid item xs={3.5} display={'flex'}>
                            <InputField value={materialNo} handle={handleMateriaNoChange} label={t('dcmMaterial_No') as string} disable={disable} />
                        </Grid>
                        <Grid item xs={1.5} display={'flex'}>
                            <MyButton name={t('btnSearch')} disabled={disable} onClick={handleSearch} />
                        </Grid>
                        <Grid item xs={1.5} display={'flex'}>
                            <MyButton name={t('btnExcel')} disabled={disable} />
                        </Grid>
                        <Grid item xs={1.5} display={'flex'}>
                            {isLoading && <CircularProgress size={'25px'} color="info" />}
                        </Grid>
                    </Grid>
                </Stack>
                {modalScan && <QRScanner onScan={handleScanCam} open={modalScan} onClose={() => { setModalScan(false); setMode(false); }} />}
            </Box>
            <Stack overflow={"hidden"} sx={{ height: '100%' }}>
                <Stack height={'55%'}>
                    <TableOrigin columns={columns} rows={rows} handlerowClick={handleRowClick} />
                </Stack>
                <Stack height={'45%'} direction={'row'}>
                    <Stack overflow={"hidden"} width={'60%'} borderRight={'2px solid white'}>
                        <TableOrigin columns={columnsDownLeft} rows={rowsLeft} />
                    </Stack>
                    <Stack width={'40%'}>
                        <TableOrigin columns={columnsDownRight} rows={rowsRight} />
                    </Stack>
                </Stack>
            </Stack>
        </FullScreenContainerWithNavBar>
    )
}

export default CheckData