import { ref, onValue } from "firebase/database";
import { database } from "../../firebaseConfig";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import SingleWebhookData from "./SingleWebhookData";
import { useConditionsSelector } from "../../store/hooks";
import ListItems from "../ListItems";

function CurrentData() {
  const currentCondition = useConditionsSelector(
    (state) => state.conditions.currentCondition
  );
  const [dataJson, setDataJson] = useState<any>();
  const inputElement = useRef<HTMLInputElement>(null);
  const conditionElement = useRef<HTMLInputElement>(null);
  const [conditionText, setConditionText] = useState<string>("");

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

  function valueInputHandle() {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      const inputText = inputElement.current!.value as string;
      let arrayTextElemens = inputText.split(".");

      setPathIndicator(arrayTextElemens);
    }, 500);
  }

  function conditionHandle() {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      const inputText = conditionElement.current!.value as string;

      setConditionText(inputText);
    }, 500);
  }

  return (
    <>
      <div>{currentCondition}</div>
      if
      <TextField
        inputRef={inputElement}
        id="outlined-basic"
        label="path of element"
        variant="outlined"
        onChange={valueInputHandle}
      />
      =
      <TextField
        inputRef={conditionElement}
        id="outlined-basic"
        label="condition"
        variant="outlined"
        onChange={conditionHandle}
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
