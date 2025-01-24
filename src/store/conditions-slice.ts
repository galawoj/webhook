import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestMethod } from "../types/requestMethod";

export type ConditionItem = {
  id: number;
  inputValue: string;
  conditionValue: string;
  isValid: boolean;
  request: {
    method: RequestMethod;
    url: string;
    header_1: string;
    header_2: string;
    header_3: string;
    body: {};
  };
  response: {};
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
      isValid: false,
      request: {
        method: "POST",
        url: "",
        header_1: "",
        header_2: "",
        header_3: "",
        body: {},
      },
      response: {},
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
        isValid: false,
        request: {
          method: "POST",
          url: "",
          header_1: "",
          header_2: "",
          header_3: "",
          body: "",
        },
        response: {},
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
    setCondRequestMethod(state, action: PayloadAction<"POST" | "GET">) {
      state.conditions = state.conditions.map((item) => {
        if (item.id === state.currentCondition) {
          return {
            ...item,
            request: { ...item.request, method: action.payload },
          };
        }
        return item;
      });
    },
    updateCondRequestHeader(
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
    updateCondRequestBody(state, action: PayloadAction<{}>) {
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
    updateCondRequestUrl(state, action: PayloadAction<string>) {
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
    updateCondResponseData(
      state,
      action: PayloadAction<{ condition: number; response: any }>
    ) {
      state.conditions = state.conditions.map((item) => {
        if (item.id === action.payload.condition) {
          return {
            ...item,
            response: action.payload.response,
          };
        }
        return item;
      });
    },
    updateValidation(state, action: PayloadAction<boolean>) {
      state.conditions = state.conditions.map((item) => {
        if (item.id === state.currentCondition) {
          return {
            ...item,
            isValid: action.payload,
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
  setCondRequestMethod,
  updateCondRequestHeader,
  updateCondRequestBody,
  updateCondRequestUrl,
  updateCondResponseData,
  updateValidation,
} = conditionsSlice.actions;
