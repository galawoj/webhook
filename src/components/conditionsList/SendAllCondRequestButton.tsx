import { useAppDispatch, useAppSelector } from "../../store/hooks";
import elementFromObject from "../../utils/elementFromObject";
import { sendRequest } from "../../api/sendRequest";
import { CondReq } from "../../types/condReq";
import style from "./conditionsList.module.css";
import { useState } from "react";

export default function SendAllCondRequestButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
          await sendRequest<CondReq>({
            dispatch,
            condition: id,
            currentRequest: request,
            mode: "condReq",
          });
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
      } else {
        console.error("Unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={buttonHandler}
      style={{ background: "purple" }}
      className={style.all_buttons}
    >
      {!isLoading ? (
        "Send all valid conditions"
      ) : (
        <div className={style.loader}></div>
      )}
    </button>
  );
}
