// src/api/requests.js
import axios from 'axios';


export const makeRequest =  axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTcyNDQ1Njk3NiwiZXhwIjoxNzI3MDQ4OTc2fQ.ks8oUODrneodE6auANeQ_4D8eirxb6IbWnkgz5v9YMA",
        }
    }
)
