import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  updateInputValue,
  updateConditionValue,
} from "../../store/conditions-slice";
import TextField from "@mui/material/TextField";
import CurrentConditionItem from "../CurrentConditionItem";

export default function ConditionForm() {
  const dispatch = useAppDispatch();

  const currentConditionItem = useAppSelector((state) =>
    state.conditions.conditions.find(
      (item) => item.id === state.conditions.currentCondition
    )
  );

  const [path, setPath] = useState<string>(
    currentConditionItem?.conditionValue || ""
  );
  const [value, setValue] = useState<string>(
    currentConditionItem?.inputValue || ""
  );

  const timerPath = useRef<NodeJS.Timeout | null>(null);

  const timerValue = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setPath(currentConditionItem?.inputValue || "");
    setValue(currentConditionItem?.conditionValue || "");
  }, [currentConditionItem]);

  function pathHandle(value: string) {
    if (timerPath.current) {
      clearTimeout(timerPath.current);
    }

    timerPath.current = setTimeout(() => {
      dispatch(updateInputValue(value));
    }, 500);
  }

  function valueHandle(value: string) {
    if (timerValue.current) {
      clearTimeout(timerValue.current);
    }

    timerValue.current = setTimeout(() => {
      dispatch(updateConditionValue(value));
    }, 500);
  }
  console.log(currentConditionItem?.isValid);
  return (
    <>
      <CurrentConditionItem />
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
            setPath(e.target.value);
            pathHandle(e.target.value);
          }}
          value={path}
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
            setValue(e.target.value);
            valueHandle(e.target.value);
          }}
          value={value}
        />
      </div>
    </>
  );
}
