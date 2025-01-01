import { useAppDispatch, useAppSelector } from "../../store/hooks";
import elementFromObject from "../../utils/elementFromObject";
import { sendRequest } from "../../utils/sendRequest";

export default function SendAllCondRequestButton() {
  const allConditions = useAppSelector((state) => state.conditions.conditions);
  const firstResponse = useAppSelector((state) => state.firstRequest.response);
  const dispatch = useAppDispatch();

  const buttonHandler = async () => {
    try {
      for (const { conditionValue, inputValue, id, request } of allConditions) {
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
          await sendRequest(dispatch, id, request); // sendRequest is used instead of mutate()
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
      } else {
        console.error("Unknown error occurred.");
      }
    }
  };

  return (
    <button onClick={buttonHandler} style={{ background: "purple", margin: 5 }}>
      Send all valid conditions
    </button>
  );
}
