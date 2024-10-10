import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { AppDispatch, RootState } from "./store";

type DispatchFunction = () => AppDispatch;

export const useConditionsDispatch: DispatchFunction = useDispatch;
export const useConditionsSelector: TypedUseSelectorHook<RootState> =
  useSelector;
