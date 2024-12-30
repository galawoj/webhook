import { useAllRequestMutation } from "../../hooks/useAllCondRequestMutation";
import { useAppSelector } from "../../store/hooks";

export default function SendAllCondRequestButton() {
  const allConditions = useAppSelector((state) => state.conditions.conditions);

  function buttonHandler() {
    allConditions.forEach((condition) => {
      const { mutate } = useAllRequestMutation(condition.id);
      mutate();
    });
  }

  return (
    <>
      <button
        onClick={buttonHandler}
        style={{ background: "purple", margin: 5 }}
      >
        Send all valid conditions
      </button>
    </>
  );
}
