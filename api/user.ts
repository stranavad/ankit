import request from "@/util/request";
import {AxiosPromise} from "axios";
import {ApplicationUser} from "@/types/user";


export interface SearchUsersData {
    search: string;
    in: number[];
    notIn: number[];
}

export const searchUsers = (
    data: SearchUsersData
): AxiosPromise<ApplicationUser[]> => {
    return request({
        url: "/user/search",
        method: "post",
        data
    });
};