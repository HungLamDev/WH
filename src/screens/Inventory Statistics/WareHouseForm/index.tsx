//#region import
import { useTranslation } from "react-i18next";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar"
import { Backdrop, Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Stack, Typography } from "@mui/material";
import '../stylechart.scss'
import { useEffect, useState } from "react";
import axios from "axios";
import { config, connect_string } from "../../../utils/api";
import Chart from "../../../components/Chart";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
//#endregion
const WareHouseF = () => {
    const { t } = useTranslation();
    const { state } = useLocation();
    
    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#region List Rack WareHouse
    const listF = [
        {
            width: '59px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "Q8"
        },
        {
            width: '59px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "Q7"
        },
        {
            width: '59px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "Q6"
        },
        {
            width: '59px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "Q5"
        },
        {
            width: '59px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "Q2"
        },
        {
            width: '59px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "Q1"
        },
        {
            width: '59px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "N4"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "N3"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "N2"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "N1"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "M4"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "M3"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "M2"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "M1"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "K2"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "K1"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "G2"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "G1"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "P1"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "F2"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "F1"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "L1"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "L2"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "L3"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "L4"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "L5"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "L6"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "L7"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "L8"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '95px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '95px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '59px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '95px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        },
        {
            width: '95px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "FP"
        }
    ]
    const listG = [
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "A1"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "A2"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "A3"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "A4"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "A5"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "B1"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "B2"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "B3"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "B4"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "B5"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "B6"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C1"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C2"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C3"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C4"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C5"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C6"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C7"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "D1"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "D2"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "D3"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "D4"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "D5"
        },
        {
            width: '44px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "D6"
        },
        {
            width: '44px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "D7"
        },
        {
            width: '44px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "D8"
        },
        {
            width: '44px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "D9"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "E1"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "E2"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "E3"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "E4"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "E5"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "E6"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "E7"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "E8"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "E9"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "E10"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "E11"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "O1"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "O2"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "O3"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "O4"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C8"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C9"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C10"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C11"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C12"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C13"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C14"
        },
        {
            width: '45px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C15"
        },
        {
            width: '44px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C16"
        },
        {
            width: '44px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C17"
        },
        {
            width: '44px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C18"
        },
        {
            width: '44px',
            height: '100%',
            Sum_Total: "0",
            Rack_Total: "C19"
        },
    ]
    const listR = [
        {
            width: '80px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y0"
        },
        {
            width: '150px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y0"
        },
        {
            width: '150px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y8"
        },
        {
            width: '80px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y9"
        },

        {
            width: '59px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y10"
        },
        {
            width: '150px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y11"
        },
        {
            width: '110px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y12"
        },
        {
            width: '110px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y13"
        },
        {
            width: '110px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y14"
        },
        {
            width: '110px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y15"
        },

        {
            width: '170px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y16"
        },
        {
            width: '80px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y0"
        },
        {
            width: '150px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y1"
        },
        {
            width: '150px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y2"
        },
        {
            width: '150px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y3"
        },
        {
            width: '150px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y4"
        },
        {
            width: '205px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y5"
        },
        {
            width: '205px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y6"
        },
        {
            width: '205px',
            height: '70%',
            Sum_Total: "0",
            Rack_Total: "Y7"
        },

        {
            width: '80px',
            height: '50%',
            Sum_Total: "0",
            Rack_Total: "Y17"
        },
        {
            width: '80px',
            height: '50%',
            Sum_Total: "0",
            Rack_Total: "Y18"
        },
        {
            width: '110px',
            height: '50%',
            Sum_Total: "0",
            Rack_Total: "Y0"
        },
        {
            width: '110px',
            height: '50%',
            Sum_Total: "0",
            Rack_Total: "Y19"
        },
        {
            width: '110px',
            height: '50%',
            Sum_Total: "0",
            Rack_Total: "Y20"
        },
        {
            width: '110px',
            height: '50%',
            Sum_Total: "0",
            Rack_Total: "Y21"
        },
        {
            width: '150px',
            height: '50%',
            Sum_Total: "0",
            Rack_Total: "Y22"
        },

    ]
    const listA = [
        {
            width: '60px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D77"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D78"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D79"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D80"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D81"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D82"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D83"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D84"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D85"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D86"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D87"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D88"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D89"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D90"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D91"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D92"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D93"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D94"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D95"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D96"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D97"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D98"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D99"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D100"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D101"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D102"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D103"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D104"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D105"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D106"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D107"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D108"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D109"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D110"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D111"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D112"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D113"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D114"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D115"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D116"
        },
        {
            width: '59px',
            height: '90%',
            Sum_Total: "0",
            Rack_Total: "D117"
        },
    ]
    //#endregion

    //#region Variable
    const factory = dataUser[0].factoryName
    const [listRack, setListRack] = useState<any[]>([])
    const [countFetch, setCountFetch] = useState(0)
    const [listRack1, setListRack1] = useState<any[]>(factory === 'LHG' ? [...listF] : factory === 'LVL' ? [...listA] : [])
    const [warehouse, setWareHouse] = useState(dataUser[0].building)
    const [apiRequestComplete, setApiRequestComplete] = useState(false);
    //#endregion

    //#region useEffect
    useEffect(() => {

        if (apiRequestComplete) {
            setApiRequestComplete(false)
            const interval = setInterval(updateData, 10000);
            return () => clearInterval(interval);
        }

    }, [countFetch]);

    useEffect(() => {
        updateData();
    }, [warehouse]);

    useEffect(() => {
        if (state !== null) {
            setWareHouse(state)
        }
    }, [state]);
    //#endregion

    //#region Func Logic
  
    const url = connect_string + "api/show_chart"

    const updateData = () => {
        const data = {
            rack: warehouse
        }
        axios.post(url, data, config).then(response => {
            setListRack(response.data);
            if (warehouse === 'F') {
                listF.forEach(item1 => {
                    const matchingItem = response.data.find((item2: any) => item1.Rack_Total === item2.Rack_Total && item1.Sum_Total !== item2.Sum_Total);
                    if (matchingItem) {
                        if (matchingItem.Sum_Total as number > 100) {
                            item1.Sum_Total = "100";
                        }
                        else {
                            item1.Sum_Total = matchingItem.Sum_Total;
                        }
                    }
                });
                setListRack1(listF)
                setApiRequestComplete(true);
            }
            else if (warehouse === 'R1') {
                listR.forEach(item1 => {
                    const matchingItem = response.data.find((item2: any) => item1.Rack_Total === item2.Rack_Total && item1.Sum_Total !== item2.Sum_Total);
                    if (matchingItem) {
                        if (matchingItem.Sum_Total as number > 100) {
                            item1.Sum_Total = "100";
                        }
                        else {
                            item1.Sum_Total = matchingItem.Sum_Total;
                        }
                    }
                });
                setApiRequestComplete(true);
                setListRack1(listR)
            }
            else if (warehouse === 'G') {
                listG.forEach(item1 => {
                    const matchingItem = response.data.find((item2: any) => item1.Rack_Total === item2.Rack_Total && item1.Sum_Total !== item2.Sum_Total);
                    if (matchingItem) {
                        if (matchingItem.Sum_Total as number > 100) {
                            item1.Sum_Total = "100";
                        }
                        else {
                            item1.Sum_Total = matchingItem.Sum_Total;
                        }
                    }
                });
                setApiRequestComplete(true);
                setListRack1(listG)
            }
            else if (warehouse === 'A') {
                listA.forEach(item1 => {
                    const matchingItem = response.data.find((item2: any) => item1.Rack_Total === item2.Rack_Total && item1.Sum_Total !== item2.Sum_Total);
                    if (matchingItem) {
                        if (matchingItem.Sum_Total as number > 100) {
                            item1.Sum_Total = "100";
                        }
                        else {
                            item1.Sum_Total = matchingItem.Sum_Total;
                        }
                    }
                });
                setApiRequestComplete(true);
                setListRack1(listA)
            }
            setCountFetch(item => item + 1)
        })
    };

    const handleClick = (name: string) => {
        setWareHouse(name)
        if (name === 'F') {
            setListRack1(listF)
        }
        else if (name == 'G') {
            setListRack1(listG)
        }
        else if (name == 'R1') {
            setListRack1(listR)
        }
        else if (name == 'A') {
            setListRack1(listA)
        }
    }
    //#endregion

    return (
        <FullScreenContainerWithNavBar navigate="/" sideBarDisable={true} sideBarNavigate="" title={t("lblTracking_Board")}>
            <Box
                paddingX={4}
                paddingBottom={1}
                className={"dark-bg-secondary border-bottom-white"}
                display={'flex'}
            >
                <Stack direction={'row'} width={'50%'}>
                    {
                        dataUser[0].building === 'G' || dataUser[0].building === 'R1' || dataUser[0].building === 'F' ?
                            (
                                <>  <Button className={`warehouse-button ${warehouse === 'G' ? 'active' : ''}`} onClick={() => handleClick('G')}>G</Button>
                                    <Button className={`warehouse-button ${warehouse === 'R1' ? 'active' : ''}`} onClick={() => handleClick('R1')}>R</Button>
                                    <Button className={`warehouse-button ${warehouse === 'F' ? 'active' : ''}`} onClick={() => handleClick('F')}>F</Button>
                                </>
                            )
                            :
                            (
                                <>
                                    <Button className={`warehouse-button ${warehouse === 'A' ? 'active' : ''}`} onClick={() => handleClick('A')}>A</Button>
                                </>
                            )
                    }
                </Stack>
                <Stack width={'50%'} justifyContent={'center'} alignItems={'flex-end'}>
                    <Typography variant="caption" style={{ fontStyle: "italic" }}>{t("dcmUnit") + ": (%)"}</Typography>
                </Stack>
            </Box>
            <Stack height={'100%'}>
                <Stack height={'50%'} >
                    <div className="bar-chart">
                        {
                            listRack1.map((item: any, index: number) => {
                                return (
                                    <Chart listRack={item} wareHouse={warehouse} />
                                )
                            })
                        }
                    </div>
                </Stack>

            </Stack>
        </FullScreenContainerWithNavBar>
    )
}
export default WareHouseF