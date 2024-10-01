import { Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  height: "100vh",

  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Cart({ children }: { children: React.ReactNode }) {
  return (
    <Grid2 size={4}>
      <Item>{children}</Item>
    </Grid2>
  );
}
