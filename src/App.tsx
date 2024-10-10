import CurrentData from "./components/currentData/CurrentData";
import Cart from "./components/Cart";
import MainContainer from "./components/MainContainer";
import ConditionsList from "./components/conditionsList/conditionsList";
import AddConditionButton from "./components/conditionsList/AddConditionButton";

export default function App() {
  return (
    <MainContainer>
      <Cart>
        <ConditionsList />
        <AddConditionButton />
      </Cart>
      <Cart>
        <CurrentData />
      </Cart>
      <Cart>3</Cart>
    </MainContainer>
  );
}
