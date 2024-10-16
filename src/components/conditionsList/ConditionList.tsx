import ConditionButton from "./ConditionButton";
import AddConditionButton from "./AddConditionButton";
import ListItems from "../ListItems";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { updateWebhookData } from "../../store/webhookData-slice";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebaseConfig";

export default function ConditionsList() {
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
    <>
      <ListItems array={conditionsList}>
        {(item) => <ConditionButton key={item.id} id={item.id} />}
      </ListItems>
      <AddConditionButton />
    </>
  );
}
