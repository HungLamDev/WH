import { Button, ButtonProps } from "@mui/material";
import { getAppLang } from "../../utils/localStorage";

const MyButton = (props: ButtonProps & { name: string, whiteSpace?: string }) => {
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
      sx={{
        background: "#757575",
        whiteSpace: props.whiteSpace || "",
        color: "white",
        borderRadius: "50px",
        lineHeight: "normal",
        borderColor: "white",
        border: "1px solid white",
        textTransform: "none",
        width: "7rem",
        height: "2.5rem",
        fontSize: language === "MM" ? "12px" : "14px",
        "@media screen and (max-width: 1200px)": {
          fontSize: language === "MM" ? "11px" : "12px",
          width: "6.0rem",
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
