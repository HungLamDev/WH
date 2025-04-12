//#region import
import "./style.scss";
import vietnameseIcon from "../../../assets/vietnamese.png";
import englishIcon from "../../../assets/english.png";
import burmeseIcon from "../../../assets/burmese.png";
import chineseIcon from "../../../assets/chinese.png";
import importIcon from "../../../assets/import.png";
import exportIcon from "../../../assets/export.png";
import printerIcon from "../../../assets/printer.png";
import inventoryIcon from "../../../assets/inventory.png";
import reportIcon from "../../../assets/report.png";
import chemistryIcon from "../../../assets/chemistry.png";
import sampleIcon from "../../../assets/sample.png";
import tonIcon from "../../../assets/ton.png";
import soleIcon from "../../../assets/sole.png";
import decorateIcon from "../../../assets/decorate.png";
import deliveryIcon from "../../../assets/delivery.png";
import languaguesIcon from "../../../assets/languages.png";
import settingsIcon from "../../../assets/settings.png";
import deleteStampIcon from "../../../assets/deleteStamp.png";
import labelSplitIcon from "../../../assets/tachnhan.png";
import resetPasswordIcon from "../../../assets/reset-password.png";
import workerIcon from "../../../assets/worker.png";
import addUserIcon from "../../../assets/add-group.png";
import inkhacIcon from "../../../assets/inkhac.png";
import inblaIcon from "../../../assets/inbla.png";
import lsinIcon from "../../../assets/lsin.png";
import intonIcon from "../../../assets/inton.png";
import qrcanIcon from "../../../assets/qrcan.png";
import focIcon from "../../../assets/FOC.png";
import permissionPrintIcon from "../../../assets/permission-print.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Analytics from "../../../assets/analytics.png";
import Load from "../../../assets/load.gif";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ModalChoose from "../../../components/ModalChoose/index.tsx";
import ChangePassword from "../../ModalScreen/ChangePasswordForm/index.tsx";
import { useEffect, useState } from "react";
import { connect_string } from "../../LoginScreen/ChooseFactory/index.tsx";
import { useSelector } from "react-redux";
import { ILanguageItem } from "../../LoginScreen/ChooseLanguage/interface.ts";
import { registerSW } from 'virtual:pwa-register'
import { handleCheckUserERP } from "../../../utils/api_global.ts";
import ModalCofirm from "../../../components/ModalConfirm/index.tsx";
import { getFactory, getWareHouse } from "../../../utils/localStorage.ts";

//#endregion

const Menu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  //#region Style 
  const IconWrapper = (props: any) => {
    return (
      <Button

        sx={{
          width: "fit-content",
          height: "fit-content",
          p: 1.5,
          borderRadius: "20%",
          cursor: "pointer",
          color: "white",
          background: "rgb(157, 178, 191,0.8)",
          ':disabled': {
            background: 'gray', // Thay đổi màu nền khi vô hiệu hóa
            opacity: 0.5
          },
        }}
        {...props}
      ></Button>
    );
  };

  const GridItem = (props: any) => {
    return (
      <Grid {...props} item xs={2} textAlign={"center"} color={"white"} display={"flex"} direction={'column'} alignItems={'center'} gap={'10px'}></Grid>
    );
  };
  //#endregion

  //#region useSelector
  const dataUser = useSelector((state: any) => state.UserLogin.user);
  //#endregion

  //#region Variable
  const [open, setOpen] = useState(false)
  const [modalName, setModalName] = useState('')
  const [showPage, setShowPage] = useState(true);
  const [date, setDate] = useState(new Date());
  const [load, setLoad] = useState(false);
  const [ctime, setCtime] = useState(new Date().toLocaleTimeString('vi-VN'));
  const [cofirmType, setCofirmType] = useState('')
  const [openCofirm, setOpenCofirm] = useState(false)
  //#endregion

  const handleCloseConfirmERP = () => {
    setCofirmType('')
    setOpenCofirm(false)
    navigate("/")
  }
  const handleOpenConfirm = (confirmName: string) => {
    setCofirmType(confirmName)
    setOpenCofirm(true)
  }


  //#region List Data

  // Danh sách chức năng
  const WH = getWareHouse()
  const Factory = getFactory()
  const menuList: { title: string; icon: string; path: string, modal: boolean, modalName: string, disabled?: boolean }[] = [
    {
      title: t("btnStock_In") as string,
      icon: importIcon,
      path: "/stock-in",
      modal: false,
      modalName: '',
    },
    {
      title: t("btnStock_Out") as string,
      icon: exportIcon,
      path: "/stock-out",
      modal: false,
      modalName: '',
    },
    {
      title: t("lblSystem_Warehouse") as string,
      icon: Analytics,
      path: "/warehouse",
      modal: false,
      modalName: '',
    },
    {
      title: t("btnInventory") as string,
      icon: inventoryIcon,
      path: "/inventory",
      modal: false,
      modalName: '',
    },
    {
      title: (WH === 'Sample' && Factory === 'LYV') ? t("btnDeliverySample") : t("btnDelivery"),
      icon: deliveryIcon,
      path: (WH === 'Sample' && Factory !== 'LYV') ? "/delivery-sample" : (WH === 'Sample' && Factory === 'LYV') ? "/delivery-sample-lyv" : "/delivery",
      modal: false,
      modalName: '',
    },
    {
      title: t("btnAccounting_Card") as string,
      icon: reportIcon,
      path: WH === 'Fitting' ? "/accountingcard-sole" : "/accounting-card",
      modal: dataUser[0].UserRole === 'Administrator' || dataUser[0].UserRole === 'Manager' || dataUser[0].UserRole === 'Account' ? true : false,
      modalName: 'listAccounting_Card',
    },
    {
      title: t("btnPrint_Other") as string,
      icon: inkhacIcon,
      path: "",
      modal: true,
      modalName: 'print_other',
      disabled: dataUser[0].UserRole === 'User ' ? true : false
    },
    {
      title: t("btnERP_Print") as string,
      icon: printerIcon,
      path: "/stamp-print",
      modal: false,
      modalName: '',
      disabled: dataUser[0].UserRole === 'User ' ? true : false
    },
    {
      title: t("lblSM_Print_Cut"),
      icon: labelSplitIcon,
      path: "/label-split",
      modal: false,
      modalName: '',
      disabled: dataUser[0].UserRole === 'User ' ? true : false
    },
    {
      title: t("lblSetting"),
      icon: settingsIcon,
      path: "",
      modal: true,
      modalName: 'settings',
      disabled: dataUser[0].UserRole === 'Administrator' ? false : true
    },
    {
      title: t("btnChangepassword"),
      icon: resetPasswordIcon,
      path: "",
      modal: true,
      modalName: 'change-password',
    },
    {
      title: t("tsmLanguage"),
      icon: languaguesIcon,
      path: "",
      modal: true,
      modalName: 'languages',
    },
  ];

  // Danh sách thẻ kho
  const list: { title: string; icon: string; path: string, vWareHouse: string, hidden?: boolean }[] = [
    {
      title: t("btnAccounting_Chemistry") as string,
      icon: chemistryIcon,
      path: "/accounting-card",
      vWareHouse: "No"
    },
    {
      title: t("btnAccounting_Sample") as string,
      icon: sampleIcon,
      path: "/accounting-card",
      vWareHouse: "Sample"
    },

    {
      title: t("btnAccounting_Inventory") as string,
      icon: tonIcon,
      path: "/accounting-card",
      vWareHouse: "Inventory"
    },
    {
      title: t("btnAccounting_Sole") as string,
      icon: soleIcon,
      path: "/accountingcard-sole",
      vWareHouse: "Fitting"
    },
    {
      title: t("btnAccounting_Decorate") as string,
      icon: decorateIcon,
      path: "/accounting-card",
      vWareHouse: "Decorate"

    },
    {
      title: t("btnAccounting_FOC") as string,
      icon: focIcon,
      path: "/accounting-card",
      vWareHouse: "FOC",
      hidden: dataUser[0].factoryName === "LHG" ? false : true
    },
    {
      title: t("btnAccounting_Card") as string,
      icon: reportIcon,
      path: "/accounting-card",
      vWareHouse: "No"
    },
  ];

  // Danh sách ngôn ngữ
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

  // Danh sách cài đặt
  const listSettings: { title: string; icon: string; path: string }[] = [
    {
      title: t("lblDelete_Order") as string,
      icon: deleteStampIcon,
      path: "/delete-order",
    },
    {
      title: t("btnData_Program_Priority") as string,
      icon: workerIcon,
      path: "/priority-rack",
    },
    {
      title: t("lblUser") as string,
      icon: addUserIcon,
      path: "/user-form",
    },
    {
      title: t("lblPrint") as string,
      icon: permissionPrintIcon,
      path: "/permission-print",
    },
  ];

  // Danh sách in khác
  const listPrintOther: { title: string; icon: string; path: string, disabled?: boolean, hidden?: boolean }[] = [
    {
      title: t("btnPrint_Chemistry") as string,
      icon: chemistryIcon,
      path: "/chemistry-print",
    },
    {
      title: t("btnPrint_sample") as string,
      icon: inblaIcon,
      path: "/sample-print",
    },
    {
      title: t("btnPrint_Inventory") as string,
      icon: intonIcon,
      path: "/inventory-print",
      disabled: dataUser[0].UserRole === 'Administrator' || dataUser[0].UserRole === 'Manager' || dataUser[0].UserRole === 'InPartial' || dataUser[0].UserRole === 'Inventory' ? false : true
    },
    {
      title: t("btnPrintRack_QRcode") as string,
      icon: qrcanIcon,
      path: "/shelve-code",
    },
    {
      title: t("btnPrint_Decorate") as string,
      icon: decorateIcon,
      path: "/decorate-print",
    },
    {
      title: t("btnPrint_FOC") as string,
      icon: focIcon,
      path: "/foc-print",
      hidden: dataUser[0].factoryName === "LHG" ? false : true
    },
    {
      title: t("btnData_History_Print") as string,
      icon: lsinIcon,
      path: "/history-print",
    },
  ];

  //#endregion

  //#region useEffect
  // useEffect(() => {
  //   showBuilding()
  // }, []);
  //#endregion

  //#region  Func Logic
  // api lưu log check point
  const handleNavigate = (path: any, title: any) => {
    const url = connect_string + 'api/CheckPoint'
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    const data = {
      data: dataUser[0].UserId,
      point: title,
      get_version: dataUser[0].WareHouse
    }
    // bắt user phải tồn tại ERP với kho mẫu LYV
    if (path === "/delivery-sample-lyv") {
      handleCheckUserERP(dataUser[0].UserId).then(result => {
        if (result === false) {
          handleOpenConfirm("no-account-erp")
        }
        else {
          setShowPage(false);
          setTimeout(() => {
            navigate(path);
          }, 1400);
          axios.post(url, data, config)
        }
      })
    }
    // các chức năng bình thường
    else {
      setShowPage(false);
      setTimeout(() => {
        navigate(path);
      }, 1400);
      axios.post(url, data, config)
    }
  }
  const handleOpen = (name: any) => {
    setModalName(name);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    setModalName('');
  };

  const handleLogout = () => {
    window.location.reload()
    const updateSW = registerSW({
      onRegistered(r) {
        if (r) {
          r.onupdatefound = () => {
            const newWorker = r.installing;
            if (newWorker) {
              newWorker.onstatechange = () => {
                if (newWorker.state === 'installed') {
                  alert("Cập nhật phiên bản mới thành công - The new version has been installed successfully");
                }
              };
            }
          };
        }
      }
    })
  }

  //#endregion

  return (
    <Stack
      className={"menuContainer"}
      justifyContent={"center"}
      alignItems={"center"}
      // height={"100vh"}
      margin={"0 auto"}

    >
      {/* Thông tin user */}
      <div style={{
        width: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '50px',
        paddingTop: ' 10px',
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid',
          padding: '5px',
          borderRadius: '20px',
        }}>
          {/* icon user */}
          <AccountCircleIcon
            fontSize="large"
          />
          <Stack marginLeft={'10px'} marginRight={'20px'}>
            {/* Tên người dùng */}
            <Typography

            >
              {dataUser[0].UserName}
            </Typography>
            <Box display={'flex'} justifyContent={'space-between'}>
              {/* Số thẻ */}
              <Typography marginRight={'20px'} variant="subtitle2" color={dataUser[0].UserRole === 'Administrator' ? 'red' : dataUser[0].UserRole === 'Manager' ? 'green' : '#FFE17B'}>{dataUser[0].UserId}  </Typography>
            </Box>
          </Stack>
          {/* Nút logout */}
          <LogoutIcon
            sx={{
              cursor: 'pointer'
            }}
            onClick={handleLogout} />
        </Box>
      </div>
      {/* Menu */}
      <Grid
        container
        width={'80%'}
        flex={8}
        display={'flex'}
        alignContent={'center'}
        gap={'70px 0px'}
        sx={{
          "@media screen and (max-height: 400px)": {
            gap: '15px 0px'
          },
        }}
      >
        {menuList.map(({ title, icon, path, modal, modalName, disabled }, index: number) => {
          return (
            <Grid key={index} item display={'flex'} flexDirection={'column'} textAlign={'center'} xs={2} alignItems={'center'} gap={'10px'} >
              <IconWrapper
                disabled={disabled ? disabled : false}
                onClick={() => {
                  if (modal) {
                    handleOpen(modalName)
                  }
                  else {
                    handleNavigate(path, title);
                  }
                }}
              >
                <img src={icon} alt={title} className="hover-effect" />
              </IconWrapper>
              <Typography
                sx={{
                  fontSize: '15px',
                  // color: '#17153B'
                  color: 'white'
                }}
                className="textsize-960px" >{t(title)}</Typography>
            </Grid>
          );
        })}
      </Grid>

      <Typography className="textsizemini" variant="caption"
        sx={{
          flex: 1,
          color: '#FDE767',
          opacity: 0.5,
          textAlign: 'center',
          alignItems: 'flex-end',
          display: 'flex',
          fontWeight: 'bold'
        }}
      > Powered by IT-Software LHG<br /> © 2024 LACTY CO.,LTD. All rights reserved.
      </Typography>
      <Typography className="textsizemini" variant="caption"
        sx={{
          flex: 1,
          color: '#FDE767',
          opacity: 0.5,
          textAlign: 'center',
          position: 'absolute',
          top: 1,
          left: 1,
          fontWeight: 'bold'
        }}
      > Version: {import.meta.env.VITE_APP_VERSION}
      </Typography>
      {/* Modal danh sách thẻ kho */}
      {modalName === 'listAccounting_Card' && <ModalChoose setShowState={() => setShowPage(false)} open={open} onClose={() => setOpen(false)} array={list} />}
      {/* Modal danh sách ngôn ngữ */}
      {modalName === 'languages' && <ModalChoose setShowState={() => setShowPage(false)} open={open} onClose={() => setOpen(false)} array={myArray} />}
      {/* Modal danh sách cài đặt */}
      {modalName === 'settings' && dataUser[0].UserRole === 'Administrator' && <ModalChoose setShowState={() => setShowPage(false)} open={open} onClose={() => setOpen(false)} array={listSettings} />}
      {/* Modal đổi mật khẩu */}
      {modalName === 'change-password' && <ChangePassword open={open} onClose={() => setOpen(false)} />}
      {/* Modal danh sách in khác */}
      {modalName === 'print_other' && <ModalChoose setShowState={() => setShowPage(false)} open={open} onClose={() => setOpen(false)} array={listPrintOther} />}
      {/* Chiếc xe chạy */}
      {!showPage && (
        <div className="loading-overlay">
          <img src={!showPage ? Load : ''} style={{ width: 500 }} />
        </div>
      )}
      {cofirmType === "no-account-erp" && <ModalCofirm showCancel={false} open={openCofirm} onPressOK={handleCloseConfirmERP} title={t("lblNoAccountERP") as string} />}

    </Stack>
  );
};

export default Menu;
