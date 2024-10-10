import { useConditionsSelector } from "../../store/hooks";
import ConditionButton from "./ConditionButton";

export default function ConditionsList() {
  const conditionsList = useConditionsSelector(
    (state) => state.conditions.conditions
  );

  return (
    <>
      {conditionsList.map((e) => (
        <ConditionButton key={e.id} id={e.id} />
      ))}
    </>
  );
}
