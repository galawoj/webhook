import RequestTextField from "./RequestTextField";
import RequestTextArea from "./RequestTextArea";

export default function RequestForm() {
  return (
    <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
      <header style={{ textAlign: "center", fontSize: "12pt" }}>
        <b>Your request</b>
      </header>

      <RequestTextField id="url" />
      <RequestTextField id="header_1" />
      <RequestTextField id="header_2" />
      <RequestTextField id="header_3" />

      <RequestTextArea id="body" />
    </div>
  );
}
