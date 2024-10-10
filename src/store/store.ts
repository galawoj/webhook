import { configureStore } from "@reduxjs/toolkit";
import { conditionsSlice } from "./conditions-slice";

export const store = configureStore({
  reducer: {
    conditions: conditionsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
