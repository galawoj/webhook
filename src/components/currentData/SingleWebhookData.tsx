import { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import elementFromObject from "../../utils/elementFromObject";

type SingleWebhookDataProps = {
  singleJson: any;
  pathIndicator: string[];
  conditionValue: string;
};

export default function SingleWebhookData({
  singleJson,
  pathIndicator,
  conditionValue,
}: SingleWebhookDataProps) {
  const [indicateElement, setIndicateElement] = useState<any>("");
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    setIndicateElement(elementFromObject(singleJson, pathIndicator));
  }, [pathIndicator]);

  return (
    <>
      <ReactJson
        displayObjectSize={false}
        iconStyle="square"
        displayDataTypes={false}
        collapsed={0}
        name={false}
        src={singleJson}
      
      />
      <span>{String(indicateElement)}</span>
      {String(indicateElement) === String(conditionValue) ? (
        <div>
          <b>valid!</b>
        </div>
      ) : (
        <div>
          <b>invalid</b>
        </div>
      )}
    </>
  );
}
