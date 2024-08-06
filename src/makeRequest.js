// src/api/requests.js
import axios from 'axios';


export const makeRequest =  axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: "bearer " + import.meta.env.VITE_API_TOKEN,
        }
    }
)
