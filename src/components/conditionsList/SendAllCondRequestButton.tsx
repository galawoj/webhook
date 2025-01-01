import { useAllRequestMutation } from "../../hooks/useAllCondRequestMutation";
import { useAppSelector } from "../../store/hooks";
import elementFromObject from "../../utils/elementFromObject";

export default function SendAllCondRequestButton() {
  const allConditions = useAppSelector((state) => state.conditions.conditions);
  const firstResponse = useAppSelector((state) => state.firstRequest.response);

  function buttonHandler() {
    allConditions.forEach(({ conditionValue, inputValue, id }) => {
      const extractedValue = elementFromObject(
        firstResponse,
        inputValue.split(".")
      );

      if (
        conditionValue &&
        inputValue &&
        extractedValue === String(conditionValue)
      ) {
        console.log(id);
        const { mutate } = useAllRequestMutation(id);
        mutate();
      }
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
