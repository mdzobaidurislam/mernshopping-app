const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dataUsers = require("./data/users");
const dataProducts = require("./data/products");
// models
const Users = require("./models/UsersModel");
const Products = require("./models/ProductsModel");
const Orders = require("./models/OrdersModel");
const connectDb = require("./config/config");

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await Orders.deleteMany();
    await Products.deleteMany();
    await Users.deleteMany();
    const createUser = await Users.insertMany(dataUsers);
    const adminUser = createUser[0]._id;
    const sampleData = dataProducts.map((product) => {
      return { ...product, User: adminUser };
    });
    await Products.insertMany(sampleData);
    console.log("Data imported!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const dataDestroy = async () => {
  try {
    await Orders.deleteMany();
    await Products.deleteMany();
    await Users.deleteMany();
    console.log("Data Data Destroy");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  dataDestroy();
} else {
  importData();
}
