import CurrentData from "./components/currentData/CurrentData";
import Cart from "./components/Cart";
import MainContainer from "./components/MainContainer";

import ConditionsList from "./components/conditionsList/ConditionList.tsx";
import RequestForm from "./components/conditionForm/RequestForm.tsx";
import ConditionForm from "./components/conditionForm/ConditionForm.tsx";
import SendRequest from "./components/sendRequest/SendRequest.tsx";

import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { updateWebhookData } from "./store/webhookData-slice";
import { onValue, ref } from "firebase/database";
import { database } from "./firebaseConfig";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const starCountRef = ref(database, "/data");
    const unsubscribe = onValue(starCountRef, (snapshot) => {
      const data = Object.values(snapshot.val());

      dispatch(updateWebhookData(data));
    });
    return () => unsubscribe();
  }, []);

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
      <Cart>
        <SendRequest />
      </Cart>
    </MainContainer>
  );
}
