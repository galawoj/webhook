import { FirstRequestState } from "../store/firstRequest-slice";
import { AppDispatch } from "../store/store";

export type FirstReq = {
  dispatch: AppDispatch;
  currentRequest: FirstRequestState["request"];
  mode: "firstReq";
};
