import { Button, ButtonProps } from "@mui/material";
import { getAppLang } from "../../utils/localStorage";

interface MyButtonProps extends ButtonProps {
  name: string;
  whiteSpace?: string;
  customClass?: string;
  height?: string;
}

const MyButton = (props: MyButtonProps) => {
  const { name, whiteSpace, customClass = '', height= "2.5rem"} = props;

  function handleClick(event: any): void {
    event.preventDefault();
  }
  function handleMouseDown(event: any): void {
    event.preventDefault();
  }
  const language = getAppLang();
  return (
    <Button
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className={customClass}
      sx={{
        
        background: "#757575",
        whiteSpace: props.whiteSpace || "",
        color: "white",
        borderRadius: "50px",
        lineHeight: "normal",
        borderColor: "white",
        border: "1px solid white",
        textTransform: "none",
        width: "6.4rem",
        height: height,
        fontSize: language === "MM" ? "12px" : "14px",
        "@media screen and (max-width: 1200px)": {
          fontSize: language === "MM" ? "11px" : "12px",
          width: "5.5rem",
        },
        "@media screen and (max-width: 885px)": {
          fontSize: language === "MM" ? "12px" : "11px",
          width: "5.5rem",
        },
        "@media screen and (max-width: 670px)": {
          fontSize: language === "MM" ? "11px" : "10px",
          width: "5.0rem",
        },

        "@media screen and (max-width: 620px)": {
          fontSize: language === "MM" ? "7px" : "8px",
          width: "5.0rem",
        },

        "&:focus": { background: "#757575" },
      }}
      variant={"contained"}
      color={"primary"}
      {...props}
    >
      {props.name}
    </Button>
  );
};

export default MyButton;
