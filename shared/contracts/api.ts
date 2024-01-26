import { ValidationError } from "./error";
import { Model, TimeStampKeys } from "./model";

export interface ApiResponse<T = any> {
  message: string;
  data: T;
  errors: ValidationError;
  page: number,
  lastPage: number,
  fileName?: string | undefined
}
export interface ApiError {
  message?: string;
  status?: number;
}

export interface Paginate<T> {
  data: T[];
  page: number;
  lastPage: number;
  // links: {
  //   first: string;
  //   last: string;
  //   next: string | null;
  //   prev: string | null;
  // };
  // meta: {
  //   current_page: number;
  //   from: number;
  //   last_page: number;
  //   links: {
  //     url: string | null;
  //     active: boolean;
  //     label: string;
  //   }[];
  //   path: string;
  //   per_page: number;
  //   to: number;
  //   total: number;
  // };
}

export interface ListPayload {
  paginate: boolean;
  // orderBy: string;
  // orderDir: string;
  page: number;
}
export type UpdatePayload<M extends Model, O extends string = ""> = Omit<
  M,
  O | TimeStampKeys
>;

export type CreatePayload<UpdatePayload> = Omit<UpdatePayload, "id">;
