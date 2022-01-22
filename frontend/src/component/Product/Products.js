import React,{Fragment,useEffect,useState} from 'react';
import './Products.css';
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors,getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import MetaData from "../layout/Header/MetaData";
import { useLocation } from "react-router-dom";
import Pagination from 'react-js-pagination';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";


const Products = () => {
    const dispatch = useDispatch();
    let keyword = useLocation().pathname.split('/')[2];
    // console.log(keyword);

    const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
//   const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
      } = useSelector((state) => state.products);;

      const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };
    
      const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };
      let count = filteredProductsCount;
    useEffect(() => {
        dispatch(getProduct(keyword,currentPage));
    }, [dispatch,keyword,currentPage]);
    

  return <Fragment>
      {loading?
      <Loader/>
      :(<Fragment>
            <MetaData title="PRODUCTS -- ECOMMERCE" />
            <h2 className="productsHeading">Products</h2>
            <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox" style={{border: '1px solid',padding: '10px'}}>
              <h3 style={{borderBottom: '1px solid' , marginBottom:"5px"}}>Search Filter : </h3>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            </div>
          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
           )}
    </Fragment>)}
  </Fragment>;
};

export default Products;
