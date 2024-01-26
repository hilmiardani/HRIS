import { Admin } from "@/shared/@types";
import { ApiFunction, ApiInput, ApiResponse, ApiSpec, callApi } from "../callApi";
import { z } from "zod";

const GET_ALL_ADMIN_SEARCH_BY_PARAMETERS = ["name"] as const;
export type GetAllAdminSearchBy = keyof typeof GET_ALL_ADMIN_SEARCH_BY_PARAMETERS;
const GET_ALL_ADMIN_SORT_BY_PARAMETERS = ["createdAt", "updatedAt", "id", "name"] as const;
export type GetALlAdminSortBy = keyof typeof GET_ALL_ADMIN_SORT_BY_PARAMETERS;

export const ApiGetAllAdminInputSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    searchBy: z.enum(GET_ALL_ADMIN_SEARCH_BY_PARAMETERS).optional(),
    sort: z.number().optional(),
    sortBy: z.enum(GET_ALL_ADMIN_SORT_BY_PARAMETERS).optional(),
    resPerPage: z.literal('ALL').optional()
  }).optional(),
}).strict()

export type ApiGetAllAdmin = ReturnType<typeof ApiGetAllAdminInputSchema.parse>

export interface API_GetAllAdminResponse extends ApiResponse {
  data: Admin[];
}

export const API_getAllAdmin: ApiFunction<ApiGetAllAdmin, API_GetAllAdminResponse> = async (input) =>
  await callApi({
    method: "GET",
    url: "/admin",
    ...input,
  });
