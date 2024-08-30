// src/api/requests.js
import axios from 'axios';

import Cookies from "universal-cookie"


export const makeRequest = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    }
)

makeRequest.interceptors.request.use(
    (config) => {
        const cookies = new Cookies();
        const jwtToken = cookies.get('jwt_authentication') || null;
        console.log('jwtToken', jwtToken)

        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        } else {
            delete config.headers.Authorization; // Remove Authorization header if no token
        }

        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);