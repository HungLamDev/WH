//#region import
import { Paper, Stack, TextField, Button, FormControl, InputLabel, FilledInput, InputAdornment, IconButton, OutlinedInput, MenuItem, Box } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import md5 from "md5";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../../../redux/UserLogin";
import CircularProgress from '@mui/material/CircularProgress';
import { config } from "../../../utils/api";
import ModalCofirm from "../../../components/ModalConfirm";
import { setWareHouse, getWareHouse, getFactory, setFactory } from "../../../utils/localStorage";
import { connect_string } from "../ChooseFactory";
//#endregion
const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  //#region List Warehouse
  const currencies = [
    {
      value: 'No',
      label: t('massWarehouse'),
    },
    {
      value: 'Chemistry',
      label: t('btnAccounting_Chemistry'),
    },
    {
      value: 'Sample',
      label: t('btnAccounting_Sample'),
    },
    {
      value: 'Fitting',
      label: t('btnAccounting_Sole'),
    },
    {
      value: 'Inventory',
      label: t('btnAccounting_Inventory'),
    },
    {
      value: 'Decorate',
      label: t('btnAccounting_Decorate'),
    },
  ];
  //#endregion

  //#region Variable
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const wareHouseName = getWareHouse() === null ? setWareHouse("No") : getWareHouse();
  const [selectedWareHouse, setSelectedWareHouse] = useState(
    wareHouseName ? wareHouseName : "No"
  );
  const factoryName = getFactory() === null ? setFactory("LHG") : getFactory();
  //#endregion

  //#region Func Logic
  const showBuilding = async () => {

    const url = connect_string + "api/show_Value_Buiding";
    const data = {
      user_id: username
    };

    const response = await axios.post(url, data, config);
    return response.data;
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickItem = (name: string) => {
    setSelectedWareHouse(name);
    setWareHouse(name);
  }

  function handleFulfilled(): void {
    navigate("/");
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function handleSubmit(event: any): Promise<void> {
    event.preventDefault();
    const url = connect_string + 'api/Login';
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const dataUser = {
      User_Id: username,
      pass: md5(password).toUpperCase(),
    };
  
    setIsLoading(true);
    try {
      const response = await axios.post(url, dataUser, config);
      if (response.data.length !== 0) {
        const buildingData = await showBuilding(); // Chờ đợi showBuilding trả về dữ liệu
        console.log(response.data)
        dispatch(
          addUser([
            {
              UserId: response.data[0]['Rp_User_Id'],
              UserName: response.data[0]['Rp_User_name'],
              UserRole: response.data[0]['Rp_Usere_level'],
              WareHouse: selectedWareHouse,
              factoryName: factoryName,
              building: buildingData,
              TLLanguage:response.data[0]['TLLanguage'] // Sử dụng dữ liệu từ showBuilding ở đây
            }
          ])
        );
        handleFulfilled();
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API: ', error);
      // Xử lý lỗi ở đây nếu cần
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  }
  
  //#endregion

  return (
    <Box >
      <form onSubmit={handleSubmit} >
        <Paper
          className={"my-login-form"}
          sx={{
            p: 5,
          }}
        >
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            spacing={5}
          >
            <TextField
              sx={{ width: '90%' }}
              label={t("lblUser_Name")}
              variant="outlined"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              sx={{ width: '90%' }}
              label={t("lblUser_Password")}
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="outlined-select-currency"
              select
              label={t("lblWareHouse")}
              sx={{ width: '90%' }}
              value={selectedWareHouse}
            >
              {currencies.map((option) => (
                <MenuItem onClick={() => handleClickItem(option.value)} key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button variant={"contained"} fullWidth type={"submit"}>
              {t("btnLogin")}
            </Button>
            {isLoading && <CircularProgress size={'25px'} color="info" />}
            {open && <ModalCofirm title={t("msgLoginIncorrect") as string} open={open} onClose={() => setOpen(false)} onPressOK={() => setOpen(false)} />}
          </Stack>
        </Paper>
      </form>
    </Box>

  );
};

export default LoginForm;
