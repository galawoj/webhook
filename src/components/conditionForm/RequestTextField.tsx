import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef, useState } from "react";
import {
  updateRequestHeader,
  updateRequestUrl,
} from "../../store/conditions-slice";

type Props = {
  id: "url" | "header_1" | "header_2" | "header_3";
};

export default function RequestTextField({ id }: Props) {
  const dispatch = useAppDispatch();
  const currentConditionItem = useAppSelector((state) =>
    state.conditions.conditions.find(
      (item) => item.id === state.conditions.currentCondition
    )
  );

  const [formState, setFormState] = useState(currentConditionItem?.request[id]);

  useEffect(() => {
    setFormState(currentConditionItem?.request[id] || "");
  }, [currentConditionItem]);

  const timers = useRef<NodeJS.Timeout | null>(null);

  function handleInputChange(value: string, { id }: Props) {
    setFormState(value);

    if (timers.current) {
      clearTimeout(timers.current!);
    }

    timers.current = setTimeout(() => {
      switch (id) {
        case "url":
          dispatch(updateRequestUrl(value));
          break;
        case "header_1":
          dispatch(updateRequestHeader({ header_1: value }));
          break;
        case "header_2":
          dispatch(updateRequestHeader({ header_2: value }));
          break;
        case "header_3":
          dispatch(updateRequestHeader({ header_3: value }));
          break;
      }
    }, 500);
  }

  return (
    <TextField
      id={id}
      label={id + `${id !== "url" ? " (key:value)" : " (https://...)"}`}
      variant="outlined"
      onChange={(e) => handleInputChange(e.target.value, { id })}
      value={formState}
      style={{ margin: " 10px " }}
    />
  );
}
