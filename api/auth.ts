import authRequest from "@/util/authRequest";
import {AxiosPromise} from "axios";
import {Account, User} from "next-auth";

export const login = (account: Account, user: User): AxiosPromise => {
    return authRequest({
        url: `/auth/login`,
        method: "post",
        data: {
            account,
            user
        }
    });
};