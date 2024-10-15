import {
  removeConditionItem,
  setCurrentCondition,
} from "../../store/conditions-slice";
import { useAppDispatch } from "../../store/hooks";

type ContiodionButtonType = {
  id: number;
};

export default function ConditionButton({ id }: ContiodionButtonType) {
  const dispatch = useAppDispatch();
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <button onClick={() => dispatch(setCurrentCondition(id))}>
        condition {id}
      </button>
      <button onClick={() => dispatch(removeConditionItem(id))}>-</button>
    </div>
  );
}
