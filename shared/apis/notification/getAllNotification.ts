import { ApiFunction, ApiInput, ApiResponse, ApiSpec, callApi } from "../callApi";

export interface GetAllNotificationInput extends ApiInput {}

export interface API_GetAllNotificationResponse extends ApiResponse {
  data: any[];
}

export const API_getAllNotification: ApiFunction<GetAllNotificationInput, API_GetAllNotificationResponse> = async(input) =>
  await callApi({
    method: "GET",
    url: () => '/notification',
    ...input,
  });