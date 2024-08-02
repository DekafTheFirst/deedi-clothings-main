// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, getIdToken, getAuth } from 'firebase/auth';
import { auth } from '../firebase/config';
import { makeRequest } from '../makeRequest';


// Async thunks
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password }, thunkAPI) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;


            const idToken = await getIdToken(user);


            // Send token to Strapi
            const response = await makeRequest.post('/auth/firebase', { idToken });
            const strapiUser = response.data.user;

            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                strapiUser: strapiUser, // Store Strapi user in Redux
            };
        } catch (error) {
            console.error(error)
            return thunkAPI.rejectWithValue(error.payload.code);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // console.log(user)

            const idToken = await getIdToken(user);
            // console.log(idToken)
            // Send token to Strapi

            // Send token to Strapi
            const response = await makeRequest.post('/auth/firebase', { idToken });
            const strapiUser = response.data.user;
            console.log(strapiUser);

            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                strapiUser: strapiUser, // Store Strapi user in Redux
            };
        } catch (error) {
            // console.error(error.message)
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'auth/updateProfile',
    async ({ displayName, photoURL }, thunkAPI) => {

        try {
            // Update profile in Firebase
            await updateProfile(auth.currentUser, {
                displayName,
                photoURL,

            });

            const updatedUser = getAuth().currentUser;
            console.log("updatedUser", updatedUser)

            // Get ID token for authenticated user
            const idToken = await auth.currentUser.getIdToken(true);

            // Send profile update to Strapi
            await makeRequest.post('/auth/firebase', {
                idToken,
                displayName,
                photoURL,
            });

            console.log('profile updated')


            return { displayName, photoURL };
        } catch (error) {
            console.error('Update profile error:', error.payload.code);
            return thunkAPI.rejectWithValue(error.payload.code);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            await signOut(auth);

            return {};
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.error = null;

            });
    },
});

export default authSlice.reducer;
