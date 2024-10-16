import CurrentData from "./components/currentData/CurrentData";
import Cart from "./components/Cart";
import MainContainer from "./components/MainContainer";

import ConditionForm from "./components/conditionForm/conditionForm.tsx";
import ConditionsList from "./components/conditionsList/ConditionList.tsx";
import RequestForm from "./components/conditionForm/RequestForm.tsx";

export default function App() {
  return (
    <MainContainer>
      <Cart>
        <ConditionsList />
      </Cart>
      <Cart>
        <ConditionForm />
        <RequestForm />
      </Cart>
      <Cart>
        <CurrentData />
      </Cart>
    </MainContainer>
  );
}
