import ReactJson from "react-json-view";

type SingleWebhookDataProps = {
  singleJson: any;
};

export default function SingleWebhookData({
  singleJson,
}: SingleWebhookDataProps) {
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
    </>
  );
}
