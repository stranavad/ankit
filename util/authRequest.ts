import axios from "axios";

// Create axios instance
const service = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 20000,
});

// Request intercepter
service.interceptors.request.use(
    (config) => {
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
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default service;
