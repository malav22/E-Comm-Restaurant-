import React, { Component,Fragment,useEffect } from 'react';
import {CgMouse} from 'react-icons/all';
import './Home.css';
import Product from './Product.js';
import MetaData from '../layout/Header/MetaData';
import {getProduct} from "../../actions/productAction";
import {useSelector,useDispatch} from "react-redux";

const Home = () =>{

    const dispatch = useDispatch();
    const {loading,error,products,productsCount} = useSelector(state=>state.products)
    console.log(products);
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);
    

    return (
        <Fragment>
            {loading ?
             ("loading") : (
             <Fragment>
        <MetaData title="E-Commerce"/>
        <div className="banner">
            <p>Welcome to E-Commerce.</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
                <button>
                    Scroll <CgMouse/>
                </button>
            </a>
        </div>
        <div>
            <h2 className="homeHeading">
                Featured Products
            </h2>
        </div>
        <div className="container" id="container">
            {products && products.map((product) => <Product product={product}/>)}
            {/* <Product product={products[0]}/>     */}    

        </div>
    </Fragment>)}
        </Fragment>
    )
}

export default Home;
