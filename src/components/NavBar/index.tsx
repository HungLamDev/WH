import BackButton from "./BackButton";
import SideBarToggleButton from "./SideBarToggleButton";
import { Stack, Typography, Box, Divider, IconButton } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import "./style.scss";
const NavBar = ({ title, navigate, sideBarDisable, sideBarNavigate, state, onShowScan, hidden }: { title?: string, navigate: string, sideBarDisable: boolean, sideBarNavigate: string, state?: any, onShowScan?:any, hidden?: any }) => {
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      justifyContent={"space-between"}
      className={"my-navbar dark-bg-secondary"}
      paddingBottom={1}
    >
      <Box position={"relative"} width={"100%"}>
        <BackButton navigate={navigate} state={state} />
        <SideBarToggleButton sideBarDisable={sideBarDisable} sideBarNavigate={sideBarNavigate} />
        <Stack alignItems={"center"}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant={"h4"}>{title}</Typography>
            <IconButton sx={{ marginLeft:'20px' }}  >
              <CameraAltIcon sx={{  display: !hidden ? 'none' : 'block' }} onClick={onShowScan} />
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
