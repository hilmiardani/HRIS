import { ApiFunction, ApiResponse, callApi } from "../callApi";
import { z } from "zod";

export const ApiAddDisputeInputSchema = z.object({
  data: z.object({
    date: z.string(),
    description: z.string(),
    file: z.any(z.string()).optional(),
  })
}).strict();

export type API_addDisputeInput = z.infer<typeof ApiAddDisputeInputSchema>;

export interface API_AddDisputeResponse extends ApiResponse {
  data: any;
}

export const API_addDispute: ApiFunction<API_addDisputeInput, API_AddDisputeResponse> = async (input) =>
  await callApi({
    method: "POST",
    url: () => '/dispute',
    ...input,
  });
