import { configureStore } from "@reduxjs/toolkit";
import { conditionsSlice } from "./conditions-slice";
import { webhookDataSlice } from "./webhookData-slice";
import { firstRequestSlice } from "./firstRequest-slice";

export const store = configureStore({
  reducer: {
    conditions: conditionsSlice.reducer,
    webhookData: webhookDataSlice.reducer,
    firstRequest: firstRequestSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
