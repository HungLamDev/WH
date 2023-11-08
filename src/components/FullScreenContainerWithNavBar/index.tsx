import { Box, Checkbox, Grid, Stack, FormControlLabel } from "@mui/material";
import NavBar from "../NavBar";
import InputField from "../InputField";

const FullScreenContainerWithNavBar = ({
  children,
  title,
  navigate,
  sideBarDisable,
  sideBarNavigate,
  state,
  onShowScan,
  hidden
}: {
  title: string;
  children?: JSX.Element | JSX.Element[];
  navigate: string;
  sideBarDisable: boolean;
  sideBarNavigate: string
  state?: any
  onShowScan?:any,
  hidden?:any
}) => {
  // className={"dark-bg-secondary"} borderBottom={"1px solid white"}
  return (
    <Box className={"fit-screen dark-bg-primary"}>
      <Stack style={{height:'100vh'}}>
        <NavBar state={state} title={title} navigate={navigate} sideBarDisable={sideBarDisable} sideBarNavigate ={sideBarNavigate} onShowScan={onShowScan} hidden={hidden}/>
        {/*Start children*/}
        {children}
        {/*End children*/}
      </Stack>
    </Box>
  );
};

export default FullScreenContainerWithNavBar;
