import { ref, onValue } from "firebase/database";
import { database } from "./firebaseConfig";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import ReactJson from "react-json-view";

function App() {
  const [dataJson, setDataJson] = useState<any>();
  useEffect(() => {
    const starCountRef = ref(database, "/data");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setDataJson(Object.values(data));
    });
  }, []);
  const inputElement = useRef<HTMLInputElement>(null);
  const [indicateElement, setIndicateElement] = useState<any>("");

  function objectElement(ob: any, path: string[]) {
    let element = ob;
    for (let e of path) {
      element = element[e];
    }

    setIndicateElement(element);
  }

  function valueInputHandle() {
    const inputText = inputElement.current!.value as string;
    let arrayTextElemens = inputText.split(".");

    objectElement(dataJson, arrayTextElemens);
  }

  return (
    <>
      <input ref={inputElement} type="text" onChange={valueInputHandle} />

      {typeof indicateElement === "object" ? (
        <ReactJson
          displayObjectSize={false}
          iconStyle="square"
          displayDataTypes={false}
          name={false}
          src={indicateElement}
        />
      ) : (
        <span>{String(indicateElement)}</span>
      )}

      <ReactJson
        displayObjectSize={false}
        iconStyle="square"
        displayDataTypes={false}
        collapsed={1}
        name={false}
        src={dataJson}
      />
    </>
  );
}

export default App;
