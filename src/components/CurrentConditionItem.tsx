import { useAppSelector } from "../store/hooks";

export default function CurrentConditionItem() {
  useAppSelector;
  const currentConditionItem = useAppSelector((state) =>
    state.conditions.conditions.find(
      (item) => item.id === state.conditions.currentCondition
    )
  );
  return (
    <div style={{ textAlign: "center", marginBottom: "15px" }}>
      Condition {currentConditionItem?.id}
    </div>
  );
}
