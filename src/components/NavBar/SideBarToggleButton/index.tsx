import { IconButton } from "@mui/material";
import { TbListSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const SideBarToggleButton = ({sideBarDisable, sideBarNavigate}:{sideBarDisable:boolean, sideBarNavigate: string}) => {
  const nag = useNavigate()

  return (
    <IconButton
    hidden={sideBarDisable}
    onClick={() => nag(sideBarNavigate)}
    className={'sidebar-toggle-button'}
    >
      <TbListSearch hidden={sideBarDisable}/>
    </IconButton>
  );
};

export default SideBarToggleButton;
