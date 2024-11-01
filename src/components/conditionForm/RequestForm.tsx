import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef, useState } from "react";
import {
  updateRequestBody,
  updateRequestHeader,
  updateRequestUrl,
} from "../../store/conditions-slice";

export default function RequestForm() {
  const dispatch = useAppDispatch();

  const currentConditionItem = useAppSelector((state) =>
    state.conditions.conditions.find(
      (item) => item.id === state.conditions.currentCondition
    )
  );

  const [requestBody, setRequestBody] = useState<string>(
    currentConditionItem?.request.body || ""
  );
  const [requestHeader_1, setRequestHeader_1] = useState<string>(
    currentConditionItem?.request.header_1 || ""
  );
  const [requestHeader_2, setRequestHeader_2] = useState<string>(
    currentConditionItem?.request.header_2 || ""
  );
  const [requestHeader_3, setRequestHeader_3] = useState<string>(
    currentConditionItem?.request.header_3 || ""
  );
  const [requestUrl, setRequestUrl] = useState<string>(
    currentConditionItem?.request.url || ""
  );

  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setRequestBody(currentConditionItem?.request.body || "");
    setRequestHeader_1(currentConditionItem?.request.header_1 || "");
    setRequestHeader_2(currentConditionItem?.request.header_2 || "");
    setRequestHeader_3(currentConditionItem?.request.header_3 || "");
    setRequestUrl(currentConditionItem?.request.url || "");
  }, [currentConditionItem]);

  function valueHandle(
    value: string,
    type: "url" | "header_1" | "header_2" | "header_3" | "body"
  ) {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (type === "url") {
      timer.current = setTimeout(() => {
        dispatch(updateRequestUrl(value));
      }, 500);
    }
    if (type === "header_1") {
      timer.current = setTimeout(() => {
        dispatch(updateRequestHeader({ header_1: value }));
      }, 500);
    }
    if (type === "header_2") {
      timer.current = setTimeout(() => {
        dispatch(updateRequestHeader({ header_2: value }));
      }, 500);
    }
    if (type === "header_3") {
      timer.current = setTimeout(() => {
        dispatch(updateRequestHeader({ header_3: value }));
      }, 500);
    }

    if (type === "body") {
      timer.current = setTimeout(() => {
        dispatch(updateRequestBody(value));
      }, 500);
    }
  }

  return (
    <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
      <header style={{ textAlign: "center", fontSize: "12pt" }}>
        <b>Your request</b>
      </header>
      <TextField
        id="request-url"
        label="url"
        variant="outlined"
        onChange={(e) => {
          setRequestUrl(e.target.value);
          valueHandle(e.target.value, "url");
        }}
        value={requestUrl}
        style={{ margin: 10 }}
      />
      <TextField
        id="request-header"
        label="header_1 (key:value)"
        variant="outlined"
        onChange={(e) => {
          setRequestHeader_1(e.target.value);
          valueHandle(e.target.value, "header_1");
        }}
        value={requestHeader_1}
        style={{ margin: 10 }}
      />
      <TextField
        id="request-header"
        label="header_2 (key:value)"
        variant="outlined"
        onChange={(e) => {
          setRequestHeader_2(e.target.value);
          valueHandle(e.target.value, "header_2");
        }}
        value={requestHeader_2}
        style={{ margin: 10 }}
      />
      <TextField
        id="request-header"
        label="header_3 (key:value)"
        variant="outlined"
        onChange={(e) => {
          setRequestHeader_3(e.target.value);
          valueHandle(e.target.value, "header_3");
        }}
        value={requestHeader_3}
        style={{ margin: 10 }}
      />
      <label htmlFor="request-body" style={{ textAlign: "center" }}>
        body
      </label>
      <textarea
        name="body"
        id="request-body"
        onChange={(e) => {
          setRequestBody(e.target.value);
          valueHandle(e.target.value, "body");
        }}
        value={requestBody}
        aria-label="body"
        style={{ margin: 10, resize: "none" }}
      ></textarea>
    </div>
  );
}
