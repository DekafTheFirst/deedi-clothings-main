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
            const response = await makeRequest.post('/auth/local/register?populate=*', {
                username,
                email,
                password,
                photoUrl: 'https://static01.nyt.com/images/2022/08/22/multimedia/22billboard/22billboard-jumbo.jpg?quality=75&auto=webp'
            });

            const strapiUser = response.data.user;

            // Create cart for the new user
            await makeRequest.post('/carts', { userId: strapiUser.id });

            // Fetch cart for the new user
            const cartResponse = await makeRequest.get(`/carts?populate=*&[filters][user][id]=${strapiUser.id}`);

            return {
                user: {
                    email: strapiUser.email,
                    id: strapiUser.id,
                    username: strapiUser.username,
                    photoUrl: strapiUser.photoUrl
                },
                cart: cartResponse.data
            };
        } catch (error) {
            console.log(error);
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

            // Fetch cart and orders
            const [cartResponse, ordersResponse] = await Promise.all([
                makeRequest.get(`/carts?populate=*&[filters][user][id]=${strapiUser.id}`),
                makeRequest.get(`/orders?populate=*&[filters][user][id]=${strapiUser.id}`)
            ]);



            return {
                user: {
                    email: strapiUser.email,
                    id: strapiUser.id,
                    username: strapiUser.username,
                    photoUrl: strapiUser.photoUrl
                },
                cart: cartResponse.data,
                orders: ordersResponse.data
            };
        } catch (error) {
            console.log(error);
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

export const updateCart = createAsyncThunk(
    'cart/updateCart',
    async (newCart, { dispatch, getState }) => {
        try {
            const { auth } = getState();
            await makeRequest.put(`/carts/${newCart.id}`, newCart);
            dispatch(setCart(newCart));
            localStorage.setItem('cart', JSON.stringify(newCart));
        } catch (error) {
            console.log(error);
            throw new Error('Failed to update cart');
        }
    }
);


export const updateOrders = createAsyncThunk(
    'orders/updateOrders',
    async (newOrders, { dispatch, getState }) => {
        try {
            const { auth } = getState();
            await makeRequest.put(`/orders/${newOrders.id}`, newOrders);
            dispatch(setOrders(newOrders));
            localStorage.setItem('orders', JSON.stringify(newOrders));
        } catch (error) {
            console.log(error);
            throw new Error('Failed to update orders');
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
    initialState: { user: null, cart: null, orders: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.cart = action.payload.cart;
                state.orders = action.payload.orders;
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
                state.user = action.payload.user;
                state.cart = action.payload.cart;
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.cart = null;
                state.orders = null;
                state.error = null;
            });
    },
});


export default authSlice.reducer;
