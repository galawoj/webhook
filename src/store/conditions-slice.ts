import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ConditionItem = {
  id: number;
  inputValue: string;
  conditionValue: string;
  request: {
    url: string;
    header_1: string;
    header_2: string;
    header_3: string;
    body: string;
  };
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
      request: { url: "", header_1: "", header_2: "", header_3: "", body: "" },
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
        request: {
          url: "",
          header_1: "",
          header_2: "",
          header_3: "",
          body: "",
        },
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
    updateInputValue(state, action: PayloadAction<string>) {
      state.conditions = state.conditions.map((item) => {
        if (item.id === state.currentCondition) {
          return { ...item, inputValue: action.payload };
        }
        return item;
      });
    },
    updateConditionValue(state, action: PayloadAction<string>) {
      state.conditions = state.conditions.map((item) => {
        if (item.id === state.currentCondition) {
          return { ...item, conditionValue: action.payload };
        }
        return item;
      });
    },
    updateRequestHeader(
      state,
      action: PayloadAction<
        { header_1: string } | { header_2: string } | { header_3: string }
      >
    ) {
      state.conditions = state.conditions.map((item) => {
        if (item.id === state.currentCondition) {
          return {
            ...item,
            request: { ...item.request, ...action.payload },
          };
        }
        return item;
      });
    },
    updateRequestBody(state, action: PayloadAction<string>) {
      state.conditions = state.conditions.map((item) => {
        if (item.id === state.currentCondition) {
          return {
            ...item,
            request: { ...item.request, body: action.payload },
          };
        }
        return item;
      });
    },
    updateRequestUrl(state, action: PayloadAction<string>) {
      state.conditions = state.conditions.map((item) => {
        if (item.id === state.currentCondition) {
          return {
            ...item,
            request: { ...item.request, url: action.payload },
          };
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
  updateInputValue,
  updateConditionValue,
  updateRequestHeader,
  updateRequestBody,
  updateRequestUrl,
} = conditionsSlice.actions;
