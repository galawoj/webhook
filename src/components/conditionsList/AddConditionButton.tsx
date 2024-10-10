import { addConditionItem } from "../../store/conditions-slice";
import { useConditionsDispatch } from "../../store/hooks";

export default function AddConditionButton() {
  const dispatch = useConditionsDispatch();

  const addConditionHandler = () => {
    dispatch(addConditionItem());
  };

  return (
    <button
      style={{ backgroundColor: "rgb(186, 73, 73)" }}
      onClick={addConditionHandler}
    >
      add
    </button>
  );
}
