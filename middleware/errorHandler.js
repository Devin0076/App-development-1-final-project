// Global error handler that sends consistent JSON error responses

module.exports = (err, req, res, next) => {
  console.error(err); // Log the error for debugging

  const statusCode = err.status || 500;

  // Handle common Sequelize validation and unique constraint errors
if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
  return res.status(400).json({
    error: 'Validation error',
    details: err.errors ? err.errors.map(e => e.message) : []
  });
}

  res.status(statusCode).json({
    error: err.message || "Internal server error",
  });
};
