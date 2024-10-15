import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type webhookDataState = {
  data: any;
};

const initialState: webhookDataState = {
  data: [],
};

export const webhookDataSlice = createSlice({
  name: "webhookData",
  initialState,
  reducers: {
    updateWebhookData(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
  },
});

export const { updateWebhookData } = webhookDataSlice.actions;
