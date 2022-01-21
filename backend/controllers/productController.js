const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Create product
exports.createProduct = catchAsyncErrors(async(req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});


//Get all products
exports.getAllProducts = catchAsyncErrors(async(req,res,next) => {
    
    // return next(new ErrorHander("This is an error",500));

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount
    });
});

//Get product details
exports.getProductDetails = catchAsyncErrors( async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product not found",404));
    }
    res.status(200).json({
        success: true,
        product,
    });  
});

//Update product -- Admin

exports.updateProduct = catchAsyncErrors(async(req, res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product not found",500));
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators : true,
        useFindAndModify : false
    });
    res.status(200).json({
        success : true,
        product
    });
});

//Delete product -- Admin

exports.deleteProduct = catchAsyncErrors(async(req, res, next) =>{
    let product = await Product.findById(req.params.id);
    console.log(product);
    if(!product){
        return next(new ErrorHander("Product not found",500));
    }

    await product.remove();

    res.status(200).json({
        success : true,
        message : "Product deleted successfully",
    });
});

//Get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async(req,res,next) =>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }
    res.status(200).json({
        success : true,
        reviews : product.reviews,
    });
});

//Delete a reviews
exports.deleteReview = catchAsyncErrors(async(req, res,next) =>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }

    const reviews = product.reviews.filter( rev => rev._id.toString() !== req.query.id.toString());
    
    let avg = 0;
    reviews.forEach(rev => {
        avg += rev.rating;
    });
    const rating = avg / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{reviews,rating,numOfReviews},{
        new:true,
        runValidators : true,
        useFindAndModify : false
    });


    res.status(200).json({
        success : true,
        message : "review deleted",
    });
});