import { addConditionItem } from "../../store/conditions-slice";
import { setFirstRequestActive } from "../../store/firstRequest-slice";
import { useAppDispatch } from "../../store/hooks";
import style from "./conditionsList.module.css";

export default function AddConditionButton() {
  const dispatch = useAppDispatch();

  const addConditionHandler = () => {
    dispatch(addConditionItem());
    dispatch(setFirstRequestActive(false));
  };

  return (
    <button
      style={{ backgroundColor: "rgb(186, 73, 73)" }}
      className={style.all_buttons}
      onClick={addConditionHandler}
    >
      add
    </button>
  );
}
