// src/api/requests.js
import axios from 'axios';

import Cookies from "universal-cookie"

const cookies = new Cookies();
const jwtToken = cookies.get('jwt_authentication') || null;
console.log('jwtToken', jwtToken);

export const makeRequest = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
        }
    }
)
