// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';


// Async thunks
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password, displayName }, thunkAPI) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password, displayName);
            const user = userCredential.user;
            
            await updateProfile(auth.currentUser, {
                displayName, photoURL: "https://example.com/jane-q-user/profile.jpg"
            })

            console.log(user);
            
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                // Add other necessary fields
            };
        } catch (error) {
            console.error(error)
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user)
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                emailVerified: user.emailVerified,
                // Add other necessary fields
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
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
            });
    },
});

export default authSlice.reducer;
