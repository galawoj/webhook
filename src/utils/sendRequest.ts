import axios from "axios";

import {
  ConditionItem,
  updateCondResponseData,
} from "../store/conditions-slice";

const parseHeader = (header: string | undefined) => {
  const reg_k = /^[^:]+/;
  const reg = /(?<=:).*/;

  if (!header) return {};
  const key = header.match(reg_k)?.[0];
  const value = header.match(reg)?.[0];
  return key ? { [key]: value } : {};
};

export const sendRequest = async (
  dispatch: any,
  condition: number,
  currentRequest: ConditionItem["request"]
) => {
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
    dispatch(updateCondResponseData({ condition, response: response.data }));
    return response.data; // Możesz zwrócić dane, jeśli chcesz je używać gdzieś indziej
  } catch (err) {
    const errorMessage = axios.isAxiosError(err)
      ? err.response?.data?.message || "An error occurred"
      : "Unknown error";
    console.error("Request error:", errorMessage);
    throw new Error(errorMessage); // Przekazujesz błąd dalej, aby go obsłużyć w miejscu wywołania
  }
};
