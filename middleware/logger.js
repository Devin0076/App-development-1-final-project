// Basic request logger that prints the HTTP method and URL for each incoming request


module.exports = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};
