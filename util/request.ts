import axios from "axios";
import {getSession,} from "next-auth/react";

export interface ErrorResponse {
    data: string;
    status: number;
}

export interface DataResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    status: number;
}

// Create axios instance
const service = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 20000, // Request timeout
});

// Request intercepter
service.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        // console.log("config");
        // console.log(session?.accessToken);
        if (config.headers && session) {
            config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
            config.headers["account_id"] = session?.accountId;
        }

        return config;
    },
    (error) => {
        // Do something with request error
        // eslint-disable-next-line no-console
        //console.log(error); // for debug
        console.log("we are fucked");
        Promise.reject(error);
    }
);

export default service;
