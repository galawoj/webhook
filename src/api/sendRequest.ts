import axios from "axios";
import { CondReq } from "../types/condReq";
import { updateCondResponseData } from "../store/conditions-slice";
import { updateFirstRequestResponse } from "../store/firstRequest-slice";
import { FirstReq } from "../types/firstReq";

const parseHeader = (header: string | undefined) => {
  const reg_k = /^[^:]+/;
  const reg = /(?<=:).*/;

  if (!header) return {};
  const key = header.match(reg_k)?.[0];
  const value = header.match(reg)?.[0];
  return key ? { [key]: value } : {};
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
    const response = await axios({
      method: currentRequest.method,
      url: currentRequest.url,
      data: currentRequest.body,
      headers: headers,
    });

    if (mode === "condReq") {
      const { condition } = request as CondReq;
      dispatch(
        updateCondResponseData({
          condition,
          response: response.data,
        })
      );
    } else if (mode === "firstReq") {
      dispatch(updateFirstRequestResponse(response.data));
    }
  } catch (err) {
    const errorMessage = axios.isAxiosError(err) && err;

    if (errorMessage) {
      console.error("Request error:", errorMessage.message);
    }
  }
};
