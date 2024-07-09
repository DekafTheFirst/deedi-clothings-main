import {
  RouterProvider,
  createBrowserRouter,
  Outlet
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

  return (
    <div className="app">
      <Navbar setShowCart={setShowCart} />
      <div id="content">
        {showCart && <Cart setShowCart={setShowCart} showCart={showCart} />}
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
        path: "/cart-page",
        element: <CartPage />
      },
      {
        path: '/products/:slug',
        element: <Products />
      },
      {
        path: '/product/:id',
        element: <Product />
      },

    ]
  }

])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
