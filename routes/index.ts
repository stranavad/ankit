import request from "@/util/request";
import {AxiosPromise} from "axios";
import useSWR from "swr";

const fetcher = <T, RequestParams extends any = any>(url: string, params?: RequestParams): AxiosPromise<T> => request({
    url,
    method: "get",
    params
});

export const useRequest = <ResponseType extends any = any, RequestParams extends any = any>(url: string | null, params?: RequestParams) => {
    const {data, error, mutate} = useSWR(url, async (url) => {
        const response = await fetcher<ResponseType>(url, params);
        return response.data;
    });
    return {
        data: data || null,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};