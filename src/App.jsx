import React, { lazy, Suspense, useEffect } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  redirect,
  useLocation
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './redux/store';
import { setShowCart } from './redux/cart/cartReducer';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress, Box } from '@mui/material'; // Import CircularProgress
import Home from './pages/Home/Home'; // No lazy loading for the Home page
import './app.scss';
import { initializeCheckout, resetCheckout } from './redux/checkout/checkoutReducer';

// Lazy load the pages that aren't immediately needed
const Products = lazy(() => import('./pages/Products/Products'));
const Product = lazy(() => import('./pages/Product/Product'));
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));
const CheckoutPage = lazy(() => import('./pages/Checkout/CheckoutPage'));
const CheckoutSuccess = lazy(() => import('./pages/Checkout/CheckoutSuccess/CheckoutSuccess'));
const Login = lazy(() => import('./pages/Auth/Login/LoginPage'));
const Register = lazy(() => import('./pages/Auth/Register/RegisterPage'));
const MyAccount = lazy(() => import('./pages/Auth/MyAccount/MyAccount'));

const navbarExcludedPaths = ['/login', '/register']

const dispatch = store.dispatch
const checkoutLoader = async ({ request }) => {
  console.log('checkout loader')
  try {

    const response = await store.dispatch(initializeCheckout({ reserve: true })).unwrap();
    console.log('response in loader', response)
    const { validationResults, checkoutSessionAlreadyExists, checkoutSessionDuration, checkoutSessionExpiresAt, status } = response;

    const sessionHasExpired = new Date() > new Date(checkoutSessionExpiresAt)
    console.log('sessionHasExpired', sessionHasExpired);

    if (status === 'initialized') {
      const { successfulItems, outOfStockItems } = validationResults;

      if (outOfStockItems?.length > 0) {
        throw new Response('Some items are out of stock', { status: 302, headers: { Location: '/cart' } });
      }

      if (successfulItems?.length <= 0) {
        throw new Response('Your cart is empty, add some items!', { status: 302, headers: { Location: '/cart' } });
      }
      
      dispatch(resetCheckout())

      return { checkoutSessionDuration, checkoutSessionAlreadyExists }
    } else {
      console.log('status', status)

      if (status === 'completed') {
        dispatch(resetCheckout())
        
        toast.info('Checkout sessoon complete already. Check your orders page.')
        return redirect("/products/women")
      }

      if (status === 'expired') {
        dispatch(resetCheckout())

        // dispatch(resetCheckout())
        // toast.info('Checkout sessoon complete already. Check your orders page.')
        return redirect("/cart")

      }


      console.log('checkoutSessionAlreadyExists', checkoutSessionAlreadyExists);
      return { checkoutSessionAlreadyExists, status }
    }


  } catch (error) {
    console.error('Error initializing checkout', error);
    return { status: 500, message: 'Failed to initialize checkout' }; // Handle error appropriately
  }
};

const Layout = () => {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.cart.showCart);

  const { pathname } = useLocation();
  const displayNavbar = !navbarExcludedPaths.includes(pathname)
  // console.log('pathname', pathname);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.mini-cart, .cartIcon, .delete')) {
        dispatch(setShowCart(false)); // Close the navbar if clicked outside
      }
    };

    // Add event listener when component mounts
    document.addEventListener('click', handleOutsideClick);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };

  }, [dispatch]);

  return (
    <div className="app">
      {displayNavbar && <Navbar />}
      <div id="content" className={`${displayNavbar ? 'navbar-visible': ''}`}>
        <div className={`darkOverlay ${showCart ? 'show' : ''}`}></div>
        <ToastContainer />
        <Outlet />
      </div>
    </div>
  );
};

// Create a reusable fallback component for the CircularProgress
const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

// Define routes and lazy load components except for Home
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />  // Home page is eagerly loaded
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CheckoutPage />
          </Suspense>
        ),
        loader: checkoutLoader,
      },
      {
        path: "/checkout-success",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CheckoutSuccess />
          </Suspense>
        ),
      },
      {
        path: '/products/:slug',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: '/product/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: '/my-account',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MyAccount />
          </Suspense>
        ),
      },
    ]
  }
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
