import { ApiFunction, ApiResponse, callApi } from "../callApi";
import { z } from "zod";

export const UpdatePermissionInputSchema = z.object({
  params: z.object({ permissionId: z.string(), }),
  data: z.object({
    startDate: z.string(),
    endDate: z.string(),
    type: z.string(),
    description: z.string(),
    file: z.any(z.string()).optional(),
  })
}).strict();

export type APIEditPermission = z.infer<typeof UpdatePermissionInputSchema>;

export interface API_EditPermissionResponse extends ApiResponse {
  data: any;
}

export const API_editPermission: ApiFunction<APIEditPermission, API_EditPermissionResponse> = async (input) =>
  await callApi({
    method: "PATCH",
    url: () => '/permissionleave',
    ...input,
  });
