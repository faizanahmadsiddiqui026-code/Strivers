import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import CustomerHome from "../pages/customer/CustomerHome";
import VendorHome from "../pages/vendor/VendorHome";
import Login from "../pages/customer/CustLogin";
import Signup from "../pages/customer/CustSignup";
import VendorLogin from "../pages/vendor/VendorLogin";
import VendorSignup from "../pages/vendor/VendorSignup";
import Cart from "../pages/customer/Cart";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/customer/login",
    element: <Login />,
  },
  {
    path: "/customer/signup",
    element: <Signup />,
  },
  {
    path: "/customer/home",
    element: <CustomerHome />,
  },
  {
    path: "/vendor/login",
    element: <VendorLogin />,
  },
  {
    path: "/vendor/signup",
    element: <VendorSignup />,
  },
  {
    path: "/vendor/home",
    element: <VendorHome />,
  },
  {
    path: "/customer/cart",
    element: <Cart />,
  },
]);