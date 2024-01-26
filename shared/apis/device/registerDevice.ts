import { Device } from "@/shared/@types";
import { ApiFunction, ApiInput, ApiResponse, ApiSpec, callApi } from "../callApi";
import { z } from "zod";

export const ApiRegisterDeviceInputSchema = z.object({
  data: z.object({
    fingerprint: z.string(),
  })
}).strict();

export type ApiRegisterDevice = z.infer<typeof ApiRegisterDeviceInputSchema>;

export interface API_RegisterDeviceResponse extends ApiResponse {
  data: Device;
}

export const API_registerDevice: ApiFunction<ApiRegisterDevice, API_RegisterDeviceResponse> = async(input) =>
  await callApi({
    method: "POST",
    url: "/device/register",
    ...input,
  });
