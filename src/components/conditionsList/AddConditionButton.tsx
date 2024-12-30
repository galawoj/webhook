import { addConditionItem } from "../../store/conditions-slice";
import { setFirstRequestActive } from "../../store/firstRequest-slice";
import { useAppDispatch } from "../../store/hooks";

export default function AddConditionButton() {
  const dispatch = useAppDispatch();

  const addConditionHandler = () => {
    dispatch(addConditionItem());
    dispatch(setFirstRequestActive(false));
  };

  return (
    <button
      style={{ backgroundColor: "rgb(186, 73, 73)", margin: 5 }}
      onClick={addConditionHandler}
    >
      add
    </button>
  );
}
