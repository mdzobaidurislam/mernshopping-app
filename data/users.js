const bcrypt = require('bcryptjs');
const Users = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password:bcrypt.hashSync("123456", 10),
    phone: "01812409989",
    isAdmin: true,
  },
  {
    name: "techIt",
    email: "techit@gmail.com",
    password:bcrypt.hashSync("123456", 10),
    phone: "01812409989",
    isAdmin: false,
  },
  {
    name: "user",
    email: "user@gmail.com",
    password:bcrypt.hashSync("123456", 10),
    phone: "01812409989",
    isAdmin: true,
  },
];

module.exports = Users