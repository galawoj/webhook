import ReactJson from "react-json-view";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateCondRequestBody } from "../../store/conditions-slice";
import elementFromObject from "../../utils/elementFromObject";
import replaceValueInObject from "../../utils/replaceValueInObject";

type RequestBody = {
  [key: string]: any;
};

type RequestBodyProps = {
  type: "firstReq" | "condReq";
};

export default function RequestBody({ type }: RequestBodyProps) {
  const selectRequest = () => {
    if (type === "condReq") {
      return useAppSelector((state) =>
        state.conditions.conditions.find(
          (e) => e.id === state.conditions.currentCondition
        )
      )?.request.body;
    } else if (type === "firstReq") {
      useAppSelector((state) => state.firstRequest.request.body);
    }
  };

  const currentRequestBody = selectRequest() as RequestBody;

  const dispatch = useAppDispatch();

  const webhookData = useAppSelector((state) => state.webhookData.data);

  function onJsonChange(data: any) {
    if (typeof data.new_value === "string") {
      const reg = /{{(.*?)}}/g;
      const replaceValue = data.new_value.replace(reg, (element: string) => {
        const path = element.slice(2, -2).split(".");

        return (
          elementFromObject(webhookData[webhookData.length - 1], path) ||
          "undefined"
        );
      });
      const updatedBody =
        replaceValue !== data.new_value
          ? replaceValueInObject(data.updated_src, data.new_value, replaceValue)
          : data.updated_src;

      dispatch(updateCondRequestBody(updatedBody));
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
        src={currentRequestBody || {}}
      />
    </>
  );
}
