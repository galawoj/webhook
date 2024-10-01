import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig";
import TextField from "@mui/material/TextField";

import { useEffect, useRef, useState } from "react";
import ReactJson from "react-json-view";

function CurrentData() {
  const [dataJson, setDataJson] = useState<any>();
  const inputElement = useRef<HTMLInputElement>(null);
  const [indicateElement, setIndicateElement] = useState<any>("");
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const starCountRef = ref(database, "/data");
    const unsubscribe = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setDataJson(Object.values(data));
    });
    return () => unsubscribe();
  }, []);

  function objectElement(ob: any, path: string[]) {
    let element = ob;
    for (let e of path) {
      element = element[e];
    }

    setIndicateElement(element);
  }

  function valueInputHandle() {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      const inputText = inputElement.current!.value as string;
      let arrayTextElemens = inputText.split(".");

      objectElement(dataJson, arrayTextElemens);
    }, 500);
  }

  return (
    <>
      <TextField
        inputRef={inputElement}
        id="outlined-basic"
        label="path of element"
        variant="outlined"
        onChange={valueInputHandle}
      />

      {typeof indicateElement === "object" ? (
        <ReactJson
          displayObjectSize={false}
          iconStyle="square"
          displayDataTypes={false}
          collapsed={1}
          name={false}
          src={indicateElement}
        />
      ) : (
        <span>{String(indicateElement)}</span>
      )}
      <ul>
        {dataJson?.map((e: any) => (
          <li key={e.id}>
            <ReactJson
              displayObjectSize={false}
              iconStyle="square"
              displayDataTypes={false}
              collapsed={0}
              name={false}
              src={e}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CurrentData;
