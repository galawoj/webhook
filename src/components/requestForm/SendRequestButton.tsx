import { useRequestMutation } from "../../hooks/useReqestMutation";

export default function SendRequestButton({ mode }: { mode: boolean }) {
  const { mutate } = useRequestMutation(mode);

  return (
    <>
      <button onClick={() => mutate()} style={{ background: "purple" }}>
        Send
      </button>
    </>
  );
}
