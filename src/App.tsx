import CurrentData from "./components/currentData/CurrentData";
import Cart from "./components/Cart";
import MainContainer from "./components/MainContainer";

import ConditionsList from "./components/conditionsList/ConditionList.tsx";
import RequestForm from "./components/conditionForm/RequestForm.tsx";
import ConditionForm from "./components/conditionForm/ConditionForm.tsx";

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
