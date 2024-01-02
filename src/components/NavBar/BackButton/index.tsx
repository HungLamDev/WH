import { IconButton } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearArrayRowDowns } from "../../../redux/ArrayRowDowns";
import { clearArrayRowUps } from "../../../redux/ArrayRowUps";
import { clearArrayDeleteAndPrint } from "../../../redux/ArrayDeleteAndPrint";
import { clearArrayRowDowntoUp } from "../../../redux/ArrayRowDowntoUp";
import { clearItemsMaterialTableChecked } from "../../../redux/MaterialTableChecked";
import { clearItemsMaterialTable } from "../../../redux/array";
import axios, { CancelToken } from 'axios';

interface BackButtonProps{
  navigate: string, 
  state?: any ,
  cancelRequest?: any 
}

const BackButton = (props: BackButtonProps) => {
  const { navigate, state , cancelRequest} = props
  const nag = useNavigate()
  const dispatch = useDispatch()
  const ArrayRowUps = useSelector((state: any) => state.ArrayRowUps.items);
  const ArrayRowDowns = useSelector((state: any) => state.ArrayRowDowns.items);
  const ArrayRowDowntoUp = useSelector((state: any) => state.ArrayRowDowntoUp.items);
  const ArrayDeleteAndPrint = useSelector((state: any) => state.ArrayDeleteAndPrint.items);
  const MaterialTableChecked = useSelector((state: any) => state.MaterialTableChecked.items);
  const MaterialTable = useSelector((state: any) => state.MaterialTable.items);

  const back = () => {
    if (
      ArrayRowUps.length != 0 ||
      ArrayRowDowns.length != 0 ||
      ArrayRowDowntoUp.length != 0 ||
      ArrayDeleteAndPrint.length != 0 ||
      MaterialTableChecked.length != 0 ||
      MaterialTable.length != 0) {
        dispatch(clearArrayDeleteAndPrint())
        dispatch(clearArrayRowUps())
        dispatch(clearArrayRowDowns())
        dispatch(clearArrayRowDowntoUp())
        dispatch(clearItemsMaterialTableChecked())
        dispatch(clearItemsMaterialTable())
    }
    nag(navigate, { state: state })
    cancelRequest()
  }

  return (
    <IconButton className={'back-button'} onClick={back}>
      <BiArrowBack />
    </IconButton>
  );
};

export default BackButton;
