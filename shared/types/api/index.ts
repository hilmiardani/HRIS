export * from "./user";
export * from "./device";

export interface ApiResponse {
  message: string;
}

export interface Pagination {
  page: number;
  lastPage: number;
  count?: number;
}
