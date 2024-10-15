import { ref, onValue } from "firebase/database";
import { database } from "./firebaseConfig";
import { updateWebhookData } from "./store/webhookData-slice";

import CurrentData from "./components/currentData/CurrentData";
import Cart from "./components/Cart";
import MainContainer from "./components/MainContainer";

import AddConditionButton from "./components/conditionsList/AddConditionButton";
import ListItems from "./components/ListItems.tsx";
import { useAppDispatch, useAppSelector } from "./store/hooks.ts";
import ConditionButton from "./components/conditionsList/ConditionButton.tsx";
import { useEffect } from "react";

export default function App() {
  const conditionsList = useAppSelector((state) => state.conditions.conditions);


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
