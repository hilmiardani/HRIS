import { Admin } from "@/shared/@types";
import { ApiFunction, ApiInput, ApiResponse, ApiSpec, callApi } from "../callApi";
import { z } from "zod";

export const ApiEditAdminInputSchema = z.object({
  params: z.object({
    adminId: z.string(),
  }),
  data: z.object({
    email: z.string(),
    name: z.string(),
    password: z.string().optional(),
    thumbnail: z.string().optional(),
  })
}).strict();

export type ApiEditAdmin = z.infer<typeof ApiEditAdminInputSchema>;

export interface API_EditAdminResponse extends ApiResponse {
  data: Admin;
}

export const API_editAdmin: ApiFunction<ApiEditAdmin, API_EditAdminResponse> = async(input) =>
  await callApi({
    method: "PATCH",
    url: ({ adminId }) => `/admin/${adminId}`,
    ...input,
  });
