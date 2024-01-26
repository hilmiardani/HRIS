import { ApiFunction, ApiResponse, callApi } from "../callApi";
import { LogoutResponse } from "@/shared/types";

export interface API_LogoutResponse extends ApiResponse {
    data: LogoutResponse;
}

export const API_logout: ApiFunction<{}, API_LogoutResponse> = async () =>
    await callApi({
        method: "POST",
        url: "/auth/logout"
    });
