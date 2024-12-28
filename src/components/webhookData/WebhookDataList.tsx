import { useAppSelector } from "../../store/hooks";

import SingleWebhookData from "./SingleWebhookData";
import ListItems from "../ListItems";

function WebhookDataList() {
  const webhookData = useAppSelector((data) => data.webhookData.data);

  return (
    <>
      <header style={{ textAlign: "center", fontSize: "12pt" }}>
        <b>Webhooks</b>
      </header>
      <ul>
        <ListItems array={webhookData}>
          {(item) => (
            <li key={item.id}>
              <SingleWebhookData singleJson={item} />
            </li>
          )}
        </ListItems>
      </ul>
    </>
  );
}

export default WebhookDataList;
