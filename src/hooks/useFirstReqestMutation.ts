import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateFirstRequestResponse } from "../store/firstRequest-slice";

export const useFirstRequestMutation = () => {
  const dispatch = useAppDispatch();

  const currentRequest = useAppSelector((state) => state.firstRequest.request);

  const reg_k = /^[^:]+/;
  const reg = /(?<=:).*/;

  const h1_k = (currentRequest?.header_1?.match(reg_k) || [null])[0];
  const h1 = (currentRequest?.header_1?.match(reg) || [null])[0];

  const header1 = h1_k === null ? "" : { [h1_k]: h1 };

  const h2_k = (currentRequest?.header_2?.match(reg_k) || [null])[0];
  const h2 = (currentRequest?.header_2?.match(reg) || [null])[0];

  const header2 = h2_k === null ? "" : { [h2_k]: h2 };

  const h3_k = (currentRequest?.header_3?.match(reg_k) || [null])[0];
  const h3 = (currentRequest?.header_3?.match(reg) || [null])[0];

  const header3 = h3_k === null ? "" : { [h3_k]: h3 };

  const headers = {
    "Content-Type": "application/json",
    ...header1,
    ...header2,
    ...header3,
  };

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${currentRequest?.url}`, {
        method: "POST",
        headers,

        body: JSON.stringify(currentRequest?.body),
      });

      if (!response.ok) {
        throw new Error("Failed to send request");
      }

      return await response.json();
    },
    onSuccess: (responseData) => {
      dispatch(updateFirstRequestResponse(responseData));
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};
