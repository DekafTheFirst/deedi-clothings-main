import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  useLocation
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
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import { syncCartOnPageRefresh } from './redux/cartReducer';


const Layout = () => {
  const [showCart, setShowCart] = useState(false);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.mini-cart, .cartIcon, .delete')) {
        setShowCart((prev) => false); // Close the navbar if clicked outside
      }
    };

    // Add event listener when component mounts
    document.addEventListener('click', handleOutsideClick);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };

  }, []);

  // const dispatch = useDispatch();


  // useEffect(() => {
  //   dispatch(syncCartOnPageRefresh());
  // }, [dispatch]);




  return (
    <div className="app">
      <ScrollToTop />
      <Navbar setShowCart={setShowCart} showCart={showCart} />
      <div id="content">
        <div className={`darkOverlay ${showCart ? 'show' : ''}`}></div>
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
        // loader: checkCartItemsLoader,
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
