import authRequest from "@/util/authRequest";
import {AxiosPromise} from "axios";
import {User} from "next-auth";

export const login = (account: any, user: User): AxiosPromise => {
    return authRequest({
        url: `/auth/login`,
        method: "post",
        data: {
            account,
            user
        }
    });
};