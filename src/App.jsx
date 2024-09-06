import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  useLocation,
  useNavigate,
  redirect
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Product from './pages/Product/Product';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import "./app.scss"
import { useEffect, useState } from 'react';
import Cart from './components/MiniCart/MiniCart';
import CartPage from './pages/CartPage/CartPage';
import ShippingPage from './pages/Checkout/CheckoutPage';
import ScrollToTop from './components/ScrollToTop';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import CheckoutSuccess from './pages/Checkout/CheckoutSuccess/CheckoutSuccess';
import checkCartItemsLoader from './components/checkCartItemsLoader/checkCartItemsLoader';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './redux/store';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import { setShowCart } from './redux/cart/cartReducer';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { initializeCheckout, resetCheckout } from './redux/checkout/checkoutReducer';
import { loadStripe } from '@stripe/stripe-js';

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

        // toast.info('Checkout sessoon complete already. Check your orders page.')
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
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.cart.showCart);

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

  }, []);






  return (
    <div className="app">
      {/* <ScrollToTop /> */}
      <Navbar />
      <div id="content">
        <div className={`darkOverlay ${showCart ? 'show' : ''}`}></div>
        <ToastContainer />
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  )
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
        loader: checkoutLoader,
      },
      {
        path: "/checkout-success",
        element: <CheckoutSuccess />
      },
      {
        path: '/products/:slug',
        element: <Products />
      },
      {
        path: '/product/:id',
        element: <Product />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },



    ]
  }

])

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
