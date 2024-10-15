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
        id: state.conditions[state.conditions.length - 1].id + 1,
        inputValue: "",
        conditionValue: "",
      });
      state.currentCondition = state.conditions[state.conditions.length - 1].id;
    },
    removeConditionItem(state, action: PayloadAction<number>) {
      state.conditions = state.conditions.filter(
        (item) => item.id !== action.payload
      );

      state.currentCondition = state.conditions[0].id;
    },
    setCurrentCondition(state, action: PayloadAction<number>) {
      state.currentCondition = action.payload;
    },
    setInputValue(state, action: PayloadAction<string>) {
      state.conditions = state.conditions.map((item) => {
        if (item.id === state.currentCondition) {
          return { ...item, inputValue: action.payload };
        }
        return item;
      });
    },
    setConditionValue(state, action: PayloadAction<string>) {
      state.conditions = state.conditions.map((item) => {
        if (item.id === state.currentCondition) {
          return { ...item, conditionValue: action.payload };
        }
        return item;
      });
    },
  },
});

export const {
  addConditionItem,
  setCurrentCondition,
  removeConditionItem,
  setInputValue,
  setConditionValue,
} = conditionsSlice.actions;
