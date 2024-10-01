import CurrentData from "./components/CurrentData";
import Cart from "./components/Cart";
import Main from "./pages/main/Main";

export default function App() {
  return (
    <Main>
      <Cart>1</Cart>
      <Cart>
        <CurrentData />
      </Cart>
      <Cart>3</Cart>
    </Main>
  );
}
