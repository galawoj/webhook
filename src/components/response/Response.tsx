import ReactJson from "react-json-view";
import { useAppSelector } from "../../store/hooks";
import CurrentConditionItem from "../CurrentConditionItem";

export default function Response({ mode }: { mode: boolean }) {
  const selectResponse = () => {
    if (!mode) {
      return useAppSelector((state) =>
        state.conditions.conditions.find(
          (e) => e.id === state.conditions.currentCondition
        )
      )?.response;
    } else {
      return useAppSelector((state) => state.firstRequest.response);
    }
  };

  const currentRequestResponse = selectResponse();

  return (
    <>
      {!mode && <CurrentConditionItem />}

      <header style={{ textAlign: "center", fontSize: "12pt" }}>
        <b>{mode && "Your First"} Response</b>
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
