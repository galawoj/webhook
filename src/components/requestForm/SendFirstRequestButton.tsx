import { sendRequest } from "../../api/sendRequest";
import { FirstReq } from "../../types/firstReq";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function SendFirstRequestButton() {
  const firstRequest = useAppSelector((state) => state.firstRequest.request);
  const dispatch = useAppDispatch();

  const buttonHandler = async () => {
    try {
      await sendRequest<FirstReq>({
        dispatch,
        currentRequest: firstRequest,
        mode: "firstReq",
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
      } else {
        console.error("Unknown error occurred.");
      }
    }
  };

  return (
    <>
      <button onClick={buttonHandler} style={{ background: "purple" }}>
        Send
      </button>
    </>
  );
}
