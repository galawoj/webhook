import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WebhookDataState = {
  data: any[];
  changed: boolean;
};

const initialState: WebhookDataState = {
  data: [],
  changed: false,
};

export const webhookDataSlice = createSlice({
  name: "webhookData",
  initialState,
  reducers: {
    updateWebhookData(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.changed = true;
    },
  },
});

export const { updateWebhookData } = webhookDataSlice.actions;
