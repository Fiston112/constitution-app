const { badRequest } = require("../utils/errors");

function validate(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return next(badRequest("Validation error", parsed.error.flatten()));
    }
    req.body = parsed.data;
    next();
  };
}

module.exports = { validate };
