const errorHandler = (err, req, res, next) => {

var status = (res === 200) ? 500 : status;
  res.status(401);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
module.exports = { errorHandler };
