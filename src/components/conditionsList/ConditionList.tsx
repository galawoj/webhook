import ConditionButton from "./ConditionButton";
import AddConditionButton from "./AddConditionButton";
import ListItems from "../ListItems";
import { useAppSelector } from "../../store/hooks";

export default function ConditionsList() {
  const conditionsList = useAppSelector((state) => state.conditions.conditions);

  return (
    <>
      <ListItems array={conditionsList}>
        {(item) => <ConditionButton key={item.id} id={item.id} />}
      </ListItems>
      <AddConditionButton />
    </>
  );
}
