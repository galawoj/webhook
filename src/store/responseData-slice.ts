import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ResponseDataState = {
  response: any;
};

const initialState: ResponseDataState = {
  response: {},
};

export const responseDataSlice = createSlice({
  name: "responseData",
  initialState,
  reducers: {
    updateResponseData(state, action: PayloadAction<any>) {
      state.response = action.payload;
    },
  },
});

export const { updateResponseData } = responseDataSlice.actions;
