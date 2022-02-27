const mongoose = require('mongoose');

// review schema
const reviewSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
},{timestamps:true})


// productSchema
const productsSchema = mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Users'
    },
    name: {
        type:String,
        required: true
    },
    image: {
        type:String,
        // required: true
    },
    brand: {
        type:String,
        required: true
    },
    category: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type:Number,
        default: 0
        // required: true
    },
    numReviews: {
        type:Number,
        default: 0,
        // required: true
    },
    price: {
        type:Number,
        required: true
    },
    countInStock: {
        type:Number,
        required: true
    },
},{timestamps:true})

const Products = mongoose.model('Products',productsSchema)

module.exports = Products 