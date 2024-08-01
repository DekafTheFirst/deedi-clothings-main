// src/api/requests.js
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

export const makeRequest = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const authenticatedRequest = async (endpoint, method = 'GET', data = null) => {
    // Ensure user is authenticated
    const user = auth.currentUser; // Get the current user from Firebase Auth

    if (!user) throw new Error('User not authenticated');

    // Get Firebase ID token
    const idToken = await user.getIdToken();

    console.log('idToken');
    
    return makeRequest({
        method,
        url: endpoint,
        headers: {
            Authorization: `Bearer ${idToken}`, // Set Firebase ID token in Authorization header
        },
        data,
    });
};
