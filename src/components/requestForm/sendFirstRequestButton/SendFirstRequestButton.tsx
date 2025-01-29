import { sendRequest } from "../../../api/sendRequest";
import { FirstReq } from "../../../types/firstReq";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useState } from "react";
import style from "./sendFirstRequestButton.module.css";

export default function SendFirstRequestButton() {
  const firstRequest = useAppSelector((state) => state.firstRequest.request);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const buttonHandler = async () => {
    setIsLoading(true);
    try {
      await sendRequest<FirstReq>({
        dispatch,
        currentRequest: firstRequest,
        mode: "firstReq",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={buttonHandler} className={style.button}>
        {!isLoading ? "Send" : <div className={style.loader}></div>}
      </button>
    </>
  );
}
