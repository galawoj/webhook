import ReactJson from "react-json-view";
import { useAppSelector } from "../../store/hooks";

export default function Response() {
  const requestResponse = useAppSelector(
    (state) => state.responseData.response
  );

  console.log(requestResponse);
  return (
    <>
      <header style={{ textAlign: "center", fontSize: "12pt" }}>
        <b>Response</b>
      </header>
      <ReactJson
        displayObjectSize={false}
        iconStyle="square"
        displayDataTypes={false}
        collapsed={0}
        name={false}
        src={requestResponse}
      />
    </>
  );
}
