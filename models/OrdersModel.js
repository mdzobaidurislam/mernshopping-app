const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Users",
    },
    orderItems: [
      {
        name: {
          type: String,
          require: true,
        },
        qty: {
          type: Number,
          require: true,
        },
        price: {
          type: Number,
          require: true,
        },
        image: {
          type: String,
          require: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "Products",
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        require: true,
      },
      city: {
        type: String,
        require: true,
      },
      postalCode: {
        type: Number,
        require: true,
      },
      country: {
        type: String,
        require: true,
      },
    },
    payment: {
      type: String,
      require: true,
    },
    paymentResult: {
      id: {
        type: String,
        require: true,
      },
      status: { type: String, require: true },
      update_time: { type: String, require: true },
      email_address: { type: String, require: true },
    },
    stripePayInfo: {
      name: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
      shippingAddress: {
        address: {
          type: String,
          require: true,
        },
        city: {
          type: String,
          require: true,
        },
        postalCode: {
          type: Number,
          require: true,
        },
        country: {
          type: String,
          require: true,
        },
      },
      transectionId: {
        type: String,
        require: true,
      },
    },
    taxPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    totalItemPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      require: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelevired: {
      type: Boolean,
      require: true,
      default: false,
    },
    DeliveryAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;
