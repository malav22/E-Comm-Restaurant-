import './App.css';
import Header from './component/layout/Header/Header.js';
import { BrowserRouter , Route,Routes } from 'react-router-dom';
import webFont from 'webfontloader';
import React  from 'react';
import Footer from './component/layout/Footer/Footer.js';
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import { useAlert } from 'react-alert'
import Loader from './component/layout/Loader/Loader';
import Products from './component/Product/Products.js'
import Search from './component/Product/Search.js'
import LoginSignUp from './component/User/LoginSignUp.js'
import Profile from './component/User/Profile.js'
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from './component/User/UpadteProfile.js';
import UpdatePassword from './component/User/UpadtePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import { useEffect, useState } from "react";
import Payment from './component/Cart/Payment.js';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js"

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
  const { data } = await axios.get("/api/v1/stripeapikey");
  // console.log(data);
    setStripeApiKey(data.stripeApiKey);
  }
  const alert = useAlert()
  React.useEffect(()=>{
    webFont.load({
      google:{
        families: ["Roboto","Droid Sans","Chilanka"],
      }
    });

    store.dispatch(loadUser());
    getStripeApiKey();

  },[]);
  return (
    <BrowserRouter>
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route  path="/" element={<Home />}></Route>
        <Route  path="/loader" element={<Loader />}></Route>
        <Route  path="/product/:id" element={<ProductDetails />}></Route>
        <Route  path="/products" element={<Products />}></Route>
        <Route  path="/products/:keyword" element={<Products />}></Route>
        <Route  path="/Search" element={<Search />}></Route>
        <Route  path="/login" element={<LoginSignUp />}></Route>
        <Route  path="/account" element={<Profile />}></Route>
        <Route  path="/me/update" element={<UpdateProfile />}></Route>
        <Route  path="/password/update" element={<UpdatePassword />}></Route>
        <Route  path="/password/forgot" element={<ForgotPassword />}></Route>
        <Route path="/password/reset/:token" element={<ResetPassword/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/shipping" element={<Shipping/>}></Route>
        <Route path="/order/confirm" element={<ConfirmOrder/>}></Route>
        {stripeApiKey &&
            <Route path="/process/payment" element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment/>
              </Elements>
            }>
            </Route>
        }
        <Route path="/success" element={<OrderSuccess/>}></Route>
      </Routes>
      <Footer/>      
    </BrowserRouter>
  );
}

export default App;
