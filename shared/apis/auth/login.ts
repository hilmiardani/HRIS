import { ApiFunction, ApiResponse, callApi } from "../callApi";
import { LoginResponse } from "@/shared/types";
import { z } from "zod";

export const ApiLoginInputSchema = z.object({
  data: z.object({
    email: z.string().optional(),
    password: z.string().optional(),
  })
}).strict();

export type ApiLogin = z.infer<typeof ApiLoginInputSchema>;

export interface API_LoginResponse extends ApiResponse {
  data: LoginResponse;
}

export const API_login: ApiFunction<ApiLogin, API_LoginResponse> = async (input) =>
  await callApi({
    method: "POST",
    url: "/admin/auth/login",
    ...input,
  });
