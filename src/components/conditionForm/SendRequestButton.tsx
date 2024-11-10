import { useRequestMutation } from "../../hooks/useReqestMutation";

export default function SendRequestButton() {
  const { mutate } = useRequestMutation();

  return (
    <>
      <button onClick={() => mutate()} style={{ background: "purple" }}>
        Send
      </button>
    </>
  );
}
