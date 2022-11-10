import axios from "axios";
import {getSession} from "next-auth/react";

export interface ErrorResponse {
    data: string;
    status: number;
}

// export interface DataResponse {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     data: any;
//     status: number;
// }

// Create axios instance
const service = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 20000, // Request timeout
});

// Request intercepter
service.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (config.headers && session) {
            config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
            config.headers["UserID"] = session.userId;
        }

        return config;
    },
    (error) => {
        // eslint-disable-next-line no-console
        console.log("we are fucked");
        Promise.reject(error);
    }
);

// Add a response interceptor
service.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, async (error) => {
    if (error.response?.status === 403) {
        // signOut();
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default service;
