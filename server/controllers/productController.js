const Product = require("../models/Product");

exports.createProduct = async (req, res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//get products
exports.getProducts = async (req, res) =>{
    try{
        const products = await Product.find();
        res.json(products);
    }catch(error) {
        res.status(500).json({message: error.message});
    }
};

//get a single product
exports.getProductById = async (req,res)=> {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({message:"Product not found"});
        res.json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};