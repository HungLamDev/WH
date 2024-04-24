import { Button, ButtonProps } from "@mui/material";

const MyButton = (props: ButtonProps & { name: string }) => {
  function handleClick(event: any): void {
    event.preventDefault();
  }
  function handleMouseDown(event: any): void {
    event.preventDefault();
  }
  return (
    <Button
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      sx={{
        background: "#757575",
        color: "white",
        borderRadius: "50px",
        lineHeight: "normal",
        borderColor: "white",
        border: "1px solid white",
        textTransform: "none",
        width: "7rem",
        height: "2.5rem",
        "@media screen and (max-width: 1200px)": {
          fontSize: "12px",
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
