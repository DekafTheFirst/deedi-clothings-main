// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from '../makeRequest';
import { fetchCartItems, resetCart } from './cartReducer';


// Async thunks
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password, username, photoUrl }, {dispatch, thunkAPI}) => {
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
            dispatch(fetchCartItems(strapiUser.id))

            
            return {
                user: {
                    email: strapiUser.email,
                    id: strapiUser.id,
                    username: strapiUser.username,
                    photoUrl: strapiUser.photoUrl
                },
                
            };
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, {dispatch, thunkAPI}) => {
        try {

            const response = await makeRequest.post('/auth/local', {
                identifier: email,
                password
            });

            const strapiUser = response.data.user;
           

            dispatch(fetchCartItems(strapiUser.id))

            
            return {
                user: {
                    email: strapiUser.email,
                    id: strapiUser.id,
                    username: strapiUser.username,
                    photoUrl: strapiUser.photoUrl
                },
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
            // dispatch(setCart(newCart));
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
    async (_, { dispatch, thunkAPI }) => {
        try {
            // Clear user session on Strapi if necessary
            // Note: You may need to handle session clearing differently
            dispatch(resetCart());
            
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
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
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
                // state.cart = action.payload.cart;
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                // state.cart = null;
                // state.orders = null;
                state.error = null;
            });
    },
});


export default authSlice.reducer;
