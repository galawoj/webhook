import { ConditionItem } from "../store/conditions-slice";
import { AppDispatch } from "../store/store";

export type CondReq = {
  dispatch: AppDispatch;
  condition: number;
  currentRequest: ConditionItem["request"];
  mode: "condReq";
};
