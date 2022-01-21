import axios from "axios";
import {ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST,CLEAR_ERRORS,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS} from "../constants/productConstants";

export const getProduct = () => async (dispatch) => {
    try {
        // const {data} = await axios.get("api/v1/products");
        // console.log(data);
        dispatch({
            type : ALL_PRODUCT_REQUEST,
        });
        const {data} = await axios.get("api/v1/products");
        dispatch({
            type : ALL_PRODUCT_SUCCESS,
            payload : data,
        }); 
    } catch (error) {
      console.log(error);
        dispatch({
            type : ALL_PRODUCT_FAIL,
            payload : error.response.data.message || error,
        });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v1/product/${id}`);
      // console.log(data);
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};