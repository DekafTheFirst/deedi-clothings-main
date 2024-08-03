// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, getIdToken, getAuth } from 'firebase/auth';
import { auth } from '../firebase/config';
import { makeRequest } from '../makeRequest';


// Async thunks
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password, username, photoUrl }, thunkAPI) => {

        try {
            const response = await makeRequest.post('/auth/local/register', {
                username,
                email,
                password,
                photoUrl: 'https://static01.nyt.com/images/2022/08/22/multimedia/22billboard/22billboard-jumbo.jpg?quality=75&auto=webp'
            });



            const strapiUser = response.data.user;
            console.log(strapiUser)

            // CreateCartForUser
            await makeRequest.post('/cart', { userId: strapiUser.id });


            return {
                email: strapiUser.email,
                id: strapiUser.id,
                username: strapiUser.username,
                photoUrl: strapiUser.photoUrl
            };

        } catch (error) {
            console.log(error)

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await makeRequest.post('/auth/local', {
                identifier: email,
                password
            });
            const strapiUser = response.data.user;

            // Create cart after login
            await makeRequest.post('/cart', { userId: strapiUser.id });

            return {
                email: strapiUser.email,
                id: strapiUser.id,
                username: strapiUser.username,
                photoUrl: strapiUser.photoUrl
            };
        } catch (error) {
            console.log(error)

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'auth/updateProfile',
    async ({ id, username, photoUrl }, thunkAPI) => {
        try {
            const response = await makeRequest.put(`/users/${id}`, {
                username: username,
                photoUrl: photoUrl
            });

            return {
                ...response.data,
                username,
                photoUrl
            };
        } catch (error) {
            console.log(error)

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            // Clear user session on Strapi if necessary
            // Note: You may need to handle session clearing differently
            return {};
        } catch (error) {
            console.log(error)

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
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;

            })
            .addCase(updateUser.rejected, (state, action) => {
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
