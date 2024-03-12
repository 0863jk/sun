import axios from "axios";

const BASE_URL = 'http://localhost:8000/'

const axiosAPI = (url, options) => {
    const instance = axios.create({
        baseURL: url,
        ...options
    });
    return instance;
}

const axiosAuthAPI = (token) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        headers: { Authorization: 'Bearer ' + token },
    });
    return instance;
}

export const defaultInstance = axiosAPI(BASE_URL);
export const authInstance = axiosAuthAPI;
