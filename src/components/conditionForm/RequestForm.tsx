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
  const [requestHeader, setRequestHeader] = useState<string>(
    currentConditionItem?.request.header || ""
  );
  const [requestUrl, setRequestUrl] = useState<string>(
    currentConditionItem?.request.header || ""
  );

  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setRequestBody(currentConditionItem?.request.body || "");
    setRequestHeader(currentConditionItem?.request.header || "");
    setRequestUrl(currentConditionItem?.request.url || "");
  }, [currentConditionItem]);

  function urlValueHandle(value: string) {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      dispatch(updateRequestUrl(value));
    }, 500);
  }

  function headerValueHandle(value: string) {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      dispatch(updateRequestHeader(value));
    }, 500);
  }

  function bodyValueHandle(value: string) {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      dispatch(updateRequestBody(value));
    }, 500);
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
          urlValueHandle(e.target.value);
        }}
        value={requestUrl}
        style={{ margin: 10 }}
      />
      <TextField
        id="request-header"
        label="header"
        variant="outlined"
        onChange={(e) => {
          setRequestHeader(e.target.value);
          headerValueHandle(e.target.value);
        }}
        value={requestHeader}
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
          bodyValueHandle(e.target.value);
        }}
        value={requestBody}
        aria-label="body"
        style={{ margin: 10, resize: "none" }}
      ></textarea>

      {/* <TextField
        id="request-body"
        label="body"
        variant="outlined"
        onChange={(e) => {
          setRequestBody(e.target.value);
          bodyValueHandle(e.target.value);
        }}
        value={requestBody}
      /> */}
    </div>
  );
}
