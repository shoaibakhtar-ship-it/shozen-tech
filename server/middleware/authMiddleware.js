const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(
      401,
      "Authorization token required"
    );
  }

  const token = authHeader.split(" ")[1];

  let decoded;

  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(
        401,
        "Authorization token has expired"
      );
    }

    throw new ApiError(
      401,
      "Invalid authorization token"
    );
  }

  const admin = await Admin.findById(decoded.id);

  if (!admin) {
    throw new ApiError(
      401,
      "Admin not found"
    );
  }

  req.admin = admin;

  next();
});

module.exports = authMiddleware;