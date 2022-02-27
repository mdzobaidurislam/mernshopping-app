const express = require("express");
const OrderController = require("../controller/OrderController");
const router = express.Router();
const ProductController = require("../controller/ProductController");

const UserController = require("../controller/UserController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * route
 * router.route('/products').get(ProductController.getAllDocuments)
 *
 */

/**********************
 * Products Route
 **********************/
// All products
router.get("/products", ProductController.getAllDocuments);
// single product
router.get("/products/:id", ProductController.getSingleProduct);

// All Admin Route
router.route("/admin/addproduct").post(protect, ProductController.addProduct);


/**********************
 * User Route
 **********************/
// Admin routers
router.route("/admin").get(protect, UserController.getAdmin);
//  User routers
router.post("/users/login", UserController.LoginUserDocuments);
router.post("/users/register", UserController.registerUser);
router
  .route("/users/profile")
  .get(protect, UserController.getUserprofile)
  .put(protect, UserController.updateUserProfile);

/**********************
 * Order Route
 **********************/
// create a new order
router.route("/order/:id").get(protect, OrderController.getUsersOrderById);
// order pay  
router.route("/order/pay").post(protect, OrderController.orderPay);

router
  .route("/order")
  .get(protect, OrderController.getUsersOrders)
  .post(protect, OrderController.addOrderItem);

module.exports = router;
