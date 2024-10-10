import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ConditionItem = {
  id: number;
  inputValue: string;
  conditionValue: string;
};

type ConditionsState = {
  conditions: ConditionItem[];
  currentCondition: number;
};

const initialState: ConditionsState = {
  conditions: [
    {
      id: 1,
      inputValue: "",
      conditionValue: "",
    },
  ],

  currentCondition: 1,
};

export const conditionsSlice = createSlice({
  name: "conditions",
  initialState,
  reducers: {
    addConditionItem(state) {
      state.conditions.push({
        id: state.conditions.length + 1,
        inputValue: "",
        conditionValue: "",
      });
      state.currentCondition++;
    },
    setCurrentCondition(state, action: PayloadAction<number>) {
      state.currentCondition = action.payload;
    },
  },
});

export const { addConditionItem, setCurrentCondition } =
  conditionsSlice.actions;
