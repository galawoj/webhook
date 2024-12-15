import CurrentData from "./components/currentData/CurrentData";
import Cart from "./components/Cart";
import MainContainer from "./components/MainContainer";

import ConditionsList from "./components/conditionsList/ConditionList.tsx";
import RequestForm from "./components/requestForm/RequestForm.tsx";
import ConditionForm from "./components/conditionForm/ConditionForm.tsx";
import SendRequestButton from "./components/requestForm/SendRequestButton.tsx";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { updateWebhookData } from "./store/webhookData-slice";
import { onValue, ref } from "firebase/database";
import { database } from "./firebaseConfig";
import Response from "./components/response/Response.tsx";

export default function App() {
  const dispatch = useAppDispatch();
  const firstOrCondReq = useAppSelector((state) => state.firstRequest.isActive);

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
      <Cart mode="condition">
        <ConditionsList />
      </Cart>
      <Cart mode={!firstOrCondReq && "condition"}>
        {!firstOrCondReq ? <ConditionForm /> : ""}
        <RequestForm />
        <SendRequestButton />
      </Cart>
      <Cart>
        <Response />
      </Cart>
      <Cart>
        <CurrentData />
      </Cart>
    </MainContainer>
  );
}
