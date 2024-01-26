import { Admin } from "@/shared/@types";
import { ApiFunction, ApiInput, ApiResponse, ApiSpec, callApi } from "../callApi";
import { z } from "zod";

export const ApiAddAdminInputSchema = z.object({
  data: z.object({
    email: z.string(),
    name: z.string(),
    password: z.string().optional(),
    thumbnail: z.string().optional(),
  })
}).strict();

export type ApiAddAdmin = z.infer<typeof ApiAddAdminInputSchema>;

export interface API_AddAdminResponse extends ApiResponse {
  data: Admin;
}

export const API_addAdmin: ApiFunction<ApiAddAdmin, API_AddAdminResponse> = async(input) =>
  await callApi({
    method: "POST",
    url: "/admin",
    ...input,
  });
