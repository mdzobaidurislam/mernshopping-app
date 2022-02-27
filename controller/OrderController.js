const Order = require("../models/OrdersModel");
const User = require("../models/UsersModel");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");

class OrderController {
  // ADD ORDER ITEM
  static addOrderItem = asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalItemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(404);
      throw new Error("No order Found");
    } else {
      const user = await User.findById(req.userAuth._id);
      const orders = new Order({
        orderItems: orderItems,
        User: user._id,
        shippingAddress: shippingAddress,
        payment: paymentMethod,
        totalItemPrice: totalItemPrice,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
      });
      const createOrder = await orders.save();
      res.status(201).json(createOrder);
    }
  });
  // Get user order
  static getUsersOrders = asyncHandler(async (req, res) => {
    const order = await Order.find({ User: req.userAuth._id });
    if (order) {
      res.json(order);
    } else {
      res.status(401);
      throw new Error("Order not found");
    }
  });

  // get order by id
  static getUsersOrderById = asyncHandler(async (req, res) => {
    const orderById = await Order.findById(req.params.id).populate(
      "User",
      "name email phone"
    );
    if (orderById) {
      res.json(orderById);
    } else {
      res.status(401);
      throw new Error("Order not found");
    }
  });

  // paidendpoin
  static orderPay = asyncHandler(async (req, res) => {
    const { token, totalPrice, userInfo, orderId } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: totalPrice * 100,
        currency: "USD",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const order = await Order.findById(orderId);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.stripePayInfo = {
          name: token.card.name,
          email: token.email,
          shippingAddress: {
            address: token.card.address_line1,
            city: token.card.address_city,
            postalCode: token.card.address_zip,
            country: token.card.address_country,
          },
          transectionId: payment.source.id,
        };
        const updateOrder = await order.save();
        res.json(updateOrder);
        // const transporter = nodemailer.createTransport({
        //   service: 'gmail',
        //   auth: {
        //     user: "freelancerjami@gmail.com",
        //     pass: "j23144636m",
        //   },
        // });
        // const mailOptions = {
        //   from: "freelancerjami@gmail.com",
        //   to: token.email,
        //   subject: `Your Order id: ${orderId}`,
        //   text: "Thanks for your order!",
        //   html: `<h1>Welcome</h1><p>That was easy!</p>`,
        // };
        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     res.json(error);
        //     // throw new Error("Mail Not sent!");
        //   } else {
        //     res.json(updateOrder);
        //   }
        // });
      }
    } else {
      res.status(404);
      throw new Error("Payment Faild!");
    }
  });

  // paidendpoin
  // static orderPay = asyncHandler(async (req, res) => {
  //   const order = await Order.findById(req.params.id);
  //   if (order) {
  //       order.isPaid = true
  //       order.paidAt = Date()
  //       order.paymentResult = {
  //         id: req.body.id,
  //         status: req.body.status,
  //         update_time: req.body.update_time,
  //         email_address: req.body.payer.email_address,
  //       };
  //     const updateOrder = await order.save();
  //     res.json(updateOrder);
  //   } else {
  //     res.status(404);
  //     throw new Error("Order not found");
  //   }
  // });
}

module.exports = OrderController;
