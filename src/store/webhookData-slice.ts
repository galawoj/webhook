import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WebhookDataState = {
  data: any[];
};

const initialState: WebhookDataState = {
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
