const express = require('express')
const Product = require('../models/ProductsModel')
const asyncHandler = require('express-async-handler')
const router = express.Router()

// GET ROUTE FOR ALL PRODUCTS 
router.get("/products/",asyncHandler( async (req, res) => {
    const products = await Product.find({})
    res.json(products);
  })
  )
  
  // single product
router.get('/products/:id',asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404).json({message: 'Product not found'})
    }
}))


  module.exports = router