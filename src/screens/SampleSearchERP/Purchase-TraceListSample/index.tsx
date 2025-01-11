//#region Import
import { Checkbox, FormControlLabel, Grid, Stack, Typography } from "@mui/material"
import InputFieldV1 from "../../../components/InputField/index_new"
import axios from "axios";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import { useEffect, useState } from "react";
import MyButton from "../../../components/MyButton";
import { MyTableSampleMergeCell } from "..";
import MyTableNewSample from "../../../components/MyTableNewSample";
import moment from "moment";
import GenericAutocomplete from "../../../components/GenericAutocomplete";
import DatePickerFieldV1 from "../../../components/DatePickerField/index_new";
import { styletext } from "../../StockinScreenv2/StockinForm";
//#endregion

const PurchaseTraceListSample = () => {
    //#region ColumnTop
    const columnsTop1 = [
        {
            field: "Purchange",
            headerName: "Purchange",
            colSpan: true,
            colSpanNumber: 5,
            width: "550px",
            sticky: true,
            stickyPosition: 0
        },
        {
            field: "CLBH",
            headerName: "Mat No",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "120px"
        },
        {
            field: "YWPM",
            headerName: "YWPM",
            rowSpan: true,
            rowSpanNumber: 2,
        },
        {
            field: "Purchange_QTY",
            headerName: "Purchange QTY",
            rowSpan: true,
            rowSpanNumber: 2,
        },
        {
            field: "Received_QTY",
            headerName: "Received QTY",
            rowSpan: true,
            rowSpanNumber: 2,
        },
        {
            field: "Unit",
            headerName: "Unit",
            rowSpan: true,
            rowSpanNumber: 2,
        },
        {
            field: "ERP",
            headerName: "ERP",
            colSpan: true,
            colSpanNumber: 8,
        },
        {
            field: "Purchase_Date",
            headerName: "Purchase Date",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "120px"
        },

        {
            field: "Received_Date",
            headerName: "Received Date",
            rowSpan: true,
            rowSpanNumber: 2,
        },
        {
            field: "Purchange",
            headerName: "Purchange",
            colSpan: true,
            colSpanNumber: 3,
        },
        {
            field: "NG",
            headerName: "NG",
            colSpan: true,
            colSpanNumber: 6,
        },
        {
            field: "Spplier_Invoice",
            headerName: "Spplier Invoice",
            colSpan: true,
            colSpanNumber: 13,
        },
        {
            field: "Last_Update_Date",
            headerName: "Last Update Date",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "Place_Order_User",
            headerName: "Place Order User",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "All_Article",
            headerName: "All Article",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "QC_Check",
            headerName: "QC Check",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "QC_Inspection_1",
            headerName: "QC Inspection 1",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "QC_Inspection_2",
            headerName: "QC Inspection 2",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "Category",
            headerName: "Category",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "QC_Inspection",
            headerName: "QC Inspection",
            colSpan: true,
            colSpanNumber: 3,
        },
        {
            field: "Defects_Name",
            headerName: "Defects Name",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "Revise_Reason",
            headerName: "Revise Reason",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "Reorder_Reason",
            headerName: "Reorder Reason",
            rowSpan: true,
            rowSpanNumber: 2
        },
    ];

    const columnsTop = [
        {
            field: "CGNO",
            headerName: "NO",
            width: "120px",
            sticky: true,
            stickyPosition: 0
        },
        {
            field: "Kind",
            headerName: "Kind",
            width: "120px",
            sticky: true,
            stickyPosition: 120
        },
        {
            field: "Tax",
            headerName: "Tax",
            checkbox: true,
            width: "120px",
            sticky: true,
            stickyPosition: 240
        },
        {
            field: "SEASON",
            headerName: "Sea",
            width: "120px",
            sticky: true,
            stickyPosition: 270

        },
        {
            field: "PURPOSE",
            headerName: "Stage",
            width: "120px",
            sticky: true,
            stickyPosition: 370

        },
        {
            field: "Transport",
            headerName: "Transport",
        },
        {
            field: "Total_Weight",
            headerName: "Total Weight",
        },
        {
            field: "HC_USACC",
            headerName: "HC_USACC",
        },
        {
            field: "HC_USPice",
            headerName: "HC_USPice",
        },
        {
            field: "USPice",
            headerName: "USPice",
        },
        {
            field: "US_Amount",
            headerName: "US Amount",
        },
        {
            field: "VN_Price",
            headerName: "VNPrice",
        },
        {
            field: "VN_Amount",
            headerName: "VN Amount",
        },
        {
            field: "Req._Date",
            headerName: "Req.Date",
        },
        {
            field: "ETD",
            headerName: "ETD",
        },
        {
            field: "memo",
            headerName: "memo",
        },
        {
            field: "Reason",
            headerName: "Reason",
        },
        {
            field: "ETD",
            headerName: "ETD",
        },
        {
            field: "ETA",
            headerName: "ETA",
        },
        {
            field: "Result",
            headerName: "Result",
        },
        {
            field: "Remark",
            headerName: "Remark",
        },
        {
            field: "Color_window",
            headerName: "Color window",
        },
        {
            field: "ETA",
            headerName: "ETA",
        },
        {
            field: "ID",
            headerName: "ID",
        },
        {
            field: "Name",
            headerName: "Name",
        },
        {
            field: "Supplier_Counttry",
            headerName: "Supplier Counttry",
        },
        {
            field: "Prod_Location",
            headerName: "Prod Location",
        },
        {
            field: "BillNo",
            headerName: "BillNo",
        },
        {
            field: "Invoice",
            headerName: "Invoice",
        },
        {
            field: "Transport",
            headerName: "Transport",
        },
        {
            field: "Custom",
            headerName: "Custom",
        },
        {
            field: "BillNo_2",
            headerName: "BillNo_2",
        },
        {
            field: "Invoice 2",
            headerName: "Invoice 2",
        },
        {
            field: "Transport 2",
            headerName: "Transport 2",
        },
        {
            field: "Custom 2",
            headerName: "Custom 2",
        },
        {
            field: "Result",
            headerName: "Result",
        },
        {
            field: "FinishDate",
            headerName: "FinishDate",
        },
        {
            field: "Settlement",
            headerName: "Settlement",
        },
    ];

    const columnsShowDataTop = [
        {
            field: "CGNO",
            headerName: "NO",
            width: "120px",
            sticky: true,
            stickyPosition: 0
        },
        {
            field: "Kind",
            headerName: "Kind",
            width: "120px",
            sticky: true,
            stickyPosition: 120
        },
        {
            field: "Tax",
            headerName: "Tax",
            checkbox: true,
            width: "30px",
            sticky: true,
            stickyPosition: 240
        },
        {
            field: "SEASON",
            headerName: "Sea",
            width: "100px",
            sticky: true,
            stickyPosition: 270
        },
        {
            field: "PURPOSE",
            headerName: "Stage",
            width: "100px",
            sticky: true,
            stickyPosition: 370
        },
        {
            field: "CLBH",
            headerName: "Mat No",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "120px"
        },
        {
            field: "YWPM",
            headerName: "YWPM",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "400px"
        },
        {
            field: "Qty",
            headerName: "Purchange QTY",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "100px"
        },
        {
            field: "RKQTY",
            headerName: "Received QTY",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "100px"
        },
        {
            field: "DWBH",
            headerName: "Unit",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "80px"
        },
        {
            field: "Transport",
            headerName: "Transport",
            width: "120px"

        },
        {
            field: "TotalWeight",
            headerName: "Total Weight",
            width: "120px"
        },
        {
            field: "HandCarry_USACC",
            headerName: "HC_USACC",
            width: "140px"
        },
        {
            field: "HandCarry_USPrice",
            headerName: "HC_USPice",
            width: "140px"
        },
        {
            field: "USPriceK",
            headerName: "USPice",
            width: "120px"
        },
        {
            field: "USACCK",
            headerName: "US Amount",
            width: "120px"
        },
        {
            field: "VNPriceK",
            headerName: "VNPrice",
            width: "120px"
        },
        {
            field: "VN_Amount",
            headerName: "VN Amount",
            width: "120px"
        },
        {
            field: "CGDATE",
            headerName: "Purchange QTY",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "100px"
        },
        {
            field: "RKdate",
            headerName: "Received QTY",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "100px"
        },
        {
            field: "YQDate",
            headerName: "Req.Date",
            width: "130px"
        },
        {
            field: "ETD",
            headerName: "ETD",
            width: "100px"
        },
        {
            field: "memo",
            headerName: "memo",
            width: "150px"
        },
        {
            field: "NG_Reason",
            headerName: "Reason",
            width: "100px"
        },
        {
            field: "NG_ETD",
            headerName: "ETD",
            width: "120px"
        },
        {
            field: "NG_ETA",
            headerName: "ETA",
            width: "120px"
        },
        {
            field: "NG_Result",
            headerName: "Result",
            width: "100px"
        },
        {
            field: "NG_Remark",
            headerName: "Remark",
            width: "170px"
        },
        {
            field: "C_window",
            headerName: "Color window",
            width: "170px"
        },
        {
            field: "ETA",
            headerName: "ETA",
            width: "100px"
        },
        {
            field: "ZSBH",
            headerName: "ID",
            width: "70px"
        },
        {
            field: "ZSYWJC",
            headerName: "Name",
            width: "120px"
        },
        {
            field: "COUNTRY",
            headerName: "Supplier Counttry",
            width: "120px"
        },
        {
            field: "Location",
            headerName: "Prod Location",
            width: "100px"
        },
        {
            field: "BILLNO",
            headerName: "BillNo",
            width: "120px"
        },
        {
            field: "invoice",
            headerName: "Invoice",
            width: "120px"
        },
        {
            field: "WAY",
            headerName: "Transport",
            width: "80px"
        },
        {
            field: "Custom",
            headerName: "Custom",
            width: "80px"
        },
        {
            field: "BILLNO_2",
            headerName: "BillNo_2",
            width: "120px"
        },
        {
            field: "invoice_2",
            headerName: "Invoice 2",
            width: "120px"
        },
        {
            field: "WAY_2",
            headerName: "Transport 2",
            width: "80px"
        },
        {
            field: "Custom_2",
            headerName: "Custom 2",
            width: "80px"
        },
        {
            field: "USERDate",
            headerName: "Last Update Date",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "100px"
        },
        {
            field: "USERID",
            headerName: "Place Order User",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "100px"
        },
        {
            field: "All_Article",
            headerName: "All Article",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "300px"
        },
        {
            field: "QC_Check",
            headerName: "QC Check",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "80px"
        },
        {
            field: "QC_Inspection1",
            headerName: "QC Inspection 1",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "100px"
        },
        {
            field: "QC_Inspection2",
            headerName: "QC Inspection 2",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "100px"
        },
        {
            field: "All_Category",
            headerName: "Category",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "250px"
        },
        {
            field: "QC_Check",
            headerName: "Result",
            width: "100px"
        },
        {
            field: "QC_FinishDate",
            headerName: "FinishDate",
            width: "100px"
        },
        {
            field: "Settlement",
            headerName: "Settlement",
            width: "100px"
        },
        {
            field: "DefectName",
            headerName: "Defects Name",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "300px"
        },
        {
            field: "Remark2",
            headerName: "Revise Reason",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "250px"
        },
        {
            field: "Remark3",
            headerName: "Reorder Reason",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "400px"
        },
    ];


    //#endregion

    //#region ColumnBottom1
    const columnBottom1 = [
        {
            field: "ZLBH",
            headerName: "ZLBH",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "PURPOSE",
            headerName: "Stage",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "Size",
            headerName: "Size",
            colSpan: true,
            colSpanNumber: 3,
        },
        {
            field: "FD",
            headerName: "FD",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "Qty",
            headerName: "Qty",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "XIEMING",
            headerName: "XIEMING",
            rowSpan: true,
            rowSpanNumber: 2
        },
        {
            field: "ShipmentDate",
            headerName: "Shipment Date",
            rowSpan: true,
            rowSpanNumber: 2
        },
    ]
    const columnBottom11 = [
        {
            field: "OS",
            headerName: "OS",
        },
        {
            field: "Stockliner",
            headerName: "Stockliner",
        },
        {
            field: "Insole",
            headerName: "Insole",
        }
    ]

    const columnBottom1ShowData = [
        {
            field: "ZLBH",
            headerName: "ZLBH",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "80px"
        },
        {
            field: "Stage",
            headerName: "Stage",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "50px"
        },
        {
            field: "XXCC",
            headerName: "OS",
            width: "40px"
        },
        {
            field: "SizSockliner",
            headerName: "Stockliner",
            width: "70px"
        },
        {
            field: "SizInsole",
            headerName: "Insole",
            width: "40px"
        },
        {
            field: "FD",
            headerName: "FD",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "80px"
        },
        {
            field: "Qty",
            headerName: "Qty",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "80px"
        },
        {
            field: "XIEMING",
            headerName: "XIEMING",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "100px"
        },
        {
            field: "ShipmentDate",
            headerName: "Shipment Date",
            rowSpan: true,
            rowSpanNumber: 2,
            width: "100px"
        },
    ]
    //#endregion

    //#region ColumnBottom2
    const columnBottom2 = [
        {
            field: "RKNO",
            headerName: "Received NO",
            width: "100px"
        },
        {
            field: "RKdate",
            headerName: "Rece. date",
            width: "100px"
        },
        {
            field: "RKSB",
            headerName: "TP",
            width: "50px"
        },
        {
            field: "XXCC",
            headerName: "Size",
            width: "40px"
        },
        {
            field: "SCBH",
            headerName: "Article",
            width: "60px"
        },
        {
            field: "Qty",
            headerName: "Rec. Qty",
            width: "80px"
        },
        {
            field: "USPrice",
            headerName: "USDPrice",
            width: "80px"
        },
        {
            field: "USAmount",
            headerName: "USACC",
            width: "80px"
        },
        {
            field: "VNPrice",
            headerName: "VNPrice",
            width: "80px"
        },
        {
            field: "VNACC",
            headerName: "VNACC",
            width: "80px"
        },
        {
            field: "HandCarry_USPrice",
            headerName: "HC_USPrice",
            width: "100px"
        },
        {
            field: "HandCarry_USACC",
            headerName: "HC_USACC",
            width: "100px"
        },
        {
            field: "USERID",
            headerName: "User ID",
            width: "70px"
        },
        {
            field: "USERDATE",
            headerName: "User Date",
            width: "100px"
        },
    ]
    //#endregion 

    //#region ColumnBottom3
    const columnBottom3 = [
        {
            field: "Invoice",
            headerName: "Invoice",
            width: "120px"
        },
        {
            field: "ETA",
            headerName: "ETA",
            width: "100px"
        },
        {
            field: "Qty",
            headerName: "Qty",
            width: "80px"
        },
        {
            field: "BilNO",
            headerName: "BilNO",
            width: "120px"
        },
        {
            field: "transport",
            headerName: "transport",
            width: "80px"
        },
        {
            field: "Custom",
            headerName: "Custom",
            width: "80px"
        },
        {
            field: "MEMO",
            headerName: "MEMO",
            width: "300px"
        },
        {
            field: "CIDate",
            headerName: "CIDate",
            width: "100px"
        },
        {
            field: "USERDate",
            headerName: "USERDate",
            width: "100px"
        },
        {
            field: "USERID",
            headerName: "USERID",
            width: "80px"
        },
        {
            field: "CINO",
            headerName: "CINO",
            width: "120px"
        },
        {
            field: "Pmark",
            headerName: "Pmark",
            width: "50px"
        },
    ]
    //#endregion

    //#region Variable
    const [disable, setDisable] = useState(false)
    const [purNo, setPurNo] = useState("")
    const [matNo, setMatNo] = useState("")
    const [article, setArticle] = useState("")
    const [season, setSeason] = useState("")
    const [listStage, setListStage] = useState<any[]>([])
    const [stage, setStage] = useState<any>("")
    const [materialName, setMaterialName] = useState("")
    const [color, setColor] = useState("")
    const [dateETA, setDateETA] = useState(
        {
            dateTo: moment(),
            dateFrom: moment()
        }
    );
    const [checkETA, setETD] = useState(false)
    const [dataTop, setDataTop] = useState<any[]>([])
    const [dataTopTotal, setDataTopTotal] = useState<any[]>([
        {
            "CLBH": null,
            "MEMO1": null,
            "REMARK": null,
            "memo": null,
            "ETA": null,
            "BILLNO": null,
            "Kind": null,
            "invoice": null,
            "WAY": null,
            "Transport": null,
            "TotalWeight": null,
            "Qty": null,
            "USERID": null,
            "USERDate": null,
            "CFMDate": null,
            "YQDate": null,
            "NG_Remark": null,
            "SEASON": null,
            "PURPOSE": null,
            "YWPM": null,
            "DWBH": null,
            "ZSBH": null,
            "ZSYWJC": null,
            "CGDATE": null,
            "yjdz": null,
            "COUNTRY": null,
            "RKQTY": "",
            "RKdate": null,
            "CWHL": null,
            "article_all": null,
            "NG_Result": null,
            "QC_SKIN": null,
            "BILLNO_2": null,
            "invoice_2": null,
            "WAY_2": null,
            "SamplePurchaser_Name": null,
            "Custom": null,
            "Custom_2": null,
            "All_Size": null,
            "All_Article": null,
            "All_Category": null,
            "Location": null,
            "File_Name": null,
            "SampleLeadTime": null,
            "ProdLeadTime": null,
            "Forecast_Leadtime": null,
            "Skin_Size": null,
            "NG_Reason": null,
            "NG_ETA": null,
            "C_window": null,
            "QC_Inspection1": null,
            "QC_Inspection2": null,
            "NG_Date": null,
            "CWA": null,
            "ModelName": null,
            "PartName": null,
            "HandCarry_USPrice": null,
            "HandCarry_USACC": null,
            "USPriceK": null,
            "USACCK": null,
            "VNPriceK": null,
            "QC_Check": null,
            "QC_FinishDate": null,
            "Settlement": null,
            "DefectName": null,
            "Remark2": null,
            "Remark3": null,
            "FollowPurchaser_Name": null,
            "Tax": false,
            "CGNO": "0"
        }
    ])
    const [dataBottom1, setDataBottom1] = useState<any[]>([])
    const [dataBottom2, setDataBottom2] = useState<any[]>([])
    const [dataBottom3, setDataBottom3] = useState<any[]>([])
    //#endregion

    //#region handleOnChange
    const handlePurNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPurNo(event.target.value);
    };

    const handleMatNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMatNo(event.target.value);
    };

    const handleArticleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArticle(event.target.value);
    };

    const handleSeasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeason(event.target.value);
    };

    const handleMaterialNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaterialName(event.target.value);
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };

    const handleDateETAChange = (name: string, param: any) => {
        if (name === 'dateFrom') {
            setDateETA((prevState) => ({
                ...prevState,
                dateFrom: param,
            }));
        }
        if (name === 'dateTo') {
            setDateETA((prevState) => ({
                ...prevState,
                dateTo: param,
            }));
        }
    };

    const handleETAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setETD(event.target.checked);
    };

    //#endregion

    //#region Logic

    useEffect(() => {
        handleLoadStage()
    }, [])

    const handleRowClick = (item: any) => {
        Promise.all([handleSearchDetail1(item), handleSearchDetail2(item), handleSearchDetail3(item)])
    }

    const handleSearch = () => {
        if (article !== "" || season !== "" || stage !== "" || purNo !== "" || matNo !== "" || checkETA === true || color !== "" || materialName !== "") {
            setDisable(true)
            setDataTop([])
            setDataTopTotal([])
            const url = connect_string + "api/Trace_List_Sample"
            const data = {
                CGNO: purNo,
                CLBH: matNo,
                Name: materialName,
                color: color,
                Article: article,
                SEASON: season,
                PURPOSE: stage,
                check_date_ETA: checkETA,
                date_from: moment(dateETA.dateFrom).format("YYYY-MM-DD"),
                date_to: moment(dateETA.dateTo).format("YYYY-MM-DD")
            }

            axios.post(url, data).then(res => {
                const arr = res.data.Item1.map((item: any, index: number) => ({
                    ...item,
                    id: index,
                    USPriceK: item.USPriceK ? "$" + item.USPriceK : "",
                    USACCK: item.USACCK ? "$" + item.USACCK : ""
                }))

                console.log(arr)

                const arr1 = {
                    ...res.data.Item2,
                    id: arr?.length + 1 || 0,
                    CGNO: res.data.Item2.Cout

                }
                setDataTop(arr)
                setDataTopTotal([arr1])
                setDataBottom1([])
                setDataBottom2([])
                setDataBottom3([])
            }).finally(() => {
                setDisable(false)
            })
        }
    }

    const handleSearchDetail1 = (item: any) => {
        setDisable(true)
        setDataBottom1([])
        const url = connect_string + "api/Trace_List_Sample_Detail1"
        const data = {
            CGNO: item.CGNO,
            CLBH: item.CLBH,
            SeaSon: item.SEASON,
            Purpose: item.PURPOSE
        }
        axios.post(url, data).then(res => {
            const arr = res.data.map((item: any, index: number) => ({
                ...item,
                id: index
            }))
            setDataBottom1(arr)
        }).finally(() => {
            setDisable(false)
        })
    }

    const handleSearchDetail2 = (item: any) => {
        setDisable(true)
        setDataBottom2([])
        const url = connect_string + "api/Trace_List_Sample_Detail2"
        const data = {
            CGNO: item.CGNO,
            CLBH: item.CLBH,
            SeaSon: item.SEASON,
            Purpose: item.PURPOSE
        }
        axios.post(url, data).then(res => {
            const arr = res.data.map((item: any, index: number) => ({
                ...item,
                id: index
            }))
            setDataBottom2(arr)
        }).finally(() => {
            setDisable(false)
        })
    }

    const handleSearchDetail3 = (item: any) => {
        setDisable(true)
        setDataBottom3([])
        const url = connect_string + "api/Trace_List_Sample_Detail3"
        const data = {
            CGNO: item.CGNO,
            CLBH: item.CLBH,
            SeaSon: item.SEASON,
            Purpose: item.PURPOSE
        }
        axios.post(url, data).then(res => {
            const arr = res.data.map((item: any, index: number) => ({
                ...item,
                id: index
            }))
            setDataBottom3(arr)
        }).finally(() => {
            setDisable(false)
        })
    }

    const handleLoadStage = () => {
        const url = connect_string + "api/Get_Stage"
        axios.post(url).then(res => {
            setListStage(res.data)
        })
    }

    //#endregion


    return (
        <Stack height={"100%"}>
            <Stack paddingX={0.5} height={'20%'} justifyContent={"center"}>
                <Grid container rowSpacing={1} columnSpacing={1}>
                    <Grid item xs={2.5} display={"flex"}>
                        <InputFieldV1
                            xsLabel={4}
                            xsInput={7}
                            label={"Article"}
                            disable={disable}
                            value={article}
                            handle={handleArticleChange}
                        />
                    </Grid>
                    <Grid item xs={2.5} display={"flex"}>
                        <InputFieldV1
                            xsLabel={4}
                            xsInput={7}
                            label={"Season"}
                            disable={disable}
                            value={season}
                            handle={handleSeasonChange}
                        />
                    </Grid>

                    <Grid item xs={2} container alignItems={"center"} display={"flex"}>
                        <Grid item xs={4} display={"flex"}>
                            <Typography className="textsize">Stage</Typography>
                        </Grid>
                        <Grid item xs={8} display={"flex"}>
                            <GenericAutocomplete
                                value={stage}
                                onChange={(newValue: any | "") => {
                                    setStage(newValue?.KFJD);
                                }}
                                getOptionLabel={(option) => (typeof option === 'string' ? option : option?.KFJD || "")}
                                isOptionEqualToValue={(option, value) => {
                                    if (typeof value === 'string') {
                                        return option.KFJD === value; // So sánh chuỗi với chuỗi
                                    }
                                    return option.KFJD === value?.KFJD; // So sánh object với object
                                }}
                                options={Array.isArray(listStage) ? listStage : []}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={2.5} display={"flex"}>
                        <InputFieldV1
                            xsLabel={4}
                            xsInput={7}
                            label={"Pur NO"}
                            disable={disable}
                            value={purNo}
                            handle={handlePurNoChange}
                        />
                    </Grid>
                    <Grid item xs={2.5} display={"flex"}>
                        <InputFieldV1
                            xsLabel={4}
                            xsInput={7}
                            label={"MatNo"}
                            disable={disable}
                            value={matNo}
                            handle={handleMatNoChange}
                        />
                    </Grid>
                    <Grid item xs={0.8} display={"flex"} >
                        <FormControlLabel sx={[styletext]} control={<Checkbox size="small" checked={checkETA} onChange={handleETAChange} />} label="ETA" />
                    </Grid>
                    <Grid item xs={2} display={"flex"} paddingRight={"10px"}>
                        <DatePickerFieldV1
                            xsLabel={0}
                            xsDate={12}
                            valueDate={(param: any) => handleDateETAChange('dateFrom', param)}
                        />
                    </Grid>
                    <Grid item xs={2} display={"flex"} >
                        <DatePickerFieldV1
                            xsLabel={0}
                            xsDate={12}
                            valueDate={(param: any) => handleDateETAChange('dateTo', param)}
                        />
                    </Grid>
                    <Grid item xs={0.2} display={"flex"} ></Grid>
                    <Grid item xs={2} display={"flex"}>
                        <InputFieldV1
                            xsLabel={4}
                            xsInput={8}
                            label={"Color"}
                            disable={disable}
                            value={color}
                            handle={handleColorChange}
                        />
                    </Grid>
                    <Grid item xs={2.5} display={"flex"}>
                        <InputFieldV1
                            xsLabel={4}
                            xsInput={7}
                            label={"Mat Name"}
                            disable={disable}
                            value={materialName}
                            handle={handleMaterialNameChange}
                        />
                    </Grid>



                    <Grid item display={'flex'} alignItems={'center'} xs={1}>
                        {/* Nút làm mới */}
                        <MyButton height='1.7rem' name={"Query"} onClick={handleSearch} disabled={disable} />
                    </Grid>
                </Grid>
            </Stack>
            <Stack sx={{ borderBottom: "2px solid white" }} overflow={"hidden"} height={'40%'} className='table-sample-container' >
                {/* Table Top */}
                <MyTableSampleMergeCell
                    columnsMerge={columnsTop1}
                    columns={columnsTop}
                    columnShow={columnsShowDataTop}
                    data={dataTop}
                    lastRow={true}
                    lastRowData={dataTopTotal}
                    handleRowClick={handleRowClick}
                />
            </Stack>
            <Stack direction={"row"} overflow={"hidden"} height={'40%'}>
                <Stack height={'100%'} width={"30%"} borderRight={"2px solid white"}>
                    {/* Table Bottom 1 */}
                    <MyTableSampleMergeCell
                        columnsMerge={columnBottom1}
                        columns={columnBottom11}
                        columnShow={columnBottom1ShowData}
                        data={dataBottom1}
                    />
                </Stack>
                <Stack height={'100%'} width={"40%"} borderRight={"2px solid white"}>
                    <Stack overflow={"hidden"} height={'100%'} className='table-sample-container' >
                        {/* Table Bottom 2 */}
                        <MyTableNewSample
                            columns={columnBottom2}
                            rows={dataBottom2}
                            checkBox={false}
                        />
                    </Stack>
                </Stack>
                <Stack height={'100%'} width={"30%"} className='table-sample-container' >
                    {/* Table Bottom 3 */}
                    <MyTableNewSample
                        columns={columnBottom3}
                        rows={dataBottom3}
                        checkBox={false}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default PurchaseTraceListSample