import React, { Fragment, useEffect,useState } from 'react';
// import Carousel from "react-material-ui-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { getProductDetails,clearErrors } from '../../actions/productAction';
import { useLocation } from "react-router-dom";
import MetaData from '../layout/Header/MetaData';
// import ReactStars from 'react-rating-stars-component';
import { Rating } from "@material-ui/lab";
import ReviewCard from './ReviewCard.js';
// import {useAlert} from 'react-alert';
import {addItemsToCart} from '../../actions/cartAction';

const ProductDetails = () => {
  let id = useLocation().pathname.split('/')[2];
  // console.log(match);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(state => state.productDetails);

  const [quantity,setQuantity] = useState(1);

  const increaseQuantity = () =>{
    if(quantity<product.stock){
      const qty = quantity + 1;
      setQuantity(qty);
    }else{
      alert.show("Stock limit reached");
    }
  };

  const decreaseQuantity = () =>{
    if(quantity>1){
      const qty = quantity - 1;
      setQuantity(qty);
    }else{
      setQuantity(1);
    }
    
  };

  const addToCartHandler = () => {
    if(quantity>product.stock){
      alert.show("Item is out of stock.");
      return;
    }
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  }
  // if(product.stock<1){
  //   setQuantity(0);
  // }
  useEffect(() => {
    
    console.log(error);
    // alert.show("Hey there");
    if (error) {
        // alert.error(error);
        dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
}, [dispatch,id,quantity]);
if (error) {
    alert.error(error);
}

  // useEffect(() => {
  //   dispatch(getProductDetails(id));
  // }, [dispatch, id]);

  const options = {
    size: "large",
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (<Fragment>
    {loading ?
             <Loader/> : (
             <Fragment>
    <MetaData title="Product View" />
    <div className="ProductDetails">
      <div style={{width:"100vmax"}}>
        <Carousel width="70%" height="70%">
          {/* {getProductDetails(match.params.id)} */}
          {product.images &&
            product.images.map((item, i) => (
              <img
                className="CarouselImage"
                key={i}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
        </Carousel>
      </div>
      <div>
        <div className="detailsBlock-1">
          <h2>{product.name}</h2>
          <p>Product # {product._id}</p>
        </div>
        <div className="detailsBlock-2">
          <Rating {...options} />
          <span className="detailsBlock-2-span">
            {" "}
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <div className="detailsBlock-3">
          <h1>{`₹${product.price}`}</h1>
          <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
            {/* <button >-</button> */}
              <button onClick={decreaseQuantity}>-</button>
              <input readOnly type="number" value={quantity} />
              {/* <input readOnly type="number" value="5" /> */}
              <button onClick={increaseQuantity}>+</button>
              {/* <button >+</button>  */}
            </div>
            <button
              disabled={product.stock < 1 ? true : false}
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
          <p>
            Status : <b className={product.stock < 1 ? "redColor" : "greenColor"}>
              {product.stock < 1 ? "OutOfStock" : "InStock"}
            </b>
          </p>
        </div>
        <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              {/* <button onClick={submitReviewToggle} className="submitReview"> */}
              <button className="submitReview">
                Submit Review
              </button>
      </div>
    </div>
    <h3 className="reviewsHeading">REVIEWS</h3>
    {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  // <p>Hey</p>
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
    
    </Fragment>)}
  </Fragment>
  )
};

export default ProductDetails;
