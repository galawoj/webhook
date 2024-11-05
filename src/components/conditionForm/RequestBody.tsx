import ReactJson from "react-json-view";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateRequestBody } from "../../store/conditions-slice";
import elementFromObject from "../../utils/elementFromObject";

type RequestBody = {
  [key: string]: any; // lub zdefiniowane właściwości, np. field1: string;
};

export default function RequestBody() {
  const requestBody = useAppSelector((state) =>
    state.conditions.conditions.find(
      (e) => e.id === state.conditions.currentCondition
    )
  )?.request.body as RequestBody;

  const dispatch = useAppDispatch();

  const webhookData = useAppSelector((state) => state.webhookData.data);

  function onJsonChange(data: any) {
    const reg = /{{(.*?)}}/g;
    if (typeof data.new_value === "string") {
      const replaceValue = data.new_value.replace(reg, (element: string) => {
        const path = element.slice(2, -2).split(".");

        return (
          elementFromObject(webhookData[webhookData.length - 1], path) ||
          "undefined"
        );
      });
      if (replaceValue) {
        data.new_value = replaceValue;

        const newReqBody = { ...requestBody };

        const key = data.name as keyof RequestBody;

        newReqBody[key] = replaceValue;

        dispatch(updateRequestBody({ ...newReqBody }));
      }
    } else {
      dispatch(updateRequestBody(data.updated_src));
    }
  }

  return (
    <>
      <b style={{ textAlign: "center" }}>body</b>
      <ReactJson
        displayObjectSize={false}
        iconStyle="square"
        displayDataTypes={false}
        collapsed={0}
        name={false}
        onEdit={(data) => onJsonChange(data)}
        onAdd={(data) => onJsonChange(data)}
        onDelete={(data) => onJsonChange(data)}
        src={requestBody || {}}
      />
    </>
  );
}
