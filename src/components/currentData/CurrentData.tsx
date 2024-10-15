import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import SingleWebhookData from "./SingleWebhookData";
import ListItems from "../ListItems";

import { setInputValue, setConditionValue } from "../../store/conditions-slice";

import TextField from "@mui/material/TextField";

function CurrentData() {
  const dispatch = useAppDispatch();

  const currentCondition = useAppSelector(
    (state) => state.conditions.currentCondition
  );

  const webhookData = useAppSelector((data) => data.webhookData.data);


  const currentConditionItem = useAppSelector((state) =>
    state.conditions.conditions.find((item) => item.id === currentCondition)
  );

  const [conditionText, setConditionText] = useState<string>(
    currentConditionItem?.conditionValue || ""
  );
  const [inputText, setInputText] = useState<string>(
    currentConditionItem?.inputValue || ""
  );

  const [pathIndicator, setPathIndicator] = useState<string[]>([]);
  const timer = useRef<NodeJS.Timeout | null>(null);

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
      <ul>
        <ListItems array={webhookData}>
          {(item) => (
            <li key={item.id}>
              <SingleWebhookData
                conditionValue={conditionText}
                pathIndicator={pathIndicator}
                singleJson={item}
              />
            </li>
          )}
        </ListItems>
      </ul>
    </>
  );
}

export default CurrentData;
