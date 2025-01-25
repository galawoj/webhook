import { setFirstRequestActive } from "../../store/firstRequest-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import SelectRequestMethod from "./SelectRequestMethod";
import RequestBody from "./RequestBody";
import RequestTextField from "./RequestTextField";

export default function RequestForm() {
  const dispatch = useAppDispatch();
  const isFirstReqActive = useAppSelector(
    (state) => state.firstRequest.isActive
  );

  return (
    <>
      <header style={{ textAlign: "center", fontSize: "12pt" }}>
        <b>{isFirstReqActive ? `Your First Request` : "Condition Request"}</b>
        {!isFirstReqActive && (
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
      <SelectRequestMethod />
      <RequestTextField id="url" />
      <RequestTextField id="header_1" />
      <RequestTextField id="header_2" />
      <RequestTextField id="header_3" />
      <RequestBody />
    </>
  );
}
