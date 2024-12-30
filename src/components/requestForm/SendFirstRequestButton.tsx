import { useFirstRequestMutation } from "../../hooks/useFirstReqestMutation";

export default function SendFirstRequestButton() {
  const { mutate } = useFirstRequestMutation();

  return (
    <>
      <button onClick={() => mutate()} style={{ background: "purple" }}>
        Send
      </button>
    </>
  );
}
