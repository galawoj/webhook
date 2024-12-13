import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const CartItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  height: "100%",

  ...theme.typography.body2,
  padding: theme.spacing(1),

  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
