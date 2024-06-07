//#region import
import "./style.scss";
import { useState } from "react";
import {
  Stack,
  FormControl,
  Typography,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import vietnameseIcon from "../../../assets/vietnamese.png";
import englishIcon from "../../../assets/english.png";
import burmeseIcon from "../../../assets/burmese.png";
import chineseIcon from "../../../assets/chinese.png";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { getAppLang, setAppLang } from "../../../utils/localStorage.ts";
import { ILanguageItem } from "./interface.ts";
import { LanguageName } from "./type.ts";
//#endregion

const ChooseLanguage = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
 
  //#region List Language
  const myArray: ILanguageItem[] = [
    {
      language: t("btnEnglish"),
      icon: englishIcon,
      value: "EN"
    },
    {
      language: t("btnChina"),
      icon: chineseIcon,
      value: "TW"
    },
    {
      language: t('btnVietnames'),
      icon: vietnameseIcon,
      value: "VN"
    },
    {
      language: t("tsmMyanmar"),
      icon: burmeseIcon,
      value: "MM"
    },
  ];
  //#endregion
  
  //#region Variable
  const appLang = getAppLang();
  const [selectedValue, setSelectedValue] = useState<LanguageName>(
    appLang ? appLang : "VN"
  );
  //#endregion

  //#region Func Logic
  const handleClickItem = (lng: LanguageName) => {
    i18n.changeLanguage(lng)
    setSelectedValue(lng);
    // Change global language
    i18n.changeLanguage(lng);
    // Set local storage
    setAppLang(lng);
  }
  //#endregion

  return (
    <Box className={"choose-language"}>
      <FormControl>
        <Select size="medium" value={selectedValue} sx={{minWidth: '8.2rem'}}>
          {myArray.map(({ language, icon, value }, index: number) => {
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
                      width: "1.5rem",
                      height: "1.5rem",
                    }}
                  />
                  <Typography className='textsize'>{(language)}</Typography>
                </Stack>
              </MenuItem>
            );
          })}


        </Select>
      </FormControl>
    </Box>
  );
};

export default ChooseLanguage;
