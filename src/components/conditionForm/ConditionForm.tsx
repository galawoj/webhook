import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  updateInputValue,
  updateConditionValue,
} from "../../store/conditions-slice";
import TextField from "@mui/material/TextField";

export default function ConditionForm() {
  const dispatch = useAppDispatch();

  const currentConditionItem = useAppSelector((state) =>
    state.conditions.conditions.find(
      (item) => item.id === state.conditions.currentCondition
    )
  );

  const [conditionText, setConditionText] = useState<string>(
    currentConditionItem?.conditionValue || ""
  );
  const [inputText, setInputText] = useState<string>(
    currentConditionItem?.inputValue || ""
  );

  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputText(currentConditionItem?.inputValue || "");
    setConditionText(currentConditionItem?.conditionValue || "");
  }, [currentConditionItem]);

  function valueInputHandle(value: string) {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      dispatch(updateInputValue(value));
    }, 500);
  }

  function valueConditionHandle(value: string) {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      dispatch(updateConditionValue(value));
    }, 500);
  }

  return (
    <>
      <div>{currentConditionItem?.id}</div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12pt",
          }}
        >
          If
        </div>
        <TextField
          id="path-element-field"
          label="path"
          variant="outlined"
          onChange={(e) => {
            setInputText(e.target.value);
            valueInputHandle(e.target.value);
          }}
          value={inputText}
        />
        <div
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12pt",
          }}
        >
          =
        </div>
        <TextField
          id="value-field"
          label="value"
          variant="outlined"
          onChange={(e) => {
            setConditionText(e.target.value);
            valueConditionHandle(e.target.value);
          }}
          value={conditionText}
        />
      </div>
    </>
  );
}
