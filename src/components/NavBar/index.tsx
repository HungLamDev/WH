import BackButton from "./BackButton";
import SideBarToggleButton from "./SideBarToggleButton";
import { Stack, Typography, Box, Divider, IconButton } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import "./style.scss";

interface NavBarProps {
  title?: string,
  navigate: string,
  sideBarDisable: boolean,
  sideBarNavigate: string,
  state?: any,
  onShowScan?: any,
  hidden?: any,
  cancelRequest?: any
}

const NavBar = (props: NavBarProps) => {
  const { title, navigate, sideBarDisable, sideBarNavigate, state, onShowScan, hidden, cancelRequest } = props
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      justifyContent={"space-between"}
      className={"my-navbar dark-bg-secondary"}
      paddingBottom={1}
    >
      <Box position={"relative"} width={"100%"}>
        <BackButton navigate={navigate} state={state} cancelRequest={cancelRequest} />
        <SideBarToggleButton sideBarDisable={sideBarDisable} sideBarNavigate={sideBarNavigate} />
        <Stack alignItems={"center"}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography className="titleNavbar" sx={{ whiteSpace: 'pre', textAlign: 'center' }}>{title}</Typography>
            <IconButton sx={{ marginLeft: '20px' }} onClick={onShowScan} >
              <CameraAltIcon sx={{ display: !hidden ? 'none' : 'block' }}  />
            </IconButton>
          </Box>
          <Divider
            light={true}
            sx={{
              width: "60%",
              borderColor: "white",
            }}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default NavBar;
