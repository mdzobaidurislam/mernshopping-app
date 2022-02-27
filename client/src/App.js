// import "./components/Frontend/assets/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/Frontend/About/About";
import Home from "./components/Frontend/Home/Home";
import Product from "./components/Frontend/Product/Product";
import ProductDatails from "./components/Frontend/Product/ProductDatails";
import Cart from "./components/Frontend/Cart/Cart";
import Login from "./components/Frontend/Login/Login";
import Register from "./components/Frontend/Register/Register";

import Layout from "./components/Frontend/Profile/Layout";
import Dashboard from "./components/Frontend/Profile/Dashboard";
import Profile from "./components/Frontend/Profile/Profile";
import Shipping from "./components/Frontend/Shipping/Shipping";
import Payment from "./components/Frontend/Payment/Payment";
import OrderPlace from "./components/Frontend/Order/OrderPlace";
import Order from "./components/Frontend/Order/Order";
import SingleOrder from "./components/Frontend/Order/SingleOrder";
import NotFound from "./components/Frontend/NotFound/NotFound";

import AdminLayout from "./components/Admin/AdminLayout/AdminLayout";
import AdminDashboard from "./components/Admin/RightSidebar/Dashboard";
import AdminInvoies from "./components/Admin/RightSidebar/Invoies";
import AdminProduct from "./components/Admin/AdminContent/AdminProduct";
import AddProduct from "./components/Admin/AdminContent/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route path="admin" element={<AdminLayout />}/> */}
          <Route path="about" element={<About />} />
          <Route path="product" element={<Product />} />
          <Route path="product/:id" element={<ProductDatails />} />
          <Route path="cart/*" element={<Cart />} />
          <Route path="cart/:id/:qty" element={<Cart />} />
          <Route path="login/*" element={<Login />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="payment" element={<Payment />} />
          <Route path="placeorder" element={<OrderPlace />} />
          <Route path="order/:id" element={<SingleOrder />} />
          <Route path="register" element={<Register />} />

          <Route path="user" element={<Layout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Order />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route index element={<Profile />} />
          </Route>
          <Route index element={<Product />} />
        </Route>
        {/* start admin route */}
        <Route path="admin/*" element={<AdminLayout />}>
          <Route  path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="Invoies" element={<AdminInvoies />} />
          <Route index  element={<AdminDashboard />} />
        </Route>
        {/* end admin route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
