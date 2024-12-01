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
      <Cart color="#E0E0E0">
        <ConditionsList />
      </Cart>
      <Cart color={!firstOrCondReq && "#E0E0E0"}>
        {!firstOrCondReq ? <ConditionForm /> : ""}
        <RequestForm />
        <SendRequestButton />
      </Cart>
      <Cart>
        <CurrentData />
      </Cart>
      <Cart>
        <Response />
      </Cart>
    </MainContainer>
  );
}
