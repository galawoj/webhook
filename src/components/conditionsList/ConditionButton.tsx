import {
  removeConditionItem,
  setCurrentCondition,
} from "../../store/conditions-slice";
import { setFirstRequestActive } from "../../store/firstRequest-slice";
import { useAppDispatch } from "../../store/hooks";


type ContiodionButtonType = {
  id: number;
};

export default function ConditionButton({ id }: ContiodionButtonType) {
  const dispatch = useAppDispatch();

  const buttonHandler = () => {
    dispatch(setCurrentCondition(id));
    dispatch(setFirstRequestActive(false));
  };

  return (
    <div
      
      style={{ display: "flex", justifyContent: "space-around", margin: 2.5 }}
    >
      <button onClick={buttonHandler}>condition {id}</button>
      <button onClick={() => dispatch(removeConditionItem(id))}>-</button>
    </div>
  );
}
