import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestMethod } from "../types/requestMethod";

export type FirstRequestState = {
  request: {
    method: RequestMethod;
    url: string;
    header_1: string;
    header_2: string;
    header_3: string;
    body: {};
  };
  response: {};
  isActive: boolean;
  errorMessage: string;
};

const initialState: FirstRequestState = {
  request: {
    method: "POST",
    url: "",
    header_1: "",
    header_2: "",
    header_3: "",
    body: {},
  },
  response: {},
  isActive: true,
  errorMessage: "",
};

export const firstRequestSlice = createSlice({
  name: "firstRequest",
  initialState,
  reducers: {
    setFirstRequestRequestMethod(state, action: PayloadAction<"POST" | "GET">) {
      state.request.method = action.payload;
    },
    updateFirstRequestHeader(
      state,
      action: PayloadAction<
        { header_1: string } | { header_2: string } | { header_3: string }
      >
    ) {
      state.request = { ...state.request, ...action.payload };
    },
    updateFirstRequestBody(state, action: PayloadAction<{}>) {
      state.request = { ...state.request, body: action.payload };
    },
    updateFirstRequestUrl(state, action: PayloadAction<string>) {
      state.request = { ...state.request, url: action.payload };
    },
    setFirstRequestActive(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
    updateFirstRequestResponse(state, action: PayloadAction<any>) {
      state.response = { ...action.payload };
    },
  },
});

export const {
  setFirstRequestRequestMethod,
  updateFirstRequestHeader,
  updateFirstRequestBody,
  updateFirstRequestUrl,
  setFirstRequestActive,
  updateFirstRequestResponse,
} = firstRequestSlice.actions;
