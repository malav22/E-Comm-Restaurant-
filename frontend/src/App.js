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

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const alert = useAlert()
  React.useEffect(()=>{
    webFont.load({
      google:{
        families: ["Roboto","Droid Sans","Chilanka"],
      }
    });

    store.dispatch(loadUser());

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

      </Routes>
      <Footer/>      
    </BrowserRouter>
  );
}

export default App;
