const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/tokens");

function refreshCookieOptions() {
  const secure = String(process.env.COOKIE_SECURE) === "true";
  return {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
    path: "/api/v1/auth/refresh",
  };
}

async function login(req, res) {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email, actif: true });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const payload = {
    sub: String(admin._id),
    role: admin.role,
    email: admin.email,
  };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken({ sub: payload.sub });

  res.cookie("refreshToken", refreshToken, refreshCookieOptions());
  return res.json({ accessToken });
}

async function me(req, res) {
  // req.user est injecté par requireAuth
  return res.json({ admin: req.user });
}

async function refresh(req, res) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "Missing refresh token" });

  try {
    const decoded = verifyRefreshToken(token); // { sub, iat, exp }
    const admin = await Admin.findById(decoded.sub);
    if (!admin || !admin.actif)
      return res.status(401).json({ message: "Invalid refresh token" });

    const payload = {
      sub: String(admin._id),
      role: admin.role,
      email: admin.email,
    };
    const accessToken = signAccessToken(payload);

    // Option: rotation refresh token (recommandé)
    const newRefresh = signRefreshToken({ sub: payload.sub });
    res.cookie("refreshToken", newRefresh, refreshCookieOptions());

    return res.json({ accessToken });
  } catch {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
}

async function logout(req, res) {
  res.clearCookie("refreshToken", { path: "/api/v1/auth/refresh" });
  return res.json({ message: "Logged out" });
}

module.exports = { login, me, refresh, logout };
