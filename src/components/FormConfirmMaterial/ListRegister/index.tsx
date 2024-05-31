import { Box, Checkbox, FormControlLabel, IconButton, Modal, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BiArrowBack } from "react-icons/bi";
import { TbListSearch } from "react-icons/tb";
import DatePickerField from "../../DatePickerField";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import moment from "moment";
import { useState } from "react";
import InputField from "../../InputField";
import { styletext } from "../../../screens/StockinScreenv2/StockinForm";
import MyButton from "../../MyButton";
import TableOrigin from "../../TableOrigin";
import { GridColDef } from "@mui/x-data-grid";
import { connect_string } from "../../../screens/LoginScreen/ChooseFactory";
import { useSelector } from "react-redux";
import axios from "axios";
interface ListRegisterPros {
    open: any,
    onClose: any
}

const ListRegister: React.FC<ListRegisterPros> = ({ open, onClose }) => {
    const { t } = useTranslation()
    const dataUser = useSelector((state: any) => state.UserLogin.user);

    const columns: GridColDef[] = [
        {
            field: "stt",
            headerName: t("dcpNum") as string,
            width: 70,
            headerClassName: "custom-header",
        },
        {
            field: "Order_No",
            headerName: t("dcmOrder_No") as string,
            width: 150,
            headerClassName: "custom-header",
        },
        {
            field: "Material_No",
            headerName: t("dcmMaterial_No") as string,
            width: 150,
            headerClassName: "custom-header",
        },
        {
            field: "Print_Date",
            headerName: t("chxPrint_Date") as string,
            width: 150,
            headerClassName: "custom-header",
        },
        {
            field: "Material_Name",
            headerName: t("dcmMaterial_Name") as string,
            width: 200,
            headerClassName: "custom-header",
        },
        {
            field: "Arrival_QTY",
            headerName: t("dcmQTY") as string,
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Confirm_Status",
            headerName: t("dcpLabel_Status") as string,
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Action_Taken",
            headerName: t("dcpAction_Taken") as string,
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "CBQC",
            headerName: t("CBQC") as string,
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "CBWH",
            headerName: t("CBWH") as string,
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Priority_Vote",
            headerName: t("dcpPriority_Vote") as string,
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Priority_No",
            headerName: t("dcpPriority_No") as string,
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "Modify_Date",
            headerName: t("dcpModify_Date") as string,
            width: 160,
            headerClassName: "custom-header",
        },
        {
            field: "User_Serial_Key",
            headerName: t("dcmUser_Name") as string,
            width: 160,
            headerClassName: "custom-header",
        },

    ];

    const [dtpFrom_Date, setDtpFrom_Date] = useState(
        moment().format("MM/DD/YYYY")
    );
    const [materialNo, setMaterialNo] = useState("")
    const [loading, setLoading] = useState(false)
    const [chxDate, setChxDate] = useState(false)
    const [data, setData] = useState<any[]>([])

    const handleChangeTxtMaterialNo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialNo(event.target.value);
    };

    const handleClickDateFrom = (name: string) => {
        let newDate = moment(dtpFrom_Date, "MM/DD/YYYY");
        if (name === "-") {
            newDate = newDate.subtract(1, "month");
            setDtpFrom_Date(moment(newDate).format("MM/DD/YYYY"));
        } else if (name === "+") {
            newDate = newDate.add(1, "month");
            setDtpFrom_Date(moment(newDate).format("MM/DD/YYYY"));
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '85%',
        "@media screen and (max-width: 1200px)": {
            width: "85%",
        },
        height: '80%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,
        // p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    };

    const handleSearch = () => {
        setLoading(true)
        const url = connect_string + "api/Get_Data_Confirm_QC_ERP_History"
        const data =
        {
            Material_No: materialNo,
            Value_Material_No: "",
            chxChose_Date: chxDate,
            dtpDate: moment(dtpFrom_Date).format("YYYY-MM-DD"),
            Version: dataUser[0].WareHouse
        }
        axios.post(url, data).then(res => {
            const arr = res.data.map((item: any, index: any) => ({
                _id: index + 1,
                stt: index + 1,
                Order_No: item.Order_No,
                Material_No: item.Material_No,
                Print_Date: item.Print_Date,
                Material_Name: item.Material_Name,
                Arrival_QTY: item.Arrival_QTY,
                Confirm_Status: item.Confirm_Status,
                Action_Taken: item.Action_Taken,
                CBQC: item.CBQC,
                CBWH: item.CBWH,
                Priority_Vote: item.Priority_Vote,
                Priority_No: item.Priority_No,
                Modify_Date: item.Modify_Date,
                User_Serial_Key: item.User_Serial_Key
            }))
            setData(arr)
            setLoading(false)
        }).catch(() => setLoading(false))

    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} style={{ borderBottom: '1px solid gray' }}>
                    {/* Nút back */}
                    <IconButton className={'back-button'} onClick={onClose}>
                        <BiArrowBack className=" icon-wrapper" />
                    </IconButton>
                    {/* Tittle */}
                    <Typography variant="h5" component="h5" color={'white'}>{t("lblList_Confirm")}</Typography>
                    {/* Nút xóa */}
                    <div></div>
                </Stack>
                <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={2}>
                    <Typography className="textsize">{t("dcmMaterial_No") as string}</Typography>
                    <Box className="dateTimeContainer flex-center" >
                        <InputField
                            customClass="customStack1"
                            handle={handleChangeTxtMaterialNo}
                            keydown={null}
                            value={materialNo}
                            label={""}
                            type={"text"}
                            disable={loading}
                        />
                    </Box>
                    <div >
                        <FormControlLabel
                            sx={styletext}
                            control={
                                <Checkbox
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        setChxDate(event.target.checked)
                                    }
                                    defaultChecked={false}
                                    value={chxDate}
                                />
                            }
                            label={t("dcmDate")}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 5, }}>
                        {/* Mũi tên < từ */}
                        <Stack display={"flex"} className="btn-date" onClick={() => handleClickDateFrom("-")}>
                            <ArrowBackIosNewOutlinedIcon display={"flex"} sx={{ width: '25px' }} />
                        </Stack>
                        {/* Date time từ */}
                        <Box className="dateTimeContainer flex-center">
                            <DatePickerField
                                customClass="customDateTime"
                                onValueChange={dtpFrom_Date}
                                valueDate={(params: any) => {
                                    setDtpFrom_Date(params);
                                }}
                            />
                        </Box>
                        {/* Mũi tên > từ */}
                        <Stack display={"flex"} className="btn-date" onClick={() => handleClickDateFrom("+")}>
                            <ArrowForwardIosOutlinedIcon display={"flex"} sx={{ width: '25px' }} />
                        </Stack>
                    </div>
                    <MyButton name={t("btnSearch") as string} disabled={loading ? true : false} onClick={handleSearch} />
                    <MyButton name={t("btnClean") as string} disabled={loading ? true : false} onClick={() => setData([])} />
                </Stack>
                <Stack overflow={"hidden"} direction="row" sx={{ height: "100%" }}>
                    <TableOrigin
                        columns={columns}
                        rows={data}
                        // handlerowClick={handlerowClickMaterial}
                        handleDoubleClick={null}
                        arrNotShowCell={["_id"]}
                    />
                </Stack>
            </Box>

        </Modal>
    )
}

export default ListRegister