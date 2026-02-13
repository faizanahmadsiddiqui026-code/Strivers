import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import CustomerHome from "../pages/customer/CustomerHome";
import VendorHome from "../pages/vendor/VendorHome";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

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
    path: "/customer",
    element: <CustomerHome />,
  },
  {
    path: "/vendor/login",
    element: <Login />,
  },
  {
    path: "/vendor/signup",
    element: <Signup />,
  },
  {
    path: "/vendor",  
    element: <VendorHome />,
  },
]);
