import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateResponseData } from "../../store/responseData-slice";

export default function SendRequest() {
  const dispatch = useAppDispatch();

  const currentRequest = useAppSelector((state) =>
    state.conditions.conditions.find(
      (item) => item.id === state.conditions.currentCondition
    )
  )?.request;

  const h1_k = (currentRequest?.header_1?.match(/^[^:]+/) || [""])[0];
  const h1 = (currentRequest?.header_1?.match(/(?<=:).*/) || [""])[0];

  const h2_k = (currentRequest?.header_2?.match(/^[^:]+/) || [""])[0];
  const h2 = (currentRequest?.header_2?.match(/(?<=:).*/) || [""])[0];

  const h3_k = (currentRequest?.header_3?.match(/^[^:]+/) || [""])[0];
  const h3 = (currentRequest?.header_3?.match(/(?<=:).*/) || [""])[0];

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${currentRequest?.url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [h1_k]: h1,
          [h2_k]: h2,
          [h3_k]: h3,
        },
        body: JSON.stringify(currentRequest?.body),
      });

      if (!response.ok) {
        throw new Error("Failed to send request");
      }

      // Zwracamy dane JSON, aby uniknąć wielokrotnego odczytywania strumienia
      return await response.json();
    },
    onSuccess: (responseData) => {
      // `responseData` jest już obiektem JSON
      dispatch(updateResponseData(responseData));
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
  return (
    <>
      <button onClick={() => mutate()} style={{ background: "purple" }}>
        Send
      </button>
    </>
  );
}
