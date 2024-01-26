import React, { Component, useEffect, useRef, useState } from "react";
import { ApiInput, Paginate, ApiResponse, ApiFunction } from "../apis/callApi";
import { AxiosError, AxiosResponse } from "axios";
import { showNotification } from "@mantine/notifications";
import { ZodSchema } from "zod";
import { NestedPartial } from "../@types";

/*
 * TODO:
 * 1. Decouple mantine show notification
 * 2. Set input by key
 * 3. Next SWR review comparison
 * 4. InputValidator support custom validator
 * 5. On progress
 * 6. Cancel Token
 */

type AnyZodSchema = ZodSchema;

interface ApiHandlerConfig<InputType> {
  silence?: boolean;
  eager?: boolean;
  inputValidator?: AnyZodSchema;
  verbose?: boolean;
  defaultInput?: NestedPartial<InputType>;
}
type AdvancedFetchOption = { concat?: boolean };

export const useApiHandler = <
  InputType extends ApiInput,
  OutputType extends ApiResponse | ApiResponse<[Paginate]>,
>(
  apiFunction: ApiFunction<InputType, OutputType>,
  {
    silence = false,
    eager = false,
    inputValidator,
    verbose,
    defaultInput,
  }: ApiHandlerConfig<InputType> = {},
) => {
  type PaginationType = Pick<OutputType, "page" | "lastPage">;
  type DataType = Pick<OutputType, "data">["data"];
  type RestDataType = Omit<OutputType, "page" | "lastPage" | "data">;

  const [data, setData] = useState<DataType>();
  const [pagination, setPagination] = useState<PaginationType>();
  const [restData, setRestData] = useState<RestDataType>();
  const [input, setInput] = useState<NestedPartial<InputType> | undefined>(defaultInput);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<string>();

  const isValidated = (input: NestedPartial<InputType>): boolean => {
    if (inputValidator !== undefined) {
      try {
        const validatedInput: InputType = inputValidator.parse(input);
        return true;
      } catch (error) {
        if (verbose === true) console.debug("validation failed, skipping...");
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    const jsonInputString =
      input !== undefined ? JSON.stringify(input) : undefined;
    if (
      eager === true &&
      input &&
      loading !== true &&
      jsonInputString !== inputRef.current
    ) {
      if (inputValidator && !isValidated(input)) return;
      inputRef.current = jsonInputString;
      fetch(input as InputType);
    }
  }, [input, loading]);

  const load = async (advancedFetchOption: AdvancedFetchOption = {}) => {
    if (verbose === true) console.log("load data");
    if (inputValidator && !isValidated(input as InputType))
      throw new Error("input invalid");
    return await fetch(input as InputType, advancedFetchOption);
  };
  const clear = () => {
    setData(undefined);
    setPagination(undefined);
    setRestData(undefined);
    setInput(undefined);
    setLoading(false);
    inputRef.current = undefined;
  };

  const fetch = async (
    params: InputType,
    { concat = false }: AdvancedFetchOption = {},
  ): Promise<AxiosResponse<OutputType> | undefined> => {
    try {
      if (!loading) {
        setLoading(true);
        // console.log('Params ', params);
        if (input === undefined) {
          inputRef.current = JSON.stringify(params);
          setInput(params);
        }
        const result = await apiFunction(params);
        if (verbose === true) console.log(result);
        if (!silence && result.data.message)
          showNotification({
            message: result.data.message,
            color: "green",
            autoClose: 3000,
          });
        if (Array.isArray(data) && concat && Array.isArray(result?.data?.data))
          setData([...data, ...result.data.data]);
        else setData(result.data?.data);
        if (
          result.data.page !== undefined &&
          result.data.lastPage !== undefined
        )
          setPagination({
            page: result.data.page,
            lastPage: result.data.lastPage,
          });
        setLoading(false);
        return result;
      } else return undefined;
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        // axios response
        const errorResponse = error.response?.data;
        if (!silence)
          showNotification({
            message: errorResponse.message,
            color: "red",
            autoClose: 2000,
          });
      }
      // console.log("Loading ", loading);
      // throw error;
    }
  };

  const nextPage = (advancedFetchOption: AdvancedFetchOption = {}) => {
    if (input === undefined) return;
    const currentPage = pagination?.page;
    const lastPage = pagination?.lastPage;

    if (currentPage === undefined || lastPage === undefined) return;
    let bufferNextPage: number = currentPage + 1;
    if (bufferNextPage > lastPage) return;
    if (inputValidator && !isValidated(input as InputType))
      throw new Error("input invalid");
    return fetch(
      {
        ...(input as InputType),
        query: { ...input.query, page: bufferNextPage },
      },
      advancedFetchOption,
    );
  };

  const prevPage = (advancedFetchOption: AdvancedFetchOption = {}) => {
    if (input === undefined) return;
    const currentPage = pagination?.page;
    const lastPage = pagination?.lastPage;
    if (currentPage === undefined || lastPage === undefined) return;
    let bufferPrevPage: number = currentPage - 1;
    if (bufferPrevPage < 1 || bufferPrevPage > lastPage) return;
    if (inputValidator && !isValidated(input as InputType))
      throw new Error("input invalid");
    return fetch(
      {
        ...(input as InputType),
        query: { ...input.query, page: bufferPrevPage },
      },
      advancedFetchOption,
    );
  };

  const loadMore = async (advancedFetchOption: AdvancedFetchOption = {}) =>
    await nextPage({ ...advancedFetchOption, concat: true });

  const selectPage = (
    page: number,
    advancedFetchOption: AdvancedFetchOption,
  ) => {
    if (
      input === undefined ||
      pagination?.lastPage === undefined ||
      page > pagination.lastPage
    )
      return;
    if (inputValidator && !isValidated(input as InputType))
      throw new Error("input invalid");
    return fetch(
      { ...(input as InputType), query: { ...input.query, page: page } },
      advancedFetchOption,
    );
  };

  const firstPage = (advancedFetchOption: AdvancedFetchOption = {}) => {
    if (input === undefined) return;
    if (inputValidator && !isValidated(input as InputType))
      throw new Error("input invalid");
    return fetch(
      { ...(input as InputType), query: { ...input.query, page: 1 } },
      advancedFetchOption,
    );
  };

  const lastPage = (advancedFetchOption: AdvancedFetchOption = {}) => {
    if (input === undefined) return;
    const lastPage = pagination?.lastPage;
    if (lastPage === undefined) return;
    if (inputValidator && !isValidated(input as InputType))
      throw new Error("input invalid");
    return fetch(
      { ...(input as InputType), query: { ...input.query, page: lastPage } },
      advancedFetchOption,
    );
  };

  return {
    fetch,
    input,
    setInput,
    data,
    setData,
    restData,
    setRestData,
    pagination,
    setPagination,
    selectPage,
    loading,
    setLoading,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    loadMore,
    load,
    clear,
  };
};
