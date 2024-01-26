import { z } from "zod";
import { ApiFunction, ApiInput, ApiResponse, callApi } from "../callApi";

export interface ApiUpload extends ApiInput {
  data: FormData;
}

export const ApiUploadInputSchema = z.object({
  data: z.unknown().refine(data => data instanceof FormData, { message: 'not a form data' }).transform(data => data as FormData)
}).strict()

export type ApiUploadInput = z.infer<typeof ApiUploadInputSchema>

export interface API_UploadResponse extends ApiResponse {
  fileName: string
}

export const API_upload: ApiFunction<ApiUpload, API_UploadResponse> = async (input) =>
  await callApi({
    method: "POST",
    url: "/file/upload",
    ...input,
  }, { headers: { "Content-Type": "multipart/form-data" } }
  );
