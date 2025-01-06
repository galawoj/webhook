import axios from "axios";
import {
  ConditionItem,
  updateCondResponseData,
} from "../store/conditions-slice";
import { FirstRequestState } from "../store/firstRequest-slice";
import { AppDispatch } from "../store/store";
import { updateFirstRequestResponse } from "../store/firstRequest-slice";

const parseHeader = (header: string | undefined) => {
  const reg_k = /^[^:]+/;
  const reg = /(?<=:).*/;

  if (!header) return {};
  const key = header.match(reg_k)?.[0];
  const value = header.match(reg)?.[0];
  return key ? { [key]: value } : {};
};

export type CondReq = {
  dispatch: AppDispatch;
  condition: number;
  currentRequest: ConditionItem["request"];
  mode: "condReq";
};
export type FirstReq = {
  dispatch: AppDispatch;
  currentRequest: FirstRequestState["request"];
  mode: "firstReq";
};

export const sendRequest = async <T extends CondReq | FirstReq>(request: T) => {
  const { dispatch, currentRequest, mode } = request;

  const headers = {
    "Content-Type": "application/json",
    ...parseHeader(currentRequest.header_1),
    ...parseHeader(currentRequest.header_2),
    ...parseHeader(currentRequest.header_3),
  };

  try {
    const response = await axios.post(currentRequest.url, currentRequest.body, {
      headers,
    });

    dispatch(() => {
      if (mode === "condReq") {
        const { condition } = request as CondReq;
        updateCondResponseData({
          condition,
          response: response.data,
        });
      } else {
        updateFirstRequestResponse(response.data);
      }
    });

    return response.data;
  } catch (err) {
    const errorMessage = axios.isAxiosError(err)
      ? err.response?.data?.message || "An error occurred"
      : "Unknown error";
    console.error("Request error:", errorMessage);
    throw new Error(errorMessage);
  }
};
