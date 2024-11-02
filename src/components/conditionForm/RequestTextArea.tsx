import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef, useState } from "react";
import { updateRequestBody } from "../../store/conditions-slice";

type propsType = {
  id: "body";
};

export default function RequestTextArea({ id }: propsType) {
  const dispatch = useAppDispatch();
  const currentConditionItem = useAppSelector((state) =>
    state.conditions.conditions.find(
      (item) => item.id === state.conditions.currentCondition
    )
  );

  const [formState, setFormState] = useState(currentConditionItem?.request[id]);

  useEffect(() => {
    setFormState(currentConditionItem?.request[id] || "");
  }, [currentConditionItem]);

  const timers = useRef<NodeJS.Timeout | null>(null);

  function handleInputChange(value: string, field: "body") {
    setFormState(value);

    if (timers.current) {
      clearTimeout(timers.current!);
    }

    timers.current = setTimeout(() => {
      switch (field) {
        case "body":
          dispatch(updateRequestBody(value));
          break;
      }
    }, 500);
  }

  return (
    <>
      <label
        htmlFor={id}
        style={{ textAlign: "center", margin: "10px auto", fontSize: "12pt" }}
      >
        <b>{id}</b>
      </label>
      <textarea
        id={id}
        onChange={(e) => handleInputChange(e.target.value, id)}
        value={formState}
        style={{
          resize: "none",
          minHeight: "100px",
          margin: "10px",
        }}
      ></textarea>
    </>
  );
}
