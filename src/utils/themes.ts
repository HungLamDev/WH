// import { createTheme } from "@mui/material";
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#1c2538" },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // Disabled ripple animation on button component
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  },
  transitions: {
    create: () => {
      return "none"; // Disable transitions at all components
    },
  },
});
