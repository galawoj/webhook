import { ref, onValue } from "firebase/database";
import { database } from "../../firebaseConfig";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import SingleWebhookData from "./SingleWebhookData";
import {
  useConditionsDispatch,
  useConditionsSelector,
} from "../../store/hooks";
import ListItems from "../ListItems";
import { setInputValue, setConditionValue } from "../../store/conditions-slice";

function CurrentData() {
  const dispatch = useConditionsDispatch();

  const currentCondition = useConditionsSelector(
    (state) => state.conditions.currentCondition
  );

  const currentConditionItem = useConditionsSelector((state) =>
    state.conditions.conditions.find((item) => item.id === currentCondition)
  );

  const [dataJson, setDataJson] = useState<any>();
  const [conditionText, setConditionText] = useState<string>(
    currentConditionItem?.conditionValue || ""
  );
  const [inputText, setInputText] = useState<string>(
    currentConditionItem?.inputValue || ""
  );

  const [pathIndicator, setPathIndicator] = useState<string[]>([]);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const starCountRef = ref(database, "/data");
    const unsubscribe = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setDataJson(Object.values(data));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setInputText(currentConditionItem?.inputValue || "");
    setConditionText(currentConditionItem?.conditionValue || "");
  }, [currentCondition]);

  function valueInputHandle(value: string) {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setPathIndicator(value.split("."));
      dispatch(setInputValue(value));
    }, 500);
  }

  function valueConditionHandle(value: string) {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setConditionText(value);
      dispatch(setConditionValue(value));
    }, 500);
  }

  return (
    <>
      <div>{currentCondition}</div>
      if
      <TextField
        id="path-element-field"
        label="path of element"
        variant="outlined"
        onChange={(e) => {
          setInputText(e.target.value);
          valueInputHandle(e.target.value);
        }}
        value={inputText}
      />
      =
      <TextField
        id="condition-field"
        label="condition"
        variant="outlined"
        onChange={(e) => {
          setConditionText(e.target.value);
          valueConditionHandle(e.target.value);
        }}
        value={conditionText}
      />
      <ListItems array={dataJson}>
        {(item) => (
          <SingleWebhookData
            conditionValue={conditionText}
            pathIndicator={pathIndicator}
            key={item.id}
            singleJson={item}
          />
        )}
      </ListItems>
    </>
  );
}

export default CurrentData;
