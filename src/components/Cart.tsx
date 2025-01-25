import { Grid2 } from "@mui/material";
import { CartItem } from "./CartItem";
import { useAppSelector } from "../store/hooks";

export default function Cart({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor?: string;
}) {
  const isFirstReqActive = useAppSelector(
    (state) => state.firstRequest.isActive
  );

  const currentBgColor = bgColor ? bgColor : !isFirstReqActive && "#E0E0E0";

  return (
    <Grid2 size={3}>
      <CartItem sx={{ background: `${currentBgColor}` }}>
        <div
          style={{ padding: "10px", display: "flex", flexDirection: "column" }}
        >
          {children}
        </div>
      </CartItem>
    </Grid2>
  );
}
