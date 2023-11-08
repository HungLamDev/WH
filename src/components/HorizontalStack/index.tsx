import { Stack, StackProps } from "@mui/material";
const HorizontalStack = (props: StackProps) => {
  return <Stack direction={"row"} alignItems={'center'} {...props}></Stack>;
};

export default HorizontalStack;
