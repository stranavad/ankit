import axios from "axios";
import {getSession} from "next-auth/react";

// Create axios instance
const service = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 20000,
});

// Request intercepter
service.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (config.headers && session) {
            config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
        }

        return config;
    },
    (error) => {
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
    if (error.response?.status === 405) { // FOR 404 pages
        return {data: null};
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default service;
