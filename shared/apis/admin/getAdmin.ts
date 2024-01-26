import { Admin } from "@/shared/@types";
import { ApiFunction, ApiInput, ApiResponse, ApiSpec, callApi } from "../callApi";
import { z } from "zod";

export const ApiGetAdminInputSchema = z.object({
  params: z.object({
    adminId: z.string(),
  })
}).strict()

export type ApiGetAdmin = ReturnType<typeof ApiGetAdminInputSchema.parse>

export interface API_GetAdminResponse extends ApiResponse {
  data: Admin;
}

export const API_getAdmin: ApiFunction<ApiGetAdmin, API_GetAdminResponse> = async <T extends ApiGetAdmin>(input: T) =>
  await callApi({
    method: "GET",
    url: ({ adminId }) => `/admin/${adminId}`,
    ...input,
  });
