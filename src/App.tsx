import { ref, onValue } from "firebase/database";
import { database } from "./firebaseConfig";
import "./App.css";
import { useEffect, useState } from "react";
import ReactJson from "react-json-view";

function App() {
  const [dataJson, setDataJson] = useState<any>({});
  useEffect(() => {
    const starCountRef = ref(database, "/data");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setDataJson(data);
    });
  }, []);
  // const inputElement = useRef<HTMLInputElement>(null);
  // const [inputValue, setInputValue] = useState<string>("");

  // function valueInputHandle() {
  //   setInputValue(inputElement.current!.value as string);
  // }

  return (
    <>
      {/* <input ref={inputElement} type="text" onChange={valueInputHandle} /> */}
      {/* <div>{inputValue}</div> */}

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
