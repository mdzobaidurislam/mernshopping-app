const express = require("express");
const path = require("path");
const {errorHandler} = require("../middlewares/ErrorMiddlewares")
const dotenv = require("dotenv");
const connectDb = require("../config/config");

// routes 
const Web = require('../routes/web')

// dotenv config
dotenv.config();
// connecting to mongodb database
connectDb();
const app = express();
//Middleware body parser
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../client/build")))
  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname,"../client","build","index.html"));
  })
}else{
  app.get("/", (req, res) => {
    res.send("<h1>Node server</h1>");
  });
}

// products api
app.use('/api',Web)

// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })

app.use(errorHandler)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server Running IN port Mode on '${PORT}`
  );
});
