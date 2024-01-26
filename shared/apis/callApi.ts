import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { AnyObject } from "../@types";

export type UrlGenerator<T extends AnyObject> = (params: T) => string;

export interface ApiInput {
  params?: AnyObject;
  query?: AnyObject;
  data?: AnyObject;
}

export type Paginate = {};
export type Extractor<T> = Extract<T extends any[] ? T[number] : never, Paginate> extends never ? never : number;

export type ApiResponseExtension = Paginate;
export interface ApiResponse<T extends ApiResponseExtension[] = [], DataType = any | any[]> {
  message: string;
  data?: DataType;
  page: Extractor<T>;
  lastPage: Extractor<T>;
}

export interface ApiSpec<T extends ApiInput, P extends AnyObject> {
  method: Method;
  url: string | UrlGenerator<P>;
  params?: P;
  query?: T["query"];
  data?: T["data"];
}

export type ApiFunction<Input, Output> = (input: Input) => Promise<AxiosResponse<Output>>;

export const callApi = async <InputType extends ApiInput, OutputType, P extends AnyObject>(
  { method, url, data, params, query }: ApiSpec<InputType, P>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<OutputType>> => {
  try {
    const result: AxiosResponse<OutputType> = await axios<OutputType>({
      method: method,
      url: url instanceof Function ? url(params || ({} as P)) : url,
      params: query,
      data: data,
      ...config,
    });
    return result;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
