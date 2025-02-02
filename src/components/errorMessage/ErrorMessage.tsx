import { CartItem } from "../CartItem";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <CartItem
      sx={{
        backgroundColor: "red",
        padding: "20px",
        textAlign: "center",
        border: "1px solid black",
      }}
    >
      {message}
    </CartItem>
  );
}
