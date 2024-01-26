import { ApiFunction, ApiResponse, callApi } from "../callApi";
import { z } from "zod";
import { AllAnalytic, DailyAnalytic, MonthlyAnalytic, TotalAllAnalytics, TotalDailyAnalytics, TotalMonthlyAnalytics } from "@/shared/@types/overview";

export const ApiGetOverviewInputSchema = z.object({
  query: z.object({
    startDate: z.string(),
    endDate: z.string()
  })
});

export type ApiGetOverview = z.infer<typeof ApiGetOverviewInputSchema>;

export interface API_GetOverviewResponse extends ApiResponse {
  data: {
    totalBooking: number,
    revenue: number,
    insidentil: number,
    member: number,
    memberRevenue: number,
    insidentilRevenue: number
  };
}

export const API_getOverview: ApiFunction<ApiGetOverview, API_GetOverviewResponse> = async (input) =>
  await callApi({
    method: "GET",
    url: '/admin/overview',
    ...input,
  });
