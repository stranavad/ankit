import request from "@/util/request";
import {AxiosPromise} from "axios";


export const getSpaces = () => {
    return request({
        url: "/space",
        method: "get",
    });
};