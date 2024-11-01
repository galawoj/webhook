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

  // Stan formularza dla każdego pola
  const [formState, setFormState] = useState({
    requestBody: currentConditionItem?.request.body || "",
    requestHeader_1: currentConditionItem?.request.header_1 || "",
    requestHeader_2: currentConditionItem?.request.header_2 || "",
    requestHeader_3: currentConditionItem?.request.header_3 || "",
    requestUrl: currentConditionItem?.request.url || "",
  });

  // Jeden obiekt do przechowywania timerów dla każdego pola
  const timers = useRef<{ [key: string]: NodeJS.Timeout | null }>({
    requestBody: null,
    requestHeader_1: null,
    requestHeader_2: null,
    requestHeader_3: null,
    requestUrl: null,
  });

  useEffect(() => {
    setFormState({
      requestBody: currentConditionItem?.request.body || "",
      requestHeader_1: currentConditionItem?.request.header_1 || "",
      requestHeader_2: currentConditionItem?.request.header_2 || "",
      requestHeader_3: currentConditionItem?.request.header_3 || "",
      requestUrl: currentConditionItem?.request.url || "",
    });
  }, [currentConditionItem]);

  function handleInputChange(
    value: string,
    field:
      | "requestUrl"
      | "requestHeader_1"
      | "requestHeader_2"
      | "requestHeader_3"
      | "requestBody"
  ) {
    // Aktualizacja stanu formularza dla natychmiastowego renderu
    setFormState((prevState) => ({ ...prevState, [field]: value }));

    // Kasowanie istniejącego timera dla konkretnego pola
    if (timers.current[field]) {
      clearTimeout(timers.current[field]!);
    }

    // Ustawianie nowego timera dla konkretnego pola
    timers.current[field] = setTimeout(() => {
      switch (field) {
        case "requestUrl":
          dispatch(updateRequestUrl(value));
          break;
        case "requestHeader_1":
          dispatch(updateRequestHeader({ header_1: value }));
          break;
        case "requestHeader_2":
          dispatch(updateRequestHeader({ header_2: value }));
          break;
        case "requestHeader_3":
          dispatch(updateRequestHeader({ header_3: value }));
          break;
        case "requestBody":
          dispatch(updateRequestBody(value));
          break;
      }
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
        onChange={(e) => handleInputChange(e.target.value, "requestUrl")}
        value={formState.requestUrl}
        style={{ margin: 10 }}
      />
      <TextField
        id="request-header"
        label="header_1 (key:value)"
        variant="outlined"
        onChange={(e) => handleInputChange(e.target.value, "requestHeader_1")}
        value={formState.requestHeader_1}
        style={{ margin: 10 }}
      />
      <TextField
        id="request-header-2"
        label="header_2 (key:value)"
        variant="outlined"
        onChange={(e) => handleInputChange(e.target.value, "requestHeader_2")}
        value={formState.requestHeader_2}
        style={{ margin: 10 }}
      />
      <TextField
        id="request-header-3"
        label="header_3 (key:value)"
        variant="outlined"
        onChange={(e) => handleInputChange(e.target.value, "requestHeader_3")}
        value={formState.requestHeader_3}
        style={{ margin: 10 }}
      />
      <label
        htmlFor="request-body"
        style={{ textAlign: "center", margin: "10px 0" }}
      >
        Body
      </label>
      <textarea
        id="request-body"
        onChange={(e) => handleInputChange(e.target.value, "requestBody")}
        value={formState.requestBody}
        style={{
          margin: 10,
          resize: "none",
          width: "100%",
          minHeight: "100px",
        }}
      ></textarea>
    </div>
  );
}
