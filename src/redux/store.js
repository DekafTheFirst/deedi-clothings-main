import cartReducer from "./cart/cartReducer"
import { configureStore } from '@reduxjs/toolkit'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import checkoutReducer from "./checkout/checkoutReducer"
import sessionStorage from 'redux-persist/lib/storage/session'; // session storage
import authReducer from "./auth/authReducer"

const cartPersistConfig = {
  key: 'cart',
  version: 1,
  storage,
};

// Persist configuration for checkout reducer using session storage
const checkoutPersistConfig = {
  key: 'checkout',
  version: 1,
  // storage: sessionStorage,
};

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
// const persistedCheckoutReducer = persistReducer(checkoutPersistConfig, checkoutReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    checkout: checkoutReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  
}
)

export let persistor = persistStore(store)