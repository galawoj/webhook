import { useMemo } from "react";

import elementFromObject from "../../utils/elementFromObject";
// import { useAppDispatch } from "../../store/hooks";
// import { updateValidation } from "../../store/conditions-slice";

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
  // const dispatch = useAppDispatch();

  const extractedValue = useMemo(() => {
    const value = elementFromObject(singleJson, pathIndicator);
    return value !== undefined ? String(value) : "undefined";
  }, [singleJson, pathIndicator]);

  const isValidCondition = extractedValue === String(conditionValue);

  // useEffect(() => {
  //   dispatch(updateValidation(isValidCondition));
  // }, [isValidCondition]);

  return (
    <>
      <span>{extractedValue}</span>
      {isValidCondition ? (
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
