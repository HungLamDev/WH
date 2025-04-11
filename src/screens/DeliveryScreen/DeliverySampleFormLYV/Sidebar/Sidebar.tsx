import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useDebounced from "../../../../components/CustomHook/useDebounce";
import { connect_string } from "../../../LoginScreen/ChooseFactory";
import axios from "axios";
import { fromPOgetTestNoVersion_WH } from "../Func/func"; 
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Box, Grid, Stack } from "@mui/material";
import GenericAutocomplete from "../../../../components/GenericAutocomplete";
import InputFieldV1 from "../../../../components/InputField/index_new";
import MyButton from "../../../../components/MyButton";
import CreateMergeBom from "../CreateMergeBOMForm";
import MyTableNew from "../../../../components/MyTableNew";
import ModalPrintSample from "../../../../components/ModalPrintSample/ModalPrintSample";

interface SidebarProps {
    column: any,
    columnOutSource: any,
    PO_NOAndTestNo: any,
    JGNO: any
    listMaterialBOM: any,
    listMaterialStockOut: any,
    listMaterialStockOut_Outsource: any,
    Article: any,
    KFJD: any,
    JiJie: any,
    MergeNo: any,
    TestNo: any,
    isOpenSidebar: any,
    get_qty_out_Sample: any,
    handleFocusInput: any,
    JGNO_Check: any,
    listCheckMaterialStockout: any,
    checkVersion: any
}

export interface  SidebarRef {
    refreshData: () => Promise<void>;
    refreshMaterial_Stock_Out_Sample: () => Promise<void>;
    refreshMaterial_Stock_Out_Sample_Outsource: () => Promise<void>;
    refreshLoadDataJGNO: () => Promise<any[]>;
    setPoNoValue: (value: any) => void
    refreshGetDataWatingOutSource: (value: any, arrJGNO: any) => Promise<void>
}

//#region Tạo BOM
const Sidebar = forwardRef<SidebarRef, SidebarProps>((props, ref) => {
    const {
        column,
        columnOutSource,
        PO_NOAndTestNo,
        JGNO,
        JGNO_Check,
        listMaterialBOM,
        listMaterialStockOut,
        listMaterialStockOut_Outsource,
        Article,
        KFJD,
        JiJie,
        MergeNo,
        TestNo,
        isOpenSidebar,
        get_qty_out_Sample,
        handleFocusInput,
        listCheckMaterialStockout = [],
        checkVersion
    } = props
    const { t } = useTranslation();

    //#region Variable
    const [isOpen, setIsOpen] = useState(true);
    const [openCreateBOM, setOpenCreateBOM] = useState(false);
    const [valueAutocomplete, setValueAutocomplete] = useState<any>(null);
    const [listSampleOrder, setListSampleOrder] = useState<any[]>([])
    const [listDataWaiting, setListDataWaiting] = useState<any[]>([])
    const [PoNo, setPoNo] = useState("")
    const [listDataWaitingOutsource, setListDataWaitingOutsource] = useState<any[]>([])
    const [PoOutsource, setPoOutsource] = useState<any>(null)
    const [mergeNo, setMergeNo] = useState<any>("")
    const [disable, setDisable] = useState(false)
    const [infoPO, setInfoPO] = useState<any>({})
    const [onFocus, setOnFocus] = useState(false)
    const [openModalPrintSample, setOpenModalPrintSample] = useState(false)
    const [testNoPoNo, setTestNoPoNo] = useState<any>({})
    const [listMaterialStockOutSample, setListMaterialStockOutSample] = useState<any[]>([])

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

    //#endregion

    //#region ref
    useImperativeHandle(ref, () => ({
        refreshData,
        refreshMaterial_Stock_Out_Sample,
        refreshMaterial_Stock_Out_Sample_Outsource,
        refreshGetDataWatingOutSource,
        refreshLoadDataJGNO,
        setPoNoValue
    }));

    const refreshData = async () => {
        await getDataWaiting(valueAutocomplete);
    };

    const refreshMaterial_Stock_Out_Sample = async () => {
        await get_Material_Stock_Out_Sample(valueAutocomplete)
    };

    const refreshMaterial_Stock_Out_Sample_Outsource = async () => {
        await get_Material_Stock_Out_Sample_Outsource(PoOutsource)
    };

    const refreshGetDataWatingOutSource = async (value: any, arrJGNO: any) => {
        await getDataWatingOutSource(value, arrJGNO)
    };


    const refreshLoadDataJGNO = async () => {
        return await loadDataJGNO(mergeNo)
    };


    const setPoNoValue = (value: any) => {
        setPoNo(value)
    }

    //#endregion


    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    const handlePoNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPoNo(event.target.value);
    };

    //#region useDebounced
    const debouncedSearchTerm = useDebounced(PoNo, 300);

    useEffect(() => {
        if (
            debouncedSearchTerm !== ""
        ) {
            getAllPoNo(debouncedSearchTerm);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);

    // check vật tư có thay đổi hay không 
    useEffect(() => {
        (async () => {

            if (testNoPoNo?.PONO) {
                const checkResult = await checkVersionChange(testNoPoNo?.PONO)
                checkVersion(checkResult)
            }

            if (listMaterialStockOutSample.length > 0) {

                const list_data = await getDataWaitingApi(testNoPoNo, "all", "all")

                const listDataWaitingFilter = list_data.map((item: any) => ({
                    Material_NO_Bom: item?.MatNo,
                    QTY_Bom: item?.CLSLMin
                }))

                const listMaterialStockOutSampleFilter = listMaterialStockOutSample.map((item: any) => ({
                    Material_NO_WH: item?.Material_No,
                    QTY_WH: item?.QTY_Bom
                }))

                const url = connect_string + "api/check_Version_Change";
                const data = {
                    list_Bom: listDataWaitingFilter,
                    list_WH: listMaterialStockOutSampleFilter,
                    pono: testNoPoNo?.PONO
                }

                try {
                    const res = await axios.post(url, data);
                    let dataApi = []

                    if (res.data.Item2 === true) {
                        dataApi = await get_Material_Stock_Out_Sample_Api(testNoPoNo)
                        const result = dataApi.map((item: any) => ({
                            ...item,
                            checkMaterial: res.data.Item1.includes(item?.Material_No)
                        }))

                        listMaterialStockOut(result)
                    }
                    if (res.data.Item1.length > 0 && res.data.Item2 === false) {

                        const result = listMaterialStockOutSample.map((item: any) => ({
                            ...item,
                            checkMaterial: res.data.Item1.includes(item?.Material_No)
                        }))
                        listMaterialStockOut(result)
                    }

                } catch (error) {
                    console.error("Error fetching data from check_Version_Change:", error);
                }
                // }
            }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listMaterialStockOutSample]);

    //#endregion


    //#region Func Logic

    // lấy danh sách vật tư liệu đơn của BOM 
    const getDataWaiting = async (value: any) => {
        if (value !== "") {
            setListDataWaiting([]);
            await getInfoPO(value);

            if (value?.PONO !== "" && value?.PONO) {
                const url = connect_string + "api/get_Merge_Bom_ERP";
                const data = {
                    Po_No: value?.PONO || "",
                    check_de: valueChooseWarehouse.value,
                    check_Gia_Cong_Lieu_Don: valueChooseMaterial.value
                };

                try {
                    const res = await axios.post(url, data);

                    const arr = res.data.map((item: any, index: any) => ({
                        _id: index,
                        ...item,
                    }));

                    arr.sort((a: any, b: any) => {
                        const statusComparison = b.Status.localeCompare(a.Status);
                        if (statusComparison !== 0) return statusComparison;

                        return b.MJBH.localeCompare(a.MJBH);
                    });

                    setListDataWaiting(arr);
                    listMaterialBOM(arr);
                    return arr;
                    // Nếu cần, bạn có thể mở lại phần xử lý khác (như listMaterialStockOut):
                    // const arr1 = res.data.Item2.map((item: any, index: any) => ({
                    //   ...item,
                    //   _id: index,
                    //   Modify_Date: item.Modify_Date,
                    // }));
                    // listMaterialStockOut(arr1);

                } catch (error) {
                    console.error("Error fetching data from get_Merge_Bom_ERP:", error);
                }
            }
        }
    };


    const getDataWaitingApi = async (value: any, check_de: any, check_Gia_Cong_Lieu_Don: any) => {
        if (value !== "") {

            const url = connect_string + "api/get_Merge_Bom_ERP";
            const data = {
                Po_No: value?.PONO,
                check_de: check_de,
                check_Gia_Cong_Lieu_Don: check_Gia_Cong_Lieu_Don
            };

            try {
                const res = await axios.post(url, data);

                const arr = res.data.map((item: any, index: any) => ({
                    _id: index,
                    ...item,
                }));

                arr.sort((a: any, b: any) => {
                    const statusComparison = b.Status.localeCompare(a.Status);
                    if (statusComparison !== 0) return statusComparison;

                    return b.MJBH.localeCompare(a.MJBH);
                });

                return arr;

            } catch (error) {
                console.error("Error fetching data from get_Merge_Bom_ERP:", error);
            }
        }
    };

    // lấy danh sách xuất tem
    const get_Material_Stock_Out_Sample = async (value: any) => {
        setListMaterialStockOutSample([])
        const url = connect_string + "api/get_Material_Stock_Out_Sample";
        const data = {
            TestNo: value?.TestNo,
            Po_No: value?.PONO,
        };

        try {
            const res = await axios.post(url, data);

            const arr = res.data.map((item: any, index: any) => ({
                _id: index + 1,
                ...item,
            }));
            console.log("Material_Stock_Out_Sample", arr)
            setListMaterialStockOutSample(arr)
            listMaterialStockOut(arr)
        } catch (error) {
            console.error("Error fetching Material Stock Out Sample:", error);
        }
    };

    const get_Material_Stock_Out_Sample_Api = async (value: any) => {
        const url = connect_string + "api/get_Material_Stock_Out_Sample";
        const data = {
            TestNo: value?.TestNo,
            Po_No: value?.PONO,
        };

        try {
            const res = await axios.post(url, data);

            const arr = res.data.map((item: any, index: any) => ({
                _id: index + 1,
                ...item,
            }));

            return arr

        } catch (error) {
            console.error("Error fetching Material Stock Out Sample:", error);
        }
    };

    // lấy thông tin test no
    const getInfoPO = async (value: any) => {
        const infoPO = await fromPOgetTestNoVersion_WH(value?.PONO)
        setTestNoPoNo(infoPO)
        PO_NOAndTestNo({ PONO: infoPO?.PONO?.trim(), TestNo: infoPO?.TestNo?.trim() });


        setInfoPO("");
        Article("");
        KFJD("");
        MergeNo("");
        TestNo("");
        setMergeNo("")

        const url = connect_string + "api/get_info_pono";
        const data = {
            TestNo: value?.TestNo || "",
            Po_No: value?.PONO || "",
        };


        try {

            const res = await axios.post(url, data);
            setInfoPO(res.data);
            Article(res?.data?.ARTICLE || "");
            KFJD(res?.data?.KFJD || "");
            JiJie(res?.data?.JiJie || "")
            MergeNo(res?.data?.YPZLBH || "");
            setMergeNo(res?.data?.YPZLBH || "")
            TestNo(res?.data?.Version || "");
            await loadDataJGNO(res?.data?.YPZLBH || "")
        } catch (error) {
            console.error("Error fetching PO info:", error);
        }
    };

    // lấy version mới nhất
    const handleGetNewVersion = async (value: any) => {
        const url = connect_string + "api/insert_PONO_version_new"
        const data = {
            PONO: value?.PONO,
            user_id: dataUser[0].UserId
        }

        try {
            const res = await axios.post(url, data)
        } catch (error) {
            console.error("Error fetching PO info:", error);
        }
    }

    // tìm kiếm lại 
    const handleSearch = async () => {
        if (PoOutsource === null) {
            await getDataWaitingAndgetInfoPO(valueAutocomplete)
        }
        else {
            await getDataWaitingAndgetInfoPOOutSource(PoOutsource)
            await get_Material_Stock_Out_Sample_Outsource(PoOutsource)
            await loadDataJGNO(mergeNo)
        }
    }

    // lấy danh sách vật tư liệu đơn của BOM, danh sách tem xuất, thông tin test no
    const getDataWaitingAndgetInfoPO = async (value: any) => {
        setDisable(true)

        await handleGetNewVersion(value)
        Promise.all([await getDataWaiting(value), await get_Material_Stock_Out_Sample(value)]).finally(() => {
            setDisable(false)
        })
    };

    // lấy danh sách vật tư gia công của BOM, danh sách vật tư gia công đã xuất
    const getDataWaitingAndgetInfoPOOutSource = async (value: any) => {
        setDisable(true)
        Promise.all([await getDataWatingOutSource(value, listDataWaitingOutsource)]).finally(() => {
            setDisable(false)
        })

    };

    // lấy toàn bộ test no của merge no
    const getAllPoNo = async (value: any) => {
        setDisable(true)
        setValueAutocomplete("")
        setPoOutsource(null)
        JGNO(null)
        // lấy version mới nhất
        const infoPO = await fromPOgetTestNoVersion_WH(value)
        setTestNoPoNo(infoPO)
        setOnFocus(false)
        const url = connect_string + "api/get_Merge_Bom_To_PONO";
        const data = {
            TestNo: infoPO?.TestNo?.trim(),
            Po_No: infoPO?.PONO?.trim(),
            User_WH: dataUser[0].UserId,
        };

        try {
            const res = await axios.post(url, data);


            setListSampleOrder(res.data || []);

            const filterListPo = res?.data.filter((item: any) => item.PONO === infoPO?.PONO?.trim());

            const newValue = {
                PONO: filterListPo[0]?.PONO?.trim(),
                TestNo: infoPO?.TestNo?.trim(),
            };

            PO_NOAndTestNo(newValue);

            setValueAutocomplete(newValue || "");

            await getDataWaitingAndgetInfoPO(newValue);

            setPoNo('');

        } catch (error) {
            console.error("Error fetching PO data:", error);
        } finally {
            setOnFocus(true);
            setDisable(false)
        }
    };

    // load danh sách đơn gia công của merge no
    const loadDataJGNO = async (value: any) => {
        let arrJGNO = []
        if (value !== "") {
            setListDataWaitingOutsource([])
            // setPoOutsource(null)
            const url = connect_string + "api/get_JGNO_to_YPZLBH"
            const data = {
                YPZLBH: value
            }
            try {
                const res = await axios.post(url, data)
                setListDataWaitingOutsource(res.data)
                arrJGNO = res.data || []
            } catch (error) {
             error
            }
        }
        return arrJGNO
    }

    // lấy danh sách vật tư gia công của đơn
    const getDataWatingOutSource = async (value: any, arrJGNO: any) => {
        setListDataWaiting([]);
        listMaterialBOM([]);
        if (value === null) {
            await getDataWaiting(valueAutocomplete);
        } else if (value !== null && value !== "") {
            const url = connect_string + "api/get_Merge_Bom_ERP_OutSource";
            const data = {
                JGNO: value,
            };

            try {
                const res = await axios.post(url, data);

                const checkOutsourceComplete: any = arrJGNO.filter((item: any) => item.JGNO === value)

                let arr = []

                if (checkOutsourceComplete[0]?.check === true) {
                    arr = res.data.map((item: any, index: any) => ({
                        _id: index,
                        ...item,
                        Status: "done",
                    }));
                }
                else {
                    arr = res.data.map((item: any, index: any) => ({
                        _id: index,
                        ...item,
                        Status: ""
                    }));
                    console.log("danh sách vật tư gia công của đơn", arr)
                }
                setListDataWaiting(arr);
                listMaterialBOM(arr);
            } catch (error) {
                console.error("Error fetching data from get_Merge_Bom_ERP_OutSource:", error);
            }
        }
    };

    // lấy danh sách vật tư gia công đã xuất của đơn
    const get_Material_Stock_Out_Sample_Outsource = async (value: any) => {

        if (value !== null) {
            listMaterialStockOut_Outsource([])
            const url = connect_string + "api/get_list_Material_To_JGNO"
            const data = {
                JGNO: value
            }

            try {
                const res = await axios.post(url, data)

                const arr = res.data.map((item: any, index: any) => ({
                    _id: index + 1,
                    ...item
                }))

                listMaterialStockOut_Outsource(arr)
                console.log(" listMaterialStockOut_Outsource", arr)
            } catch (error) {
                console.error(error)
            }
        }


    }

    // Hàm để chuyển đổi trạng thái sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        isOpenSidebar(!isOpen)
    };

    // làm mới
    const handleClean = () => {
        setListDataWaiting([])
        listMaterialBOM([])
        listMaterialStockOut([])
        setListDataWaitingOutsource([])
        setListSampleOrder([])
        setValueAutocomplete("")
        setPoOutsource(null)
        setInfoPO("");
        Article("");
        KFJD("");
        MergeNo("");
        TestNo("");
        JGNO(null)
        get_qty_out_Sample()
    }

    //#endregion

    //Tô màu dòng trong bảng------------------------------------------
    const paintingRow = (item: any, row: any) => {
        if (typeof item !== "string") {
            return item;
        }

        if (row.Status === "done") {
            return "grey"
        }

        return "white"
    };
    //----------------------------------------------------------------

    const handleRowClick = (MatNo: any) => {
        if (PoOutsource === null) {
            get_qty_out_Sample(testNoPoNo, MatNo)
        }
    }

    // Kiểm tra điều kiện xem phải gia công về ko
    const handleCheckBox = (item: any) => {
        if (PoOutsource !== null || item.Status === "done") {
            return false
        }
        return true
    }
    //api check có version thay đổi hay không
    const checkVersionChange = async (value: any) => {
        const url = connect_string + "api/check_status_Create";
        const data = {
            PONO: value
        }
        console.log("version" , data)
        try {
            const response = await axios.post(url, data);
            return response.data;
        }
        catch (error) {
            console.error("Error during check version change:", error);
        }
    }


    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isOpen ? <SkipPreviousIcon color='action' /> : <SkipNextIcon color='action' />}
            </button>
            {
                !isOpen &&
                (
                    <div style={{
                        position: 'absolute',
                        top: 'calc(80dvh/2)',
                        left: '3px'
                    }}>
                        <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>MERGE BOM</span>
                    </div>
                )
            }

            <div className="content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box
                    className={"dark-bg-secondary border-bottom-white"}
                    style={{ minHeight: 'calc(80dvh/ 2.9)', flexShrink: 0 }}
                >
                    <Stack direction={'row'} height={'100%'} alignItems={'flex-end'}>
                        <Stack width={'100%'} padding={0.5}>
                            <Grid container columnSpacing={1} rowSpacing={0.5} justifyContent={'center'}>

                                <Grid item xs={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    {/* Article */}
                                    <span className='textsize' style={{ color: 'yellow', overflow: "hidden", textOverflow: "ellipsis" }}> {infoPO?.ARTICLE ? "Article: " + infoPO.ARTICLE : ""}</span>
                                </Grid>
                                <Grid item xs={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    {/* Stage */}
                                    <span className='textsize' style={{ color: 'yellow', overflow: "hidden", textOverflow: "ellipsis" }}> {infoPO?.KFJD ? "Stage: " + infoPO.KFJD : ""}</span>
                                </Grid>
                                <Grid item xs={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    {/* Pairs */}
                                    <span className='textsize' style={{ color: 'yellow', overflow: "hidden", textOverflow: "ellipsis" }}> {infoPO?.PAIRS ? "Pairs: " + infoPO.PAIRS : ""}</span>
                                </Grid>

                                <Grid item xs={6} display={'flex'}>
                                    {/* Quét PO */}
                                    <InputFieldV1
                                        xsLabel={4}
                                        xsInput={8}
                                        label={t("gpbScan") as string}
                                        disable={disable}
                                        value={PoNo}
                                        onFocus={onFocus}
                                        handle={handlePoNoChange}
                                        id='scan-po'
                                        handleOnFocus={() => handleFocusInput('scan-po')}
                                    />
                                </Grid>

                                <Grid container item xs={6} display={'flex'} alignItems={'center'}>
                                    {/* List PO */}
                                    <Grid item display={'flex'} xs={3}>
                                        <span className='textsize'>PO NO</span>
                                    </Grid>
                                    <Grid item display={'flex'} xs={9}>
                                        <GenericAutocomplete
                                            options={Array.isArray(listSampleOrder) ? listSampleOrder : []}
                                            value={valueAutocomplete || ""}
                                            onChange={(newValue: any | null) => {
                                                if (newValue !== null) {
                                                    setValueAutocomplete(newValue);
                                                    getDataWaitingAndgetInfoPO(newValue)
                                                }
                                            }}

                                            getOptionLabel={(option) =>
                                                typeof option === "string" ? option : option.PONO || ""
                                            }
                                            isOptionEqualToValue={(option, value) => {
                                                if (typeof value === 'string') {
                                                    return option.TestNo === value;
                                                }
                                                return option.TestNo === value?.TestNo;
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item display={'flex'} alignItems={'center'} xs={3}>
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
                                <Grid item display={'flex'} alignItems={'center'} xs={3}>
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
                                {/* Đơn gia công */}
                                <Grid container item xs={6} display={'flex'} alignItems={'center'}>
                                    <Grid item display={'flex'} xs={3}>
                                        <span className='textsize'>JGNO</span>
                                    </Grid>
                                    <Grid item display={'flex'} xs={9}>
                                        <GenericAutocomplete
                                            options={listDataWaitingOutsource || []}
                                            value={PoOutsource}
                                            onChange={(newValue: any | null) => {
                                                setPoOutsource(newValue?.JGNO || null);
                                                JGNO(newValue?.JGNO || null)
                                                JGNO_Check(newValue || null)
                                                getDataWaitingAndgetInfoPOOutSource(newValue?.JGNO || null)
                                                get_Material_Stock_Out_Sample_Outsource(newValue?.JGNO || null)
                                            }}

                                            getOptionLabel={(option) =>
                                                typeof option === "string" ? option : option.JGNO
                                            }
                                            isOptionEqualToValue={(option, value) => {
                                                if (typeof value === 'string') {
                                                    return option.JGNO === value;
                                                }
                                                return option.JGNO === value?.JGNO;
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container item xs={12} justifyContent={'center'} gap={"20px"}>

                                    <Grid item display={'flex'} alignItems={'center'} xs={2} >
                                        {/* Nút tìm kiếm */}
                                        <MyButton height='2rem' name={t('btnSearch')} onClick={handleSearch} disabled={disable} />
                                    </Grid>
                                    <Grid item display={'flex'} alignItems={'center'} xs={2}>
                                        {/* Nút làm mới */}
                                        <MyButton height='2rem' name={t('btnClean')} onClick={handleClean} disabled={disable} />
                                    </Grid>
                                    <Grid item display={'flex'} alignItems={'center'} xs={2} >
                                        {/* Nút tạo BOM */}
                                        <MyButton height='2rem' name={t('btnCreateBOM')} onClick={() => setOpenCreateBOM(true)} disabled={disable} />
                                        {openCreateBOM && <CreateMergeBom open={openCreateBOM} onClose={() => setOpenCreateBOM(false)} />}
                                    </Grid>
                                    <Grid item display={'flex'} xs={2}>
                                        {/* Nút In mẫu */}
                                        <MyButton height='2rem' name={t('btnPrint_sample')} onClick={() => setOpenModalPrintSample(true)} disabled={disable} />
                                        {openModalPrintSample && <ModalPrintSample open={openModalPrintSample} handleClose={() => setOpenModalPrintSample(false)} data={PoOutsource || ""} />}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </Box>
                <Stack
                    overflow={"hidden"}
                    sx={{ height: '100%', width: '100%', backgroundColor: '#1c2538' }}
                >
                    {/* Bảng */}
                    <MyTableNew
                        columns={PoOutsource === null ? column : columnOutSource}
                        rows={listDataWaiting}
                        paintingRow={paintingRow}
                        checkBox={true}
                        handlerowClick={(params: any, item: any) => handleRowClick(item?.MatNo || "")}
                        selectedFirstRow={true}
                        handleCheckBox={(item: any) => handleCheckBox(item)}
                        listChx={(row) => listCheckMaterialStockout(row)}
                    />
                </Stack>
            </div>
        </div >
    );
});
//#endregion

export default Sidebar
