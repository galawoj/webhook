import CurrentData from "./components/currentData/CurrentData";
import Cart from "./components/Cart";
import MainContainer from "./components/MainContainer";

import AddConditionButton from "./components/conditionsList/AddConditionButton";
import ListItems from "./components/ListItems.tsx";
import { useConditionsSelector } from "./store/hooks.ts";
import ConditionButton from "./components/conditionsList/ConditionButton.tsx";

export default function App() {
  const conditionsList = useConditionsSelector(
    (state) => state.conditions.conditions
  );

  return (
    <MainContainer>
      <Cart>
        <ListItems array={conditionsList}>
          {(item) => <ConditionButton key={item.id} id={item.id} />}
        </ListItems>
        <AddConditionButton />
      </Cart>
      <Cart>
        <CurrentData />
      </Cart>
      <Cart>3</Cart>
    </MainContainer>
  );
}
