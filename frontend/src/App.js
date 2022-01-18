import './App.css';
import Header from './component/layout/Header/Header.js';
import { BrowserRouter , Route,Routes } from 'react-router-dom';
import webFont from 'webfontloader';
import React  from 'react';
import Footer from './component/layout/Footer/Footer.js';
import Home from "./component/Home/Home.js";

function App() {
  React.useEffect(()=>{
    webFont.load({
      google:{
        families: ["Roboto","Droid Sans","Chilanka"],
      }
    });
  },[]);

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" element={<Home />}></Route>
      </Routes>
      <Footer/>      
    </BrowserRouter>
  );
}

export default App;
