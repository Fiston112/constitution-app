class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

function notFound(message = "Route not found") {
  return new AppError(message, 404);
}

function unauthorized(message = "Unauthorized") {
  return new AppError(message, 401);
}

function badRequest(message = "Bad request", details = null) {
  return new AppError(message, 400, details);
}

function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Internal server error",
    details: err.details || null,
  });
}

module.exports = { AppError, notFound, unauthorized, badRequest, errorHandler };
