import { ApiFunction, ApiResponse, callApi } from "../callApi";
import { z } from "zod";

export const ApiAddPermissionInputSchema = z.object({
  data: z.object({
    startDate: z.string(),
    endDate: z.string(),
    type: z.string(),
    description: z.string(),
    file: z.any(z.string()).optional(),
  })
}).strict();

export type API_addPermissionInput = z.infer<typeof ApiAddPermissionInputSchema>;

export interface API_AddPermissionResponse extends ApiResponse {
  data: any;
}

export const API_addPermission: ApiFunction<API_addPermissionInput, API_AddPermissionResponse> = async (input) =>
  await callApi({
    method: "POST",
    url: () => '/permissionleave',
    ...input,
  });
