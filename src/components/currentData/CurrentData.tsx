import { useAppSelector } from "../../store/hooks";

import SingleWebhookData from "./SingleWebhookData";
import ListItems from "../ListItems";

function CurrentData() {
  const webhookData = useAppSelector((data) => data.webhookData.data);

  const currentConditionItem = useAppSelector((state) =>
    state.conditions.conditions.find(
      (item) => item.id === state.conditions.currentCondition
    )
  );

  return (
    <>
      <div>{currentConditionItem?.id}</div>
      <header style={{ textAlign: "center", fontSize: "12pt" }}>
        <b>Webhooks</b>
      </header>
      <ul>
        <ListItems array={webhookData}>
          {(item) => (
            <li key={item.id}>
              <SingleWebhookData
                conditionValue={currentConditionItem!.conditionValue}
                pathIndicator={currentConditionItem!.inputValue.split(".")}
                singleJson={item}
              />
            </li>
          )}
        </ListItems>
      </ul>
    </>
  );
}

export default CurrentData;
