//#region  import
import { Box, FormControl, MenuItem, Select, Stack, Typography } from "@mui/material";
import { getFactory, setFactory } from "../../../utils/localStorage";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import lhgIcon from "../../../assets/LHG.png";
import lyvIcon from "../../../assets/LYV.png";
import lvlIcon from "../../../assets/LVL.png";
import lymIcon from "../../../assets/LYM.png";
export type FactoryName = "LHG" | "LYV" | "LVL" | "LYM";
export interface IFactoryItem {
    factoryName: string;
    icon: string;
    value: FactoryName;
}
//#endregion

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
                <Select value={selectedValue}>
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