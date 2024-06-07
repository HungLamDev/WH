//#region  import
import { Box, FormControl, MenuItem, Select, Stack, Typography } from "@mui/material";
import { getFactory, setFactory } from "../../../utils/localStorage";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import lhgIcon from "../../../assets/LHG.png";
import lyvIcon from "../../../assets/LYV.png";
import lvlIcon from "../../../assets/LVL.png";
import lymIcon from "../../../assets/LYM.png";
import { config } from "../../../utils/api";
import axios from "axios";
import { ka } from "date-fns/locale";
export type FactoryName = "LHG" | "LYV" | "LVL" | "LYM";
export interface IFactoryItem {
    factoryName: string;
    icon: string;
    value: FactoryName;
}
//#endregion
export let connect_string = ''

export const checkPermissionPrint = async (UserId: string) => {
    const url = connect_string + 'api/check_print_name';
    const data = {
        user_id1: UserId,
    };
    try {
        const response = await axios.post(url, data, config);
        return response.data;
    } catch (error) {
        return false;
    }
};

const ChooseFactory = () => {
    const { t } = useTranslation();

    //#region List Factory
    const myArray: IFactoryItem[] = [
        {
            factoryName: t("btnLHG"),
            icon: lhgIcon,
            value: "LHG"
        },
        {
            factoryName: t("btnLYV"),
            icon: lyvIcon,
            value: "LYV"
        },
        {
            factoryName: t('btnLVL'),
            icon: lvlIcon,
            value: "LVL"
        },
        {
            factoryName: t("btnLYM"),
            icon: lymIcon,
            value: "LYM"
        },
    ];
    //#endregion

    //#region Variable
    const appFactory = getFactory() === null ? setFactory("LHG") : getFactory();

    const [selectedValue, setSelectedValue] = useState<FactoryName>(
        appFactory ? appFactory : "LHG"
    );

    useEffect(() => {
        if (selectedValue === 'LVL') {
            connect_string = 'https://192.168.60.21:7777/'
            //connect_string = 'https://192.168.32.81/'
        }
        else if (selectedValue === 'LHG') {
            connect_string = 'https://192.168.30.100:7777/'
            // connect_string = 'https://192.168.32.84:7777/'
           // connect_string = 'https://192.168.32.81/'
        }
        else if (selectedValue === 'LYM') {
            connect_string = 'https://192.168.55.7:7777/'
            // connect_string = 'https://192.168.32.81/'
        }
        else if (selectedValue === 'LYV') {
            connect_string = 'https://192.168.32.84:7776/'
        }
    }, [selectedValue])
    //#endregion

    //#region Func Logic
    const handleClickItem = (lng: FactoryName) => {
        setSelectedValue(lng);
        setFactory(lng);
    }
    //#endregion

    return (
        <Box className={"choose-factory"}>
            <FormControl>
                <Select size="medium" value={selectedValue} sx={{minWidth: '8.2rem'}}>
                    {myArray.map(({ factoryName, icon, value }, index: number) => {
                        return (
                            <MenuItem
                                key={index}
                                value={value}
                                onClick={() => {
                                    handleClickItem(value);
                                }}
                            >
                                <Stack
                                    direction={"row"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    spacing={1}
                                >
                                    <img
                                        src={icon}
                                        alt=""
                                        style={{
                                            width: "1.7rem",
                                            height: "1.2rem",
                                        }}
                                    />
                                    <Typography className='textsize'>{(factoryName)}</Typography>
                                </Stack>
                            </MenuItem>
                        );
                    })}

                </Select>
            </FormControl>
        </Box>
    );
}

export default ChooseFactory