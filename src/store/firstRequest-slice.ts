import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FirstRequestState = {
  request: {
    url: string;
    header_1: string;
    header_2: string;
    header_3: string;
    body: {};
  };
  response: {};
  isActive: boolean;
};

const initialState: FirstRequestState = {
  request: {
    url: "",
    header_1: "",
    header_2: "",
    header_3: "",
    body: {},
  },
  response: {},
  isActive: true,
};

export const firstRequestSlice = createSlice({
  name: "firstRequest",
  initialState,
  reducers: {
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
  updateFirstRequestHeader,
  updateFirstRequestBody,
  updateFirstRequestUrl,
  setFirstRequestActive,
  updateFirstRequestResponse,
} = firstRequestSlice.actions;
