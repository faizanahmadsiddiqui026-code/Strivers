import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import CustomerHome from "../pages/customer/CustomerHome";
import VendorHome from "../pages/vendor/VendorHome";
// import CustomerHome from "../pages/customer/CustomerHome";
// import VendorHome from "../pages/vendor/VendorHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/customer",
    element: <CustomerHome />,
},
  {
    path: "/vendor",
    element: <VendorHome />,
  },
]);
