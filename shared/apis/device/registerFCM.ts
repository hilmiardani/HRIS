import { z } from "zod";
import { ApiFunction, ApiResponse, callApi } from "../callApi";

export const ApiRegisterFCMInputSchema = z.object({
  data: z.object({
    id: z.string().optional(),
    deviceToken: z.string(),
    fcmToken: z.string().optional(),
  })
}).strict();

export type ApiRegisterFCM = z.infer<typeof ApiRegisterFCMInputSchema>;

export interface API_RegisterFCMResponse extends ApiResponse {}

export const API_registerFCM: ApiFunction<ApiRegisterFCM, API_RegisterFCMResponse> = async(input) =>
  await callApi({
    method: "POST",
    url: "/device/fcm/register",
    ...input,
  });
