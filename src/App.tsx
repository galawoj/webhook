import WebhookDataList from "./components/webhookData/WebhookDataList.tsx";
import Cart from "./components/Cart";
import MainContainer from "./components/MainContainer";

import ConditionsList from "./components/conditionsList/ConditionList.tsx";
import RequestForm from "./components/requestForm/RequestForm.tsx";
import ConditionForm from "./components/conditionForm/ConditionForm.tsx";
import SendFirstRequestButton from "./components/requestForm/sendFirstRequestButton/SendFirstRequestButton.tsx";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { updateWebhookData } from "./store/webhookData-slice";
import { onValue, ref } from "firebase/database";
import { database } from "./firebaseConfig";
import Response from "./components/response/Response.tsx";
import SendAllCondRequestButton from "./components/conditionsList/SendAllCondRequestButton.tsx";

export default function App() {
  const dispatch = useAppDispatch();
  const isFirstReqActive = useAppSelector(
    (state) => state.firstRequest.isActive
  );

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
      <Cart bgColor="#E0E0E0">
        <ConditionsList />
        <SendAllCondRequestButton />
      </Cart>
      <Cart>
        {!isFirstReqActive && <ConditionForm />}
        <RequestForm />
        {isFirstReqActive && <SendFirstRequestButton />}
      </Cart>
      <Cart bgColor="#FFFFFF">
        <Response mode="firstReq" />
      </Cart>
      <Cart>
        {isFirstReqActive ? <WebhookDataList /> : <Response mode="condReq" />}
      </Cart>
    </MainContainer>
  );
}
