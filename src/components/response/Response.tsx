import ReactJson from "react-json-view";
import { useAppSelector } from "../../store/hooks";
import CurrentConditionItem from "../CurrentConditionItem";

export default function Response() {
  const currentRequestResponse = useAppSelector(
    (state) =>
      state.conditions.conditions.find(
        (e) => e.id === state.conditions.currentCondition
      )?.response
  );

  console.log(currentRequestResponse);
  return (
    <>
      <CurrentConditionItem />

      <header style={{ textAlign: "center", fontSize: "12pt" }}>
        <b>Response</b>
      </header>
      <ReactJson
        displayObjectSize={false}
        iconStyle="square"
        displayDataTypes={false}
        collapsed={0}
        name={false}
        src={currentRequestResponse || {}}
      />
    </>
  );
}
