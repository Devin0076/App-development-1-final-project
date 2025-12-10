// Global error handler that sends consistent JSON error responses

module.exports = (err, req, res, next) => {
  console.error(err); // Log the error for debugging

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    error: err.message || "Internal server error",
  });
};
