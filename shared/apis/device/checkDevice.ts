import { Device } from "@/shared/@types";
import { ApiFunction, ApiInput, ApiResponse, ApiSpec, callApi } from "../callApi";
import { z } from "zod";

export const ApiCheckDeviceInputSchema = z.object({
  data: z.object({
    id: z.string().optional(),
    fingerprint: z.string(),
  })
}).strict();

export type ApiCheckDevice = z.infer<typeof ApiCheckDeviceInputSchema>;

export interface API_CheckDeviceResponse extends ApiResponse {
  data: Device;
}

export const API_checkDevice: ApiFunction<ApiCheckDevice, API_CheckDeviceResponse> = async(input) =>
  await callApi({
    method: "POST",
    url: "/device/check",
    ...input,
  });
