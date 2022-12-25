import axios from "axios";
import {getSession} from "next-auth/react";
import Cookies from "js-cookie";

// Create axios instance
const service = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 20000,
});

// Request intercepter
service.interceptors.request.use(
    async (config) => {
        let token = Cookies.get("token");

        if (!token) {
            const session = await getSession();
            Cookies.set("token", session?.accessToken as string);
            token = session?.accessToken as string;
        }
        if (config.headers && token) {
            config.headers["Authorization"] = `Bearer ${token}`;
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
