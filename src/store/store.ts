import { configureStore } from "@reduxjs/toolkit";
import { conditionsSlice } from "./conditions-slice";
import { webhookDataSlice } from "./webhookData-slice";
import { responseDataSlice } from "./responseData-slice";

export const store = configureStore({
  reducer: {
    conditions: conditionsSlice.reducer,
    webhookData: webhookDataSlice.reducer,
    responseData: responseDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
