import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import HomeScreens from "./screens/HomeScreens.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PrivateRoute from "./Componets/PrivateRoute.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import AdminRoute from "./Componets/AdminRoute.jsx";
import OrderListScreen from "./screens/OrderListScreen.jsx";
import ProductListScreen from "./screens/Admin/ProductListScreen.jsx";
import ProductEditScreen from "./screens/Admin/ProductEditScreen.jsx";
import UserListScreen from "./screens/Admin/UserListScreen.jsx";
import UserUpdateScreen from "./screens/Admin/UserUpdateScreen.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeScreens />,
      },
      {
        path: "/page/:pageNumber",
        element: <HomeScreens />,
      },
      {
        path: "/product/:id",
        element: <ProductScreen />,
      },
      {
        path: "/cart",
        element: <CartScreen />,
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            path: "/shipping",
            element: <ShippingScreen />,
          },
          {
            path: "/payment",
            element: <PaymentScreen />,
          },
          {
            path: "/placeorder",
            element: <PlaceOrderScreen />,
          },
          {
            path: "/order/:id",
            element: <OrderScreen />,
          },
          {
            path: "/profile",
            element: <ProfileScreen />,
          },
        ],
      },
      {
        path: "",
        element: <AdminRoute />,
        children: [
          {
            path: "/admin/orderlist",
            element: <OrderListScreen />,
          },
          {
            path: "/admin/productlist",
            element: <ProductListScreen />,
          },
          {
            path: "/admin/productlist/:pageNumber",
            element: <ProductListScreen />,
          },
          {
            path: "/admin/product/:id/edit",
            element: <ProductEditScreen />,
          },
          {
            path: "/admin/userlist",
            element: <UserListScreen />,
          },
          {
            path: "/admin/user/:id/edit",
            element: <UserUpdateScreen />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
