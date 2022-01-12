const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Create product
exports.createProduct = catchAsyncErrors(async(req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});


//Get all products
exports.getAllProducts = catchAsyncErrors(async(req,res) => {
    
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products
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
        productCount
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