// src/api/requests.js
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

// export const makeRequest = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
// });

export const makeRequest = async (endpoint, method, data) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const idToken = await user.getIdToken(); // Get Firebase ID token
    // console.log('idToken', idToken)
    return axios({
        method,
        url: `${import.meta.env.VITE_API_URL}${endpoint}`,
        headers: {
            Authorization: `Bearer ${idToken}`, // Set Firebase ID token in Authorization header
        },
        data,
    });
};
