import { Grid2 } from "@mui/material";
import { CartItem } from "./CartItem";

export default function Cart({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode?: "condition" | false;
}) {
  return (
    <Grid2 size={3}>
      <CartItem sx={{ background: `${mode === "condition" && "E0E0E0"}` }}>
        {children}
      </CartItem>
    </Grid2>
  );
}
