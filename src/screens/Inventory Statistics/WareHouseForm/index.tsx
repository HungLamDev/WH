//#region import
import { useTranslation } from "react-i18next";
import FullScreenContainerWithNavBar from "../../../components/FullScreenContainerWithNavBar"
import { Backdrop, Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import '../stylechart.scss'
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../../utils/api";
import { connect_string } from "../../LoginScreen/ChooseFactory";
import Chart from "../../../components/Chart";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ChartLVL from "../../../components/ChartLVL";
import { ListB5_F1, ListB5_F2 } from "../../../utils/listRackLVL";
import { listF, listG, listR } from "../../../utils/listRackLHG";
//#endregion
const WareHouseF = () => {
    const { t } = useTranslation();
    const { state } = useLocation();

    //#region useSelector
    const dataUser = useSelector((state: any) => state.UserLogin.user);
    //#endregion

    //#endregion

    //#region Variable
    const factory = dataUser[0].factoryName
    const [listRack, setListRack] = useState<any[]>([])
    const [countFetch, setCountFetch] = useState(0)
    // Mặc định kho
    const [listRack1, setListRack1] = useState<any[]>(factory === 'LHG' ? [...listF] : factory === 'LVL' ? [...ListB5_F1] : [])
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
            else if (warehouse === 'B5L2') {
                ListB5_F2.forEach(item1 => {
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
                setListRack1(ListB5_F2)
            }
            else if (warehouse === 'B5L1') {
                ListB5_F1.forEach(item1 => {
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
                setListRack1(ListB5_F1)
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
        else if (name == 'B5L1') {
            setListRack1(ListB5_F1)
        }
        else if (name == 'B5L2') {
            setListRack1(ListB5_F2)
        }
    }
    //#endregion

    // ok
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
                        // này của LHG
                        dataUser[0].building === 'G' || dataUser[0].building === 'R1' || dataUser[0].building === 'F' ?
                            (
                                <>  <Button className={`warehouse-button ${warehouse === 'G' ? 'active' : ''}`} onClick={() => handleClick('G')}>G</Button>
                                    <Button className={`warehouse-button ${warehouse === 'R1' ? 'active' : ''}`} onClick={() => handleClick('R1')}>R</Button>
                                    <Button className={`warehouse-button ${warehouse === 'F' ? 'active' : ''}`} onClick={() => handleClick('F')}>F</Button>
                                </>
                            )
                            // này của LVL
                            :
                            (
                                <>
                                    <Button className={`warehouse-button ${warehouse === 'B5L1' ? 'active' : ''}`} onClick={() => handleClick('B5L1')}>B5L1</Button>
                                    <Button className={`warehouse-button ${warehouse === 'B5L2' ? 'active' : ''}`} onClick={() => handleClick('B5L2')}>B5L2</Button>

                                </>
                            )
                    }
                </Stack>
                <Stack width={'50%'} justifyContent={'center'} alignItems={'flex-end'}>
                    <Typography variant="caption" style={{ fontStyle: "italic" }}>{t("dcmUnit") + ": (%)"}</Typography>
                </Stack>
            </Box>
            {
                // này của LHG
                (dataUser[0].building === 'G' || dataUser[0].building === 'R1' || dataUser[0].building === 'F') ?
                    (
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
                    )
                    // này của LVL
                    :
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        overflowX: 'hidden',
                        marginTop: '15px'
                    }}>
                        <Grid container >
                            {/* Này là bên trái  */}
                            <Grid item xs={2} >
                                {
                                    warehouse === 'B5L2'
                                        ?
                                        (
                                            <Grid container direction={'column'} height={'100%'} >
                                                <Grid item xs={1.5}  >
                                                    <Box sx={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid yellow' }}>
                                                        <span>Khu Phoi Hang</span>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={2}></Grid>
                                                <Grid item xs={7}>
                                                    <Grid container direction={'column'} height={'100%'} >
                                                        <Grid item >
                                                            <Box sx={{ marginBottom: '5px', height: '110px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid red' }}>
                                                                <span>Y001</span>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item >
                                                            <Box sx={{ marginBottom: '5px', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid yellow' }}>
                                                                <span>Khu Chat Trang Tri</span>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item >
                                                            <Box sx={{ marginBottom: '5px', height: '130px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                                                                <span>Water Room</span>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item >
                                                            <Box sx={{ marginBottom: '0px', height: '130px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                                                                <span>WC</span>
                                                            </Box>
                                                        </Grid>

                                                    </Grid>

                                                </Grid>
                                                <Grid item xs={1.5} >
                                                    <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                                                        <span>Khu Phat Hang</span>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        )
                                        :
                                        warehouse === 'B5L1' &&
                                        (
                                            <Grid container direction={'column'} height={'100%'} >
                                                <Grid item xs={4} height={'100%'}>
                                                    <Grid container height={'100%'} direction={'column'} rowSpacing={1}>
                                                        <Grid item xs={2}></Grid>
                                                        <Grid item xs={2}></Grid>
                                                        <Grid item xs={2}></Grid>
                                                        <Grid item xs={2}></Grid>
                                                        <Grid item xs={4}>
                                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid yellow' }}>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={1} height={'100%'}></Grid>
                                                <Grid item xs={5} height={'100%'} >
                                                    <Grid container height={'100%'} direction={'column'} rowSpacing={1}>
                                                        <Grid item xs={3}>
                                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                                                                <span>Meeting Room</span>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                                                                <span>Label printing + photo room</span>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                                                                <span>Water Room</span>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                                                                <span>WC</span>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )
                                }

                            </Grid>
                            {/* Này là chart */}
                            <Grid item xs={8}>
                                <Grid container justifyContent={'center'} rowSpacing={1}>
                                    {
                                        listRack1.map((item: any, index: number) => {
                                            if (index % 2 !== 0) {
                                                return (
                                                    <>
                                                        <Grid item xs={2} display={'flex'} justifyContent={'center'}>
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <ChartLVL listRack={item} wareHouse={warehouse} />
                                                        </Grid>
                                                    </>
                                                )
                                            } else {

                                                return (
                                                    <>
                                                        <Grid item xs={4} >
                                                            <ChartLVL listRack={item} wareHouse={warehouse} />
                                                        </Grid>
                                                    </>

                                                )
                                            }
                                        })
                                    }
                                </Grid>
                                <Grid container marginTop={'100px'}>
                                    <Grid item xs={12}>
                                        <Box sx={{ marginBottom: '5px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid BLACK' }}>
                                            <span>OFFICE/VAN PHONG</span>
                                        </Box>
                                    </Grid>
                                   
                                </Grid>
                            </Grid>
                            {/* Này là bên phải  */}
                            <Grid item xs={2} >
                                {
                                    warehouse === 'B5L2'
                                        ?
                                        (
                                            <Grid container height={'100%'} direction={'column'}>
                                                <Grid item xs={1.5}  >
                                                    <Box sx={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid yellow' }}>
                                                        <span>Khu Phoi Hang</span>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={2}></Grid>
                                                <Grid item xs={8} >
                                                    <Box sx={{ marginBottom: '5px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid yellow' }}>
                                                        <span>Khu Phoi Hang</span>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        )
                                        :
                                        warehouse === 'B5L1' &&
                                        (
                                            <Grid container height={'100%'} direction={'column'}>
                                                <Grid item xs={4} height={'100%'}>
                                                    <Grid container height={'100%'} direction={'column'} rowSpacing={1}>
                                                        <Grid item xs={2}>
                                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={2}></Grid>
                                                        <Grid item xs={4}>
                                                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid purple' }}>
                                                                <span>Khu Kiem Hang QC</span>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )
                                }
                            </Grid>
                        </Grid>
                    </div>


            }

        </FullScreenContainerWithNavBar>
    )

}
export default WareHouseF