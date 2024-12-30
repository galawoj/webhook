import { setFirstRequestActive } from "../../store/firstRequest-slice";
import { useAppDispatch } from "../../store/hooks";
import RequestBody from "./RequestBody";
import RequestTextField from "./RequestTextField";

export default function RequestForm({ mode }: { mode: boolean }) {
  const dispatch = useAppDispatch();

  return (
    <>
      <header style={{ textAlign: "center", fontSize: "12pt" }}>
        <b>{mode ? `Your First Request` : "Condition Request"}</b>
        {!mode && (
          <button
            style={{ margin: "10px" }}
            onClick={() => {
              dispatch(setFirstRequestActive(true));
            }}
          >
            X
          </button>
        )}
      </header>
      <RequestTextField type={mode ? "firstReq" : "condReq"} id="url" />
      <RequestTextField type={mode ? "firstReq" : "condReq"} id="header_1" />
      <RequestTextField type={mode ? "firstReq" : "condReq"} id="header_2" />
      <RequestTextField type={mode ? "firstReq" : "condReq"} id="header_3" />
      <RequestBody type={mode ? "firstReq" : "condReq"} />
    </>
  );
}
