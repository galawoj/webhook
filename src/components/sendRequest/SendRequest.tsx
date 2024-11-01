import { useAppSelector } from "../../store/hooks";
import elementFromObject from "../../utils/elementFromObject";

export default function SendRequest() {
  // Pobranie aktualnych danych
  const currentConditionItem = useAppSelector((state) =>
    state.conditions.conditions.find(
      (item) => item.id === state.conditions.currentCondition
    )
  );

  const webhookData = useAppSelector((state) => state.webhookData.data);

  const currentRequest = currentConditionItem?.request;

  const bodyContent = currentRequest?.body;
  const reg = /{{(.*?)}}/g;

  const replaceBodyContent = bodyContent?.replace(reg, (element) => {
    const path = element.slice(2, -2).split(".");

    return (
      elementFromObject(webhookData[webhookData.length - 1], path) ||
      "undefined"
    );
  });

  return (
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
  );
}
