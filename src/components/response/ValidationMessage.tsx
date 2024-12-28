import { useEffect, useState } from "react";

import elementFromObject from "../../utils/elementFromObject";

type ValidationMessage = {
  singleJson: any;
  pathIndicator: string[];
  conditionValue: string;
};

export default function ValidationMessage({
  singleJson,
  pathIndicator,
  conditionValue,
}: ValidationMessage) {
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
