import { addConditionItem } from "../../store/conditions-slice";
import { useAppDispatch } from "../../store/hooks";

export default function AddConditionButton() {
  const dispatch = useAppDispatch();

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
