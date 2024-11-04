import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import elementFromObject from "../../utils/elementFromObject";

export default function SendRequest() {
  // Pobranie aktualnych danych
  const currentRequest = useAppSelector((state) =>
    state.conditions.conditions.find(
      (item) => item.id === state.conditions.currentCondition
    )
  )?.request;

  const webhookData = useAppSelector((state) => state.webhookData.data);

  const reg = /{{(.*?)}}/g;

  const replaceBodyContent = currentRequest?.body.replace(reg, (element) => {
    const path = element.slice(2, -2).split(".");

    return (
      elementFromObject(webhookData[webhookData.length - 1], path) ||
      "undefined"
    );
  });

  // const h1_k = (currentRequest?.header_1?.match(/^[^:]+/) || [""])[0];
  // const h1 = (currentRequest?.header_1?.match(/(?<=: ).*/) || [""])[0];

  // const h2_k = (currentRequest?.header_2?.match(/^[^:]+/) || [""])[0];
  // const h2 = (currentRequest?.header_2?.match(/(?<=: ).*/) || [""])[0];

  // const h3_k = (currentRequest?.header_3?.match(/^[^:]+/) || [""])[0];
  // const h3 = (currentRequest?.header_3?.match(/(?<=: ).*/) || [""])[0];

  const { mutate } = useMutation({
    mutationFn: () =>
      fetch(`${currentRequest?.url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // [h1_k]: h1,
          // [h2_k]: h2,
          // [h3_k]: h3,
        },
        body: JSON.stringify({ data: currentRequest?.body }),
      }),
  });

  // const { data, refetch } = useQuery({
  //   queryFn: () => fetch(`${currentRequest?.url}`).then((res) => res.json()),
  //   queryKey: ["responseData"],
  //   enabled: false,
  // });
  // console.log(data);

  return (
    <>
      <div style={{ whiteSpace: "pre-line" }}>
        <div>Your request: {"{"}</div>
        <br />
        <div style={{ paddingLeft: "20px" }}>
          <strong>headers:</strong> {"{"}
          <div style={{ paddingLeft: "20px" }}>
            <div>{currentRequest?.header_1 || ""}</div>
            <div>{currentRequest?.header_2 || ""}</div>
            <div>{currentRequest?.header_3 || ""}</div>
          </div>
          {"}"}
        </div>
        <br />
        <div style={{ paddingLeft: "20px" }}>
          <strong>body:</strong> {"{"}
          <div style={{ paddingLeft: "20px" }}>
            <div>{replaceBodyContent || ""}</div>
          </div>
          {"}"}
        </div>
        {"}"}
      </div>
      <button onClick={() => mutate()} style={{ background: "purple" }}>
        Send
      </button>
    </>
  );
}
