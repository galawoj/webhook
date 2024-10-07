import CurrentData from "./components/currentData/CurrentData";
import Cart from "./components/Cart";
import MainContainer from "./components/MainContainer";

export default function App() {
  return (
    <MainContainer>
      <Cart>1</Cart>
      <Cart>
        <CurrentData />
      </Cart>
      <Cart>3</Cart>
    </MainContainer>
  );
}
