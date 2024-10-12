import {
  removeConditionItem,
  setCurrentCondition,
} from "../../store/conditions-slice";
import { useConditionsDispatch } from "../../store/hooks";

type ContiodionButtonType = {
  id: number;
};

export default function ConditionButton({ id }: ContiodionButtonType) {
  const dispatch = useConditionsDispatch();
  return (
    <div>
      <button onClick={() => dispatch(setCurrentCondition(id))}>
        condition {id}
      </button>
      <button onClick={() => dispatch(removeConditionItem(id))}>-</button>
    </div>
  );
}
