const Product = require("../models/ProductsModel");
const User = require("../models/UsersModel");
const asyncHandler = require("express-async-handler");

class ProductController {
  // GET ALL PRODUCTS
  static getAllDocuments = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  });

  // GET SINGLEL PRODUCT
  static getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });

  // Add Product
  static addProduct = asyncHandler(async (req, res) => {
    const { name, brand, category, description, price, image ,countInStock} = req.body;
    const user = await User.findById(req.userAuth._id);
    if (user.isAdmin) {
      const product = await Product.create({
        name,
        User: user._id,
        brand,
        category,
        description,
        price,
        image,
        countInStock,
      });
      if (product) {
        res.status(201);
        res.json({
          product:"Product Successfully Added!"
        });
      } else {
        res.status(404);
        throw new Error("Product not added!");
      }
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  });
}

module.exports = ProductController;
