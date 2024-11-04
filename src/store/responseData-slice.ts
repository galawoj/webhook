import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ResponseDataState = {
  data: any[];
};

const initialState: ResponseDataState = {
  data: [],
};

export const responseDataSlice = createSlice({
  name: "responseData",
  initialState,
  reducers: {
    updateResponseData(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
  },
});

export const { updateResponseData } = responseDataSlice.actions;
