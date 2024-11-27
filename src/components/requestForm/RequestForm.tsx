import { useAppSelector } from "../../store/hooks";
import RequestBody from "./RequestBody";
import RequestTextField from "./RequestTextField";

export default function RequestForm() {
  const firstOrCondReq = useAppSelector((state) => state.firstRequest.isActive);
  return (
    <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
      <header style={{ textAlign: "center", fontSize: "12pt" }}>
        <b>{firstOrCondReq ? "your first request" : "cond request"}</b>
      </header>
      <RequestTextField
        type={firstOrCondReq ? "condReq" : "condReq"}
        id="url"
      />
      <RequestTextField
        type={firstOrCondReq ? "condReq" : "condReq"}
        id="header_1"
      />
      <RequestTextField
        type={firstOrCondReq ? "condReq" : "condReq"}
        id="header_2"
      />
      <RequestTextField
        type={firstOrCondReq ? "condReq" : "condReq"}
        id="header_3"
      />
      <RequestBody type={firstOrCondReq ? "condReq" : "condReq"} />
    </div>
  );
}
