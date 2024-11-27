import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef, useState } from "react";
import {
  updateCondRequestHeader,
  updateCondRequestUrl,
} from "../../store/conditions-slice";
import {
  updateFirstRequestHeader,
  updateFirstRequestUrl,
} from "../../store/firstRequest-slice";

type RequestTextField = {
  id: "url" | "header_1" | "header_2" | "header_3";
  type: "firstReq" | "condReq";
};

export default function RequestTextField({ id, type }: RequestTextField) {
  const dispatch = useAppDispatch();

  const selectRequest = () => {
    if (type === "condReq") {
      return useAppSelector(
        (state) =>
          state.conditions.conditions.find(
            (item) => item.id === state.conditions.currentCondition
          )?.request[id]
      );
    } else if (type === "firstReq") {
      useAppSelector((state) => state.firstRequest.request);
    }
  };

  const currentRequest = selectRequest();

  const [formState, setFormState] = useState(currentRequest);

  useEffect(() => {
    setFormState(currentRequest || "");
  }, [currentRequest]);

  const timers = useRef<NodeJS.Timeout | null>(null);

  function handleInputChange(value: string, id: RequestTextField["id"]) {
    setFormState(value);

    if (timers.current) {
      clearTimeout(timers.current!);
    }

    timers.current = setTimeout(() => {
      switch (id) {
        case "url":
          type === "condReq"
            ? dispatch(updateCondRequestUrl(value))
            : dispatch(updateFirstRequestUrl(value));
          break;
        case "header_1":
          type === "condReq"
            ? dispatch(updateCondRequestHeader({ header_1: value }))
            : dispatch(updateFirstRequestHeader({ header_1: value }));
          break;
        case "header_2":
          type === "condReq"
            ? dispatch(updateCondRequestHeader({ header_2: value }))
            : dispatch(updateFirstRequestHeader({ header_2: value }));
          break;
        case "header_3":
          type === "condReq"
            ? dispatch(updateCondRequestHeader({ header_3: value }))
            : dispatch(updateCondRequestHeader({ header_3: value }));
          break;
      }
    }, 500);
  }

  return (
    <TextField
      id={id}
      label={id + `${id !== "url" ? " (key:value)" : " (https://...)"}`}
      variant="outlined"
      onChange={(e) => handleInputChange(e.target.value, id)}
      value={formState}
      style={{ margin: " 10px " }}
    />
  );
}
