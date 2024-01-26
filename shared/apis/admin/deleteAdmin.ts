import { z } from "zod";
import { ApiFunction, ApiInput, ApiResponse, ApiSpec, callApi } from "../callApi";

export const ApiDeleteAdminInputSchema = z.object({
  params: z.object({
    adminId: z.string(),
  })
}).strict();

export type ApiDeleteAdmin = z.infer<typeof ApiDeleteAdminInputSchema>;

export interface API_DeleteAdminResponse extends ApiResponse {}

export const API_deleteAdmin: ApiFunction<ApiDeleteAdmin, API_DeleteAdminResponse> = async(input) =>
  await callApi({
    method: "DELETE",
    url: ({ adminId }) => `/admin/${adminId}`,
    ...input,
  });
