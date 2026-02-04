const jwt = require("jsonwebtoken");

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });
}

function signRefreshToken(payload) {
  const days = Number(process.env.REFRESH_EXPIRES_DAYS || 7);
  return jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: `${days}d`,
  });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_SECRET);
}

module.exports = { signAccessToken, signRefreshToken, verifyRefreshToken };
