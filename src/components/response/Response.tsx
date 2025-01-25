import ReactJson from "react-json-view";
import { useAppSelector } from "../../store/hooks";
import CurrentConditionItem from "../CurrentConditionItem";
import ValidationMessage from "./ValidationMessage";

export default function Response({ mode }: { mode: "firstReq" | "condReq" }) {
  const selectResponse = () => {
    if (mode === "condReq") {
      return useAppSelector((state) =>
        state.conditions.conditions.find(
          (e) => e.id === state.conditions.currentCondition
        )
      )?.response;
    } else if (mode === "firstReq") {
      return useAppSelector((state) => state.firstRequest.response);
    }
  };

  const currentRequestResponse = selectResponse();

  const currentConditionItem = useAppSelector((state) =>
    state.conditions.conditions.find(
      (item) => item.id === state.conditions.currentCondition
    )
  );

  const firstOrCondReq = useAppSelector((state) => state.firstRequest.isActive);

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
      {!firstOrCondReq && mode && (
        <ValidationMessage
          singleJson={currentRequestResponse}
          conditionValue={currentConditionItem!.conditionValue}
          pathIndicator={currentConditionItem!.inputValue.split(".")}
        />
      )}
    </>
  );
}
