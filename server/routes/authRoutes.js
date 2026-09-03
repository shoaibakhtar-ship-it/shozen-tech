const express = require("express");

const {
  loginAdmin,
  getMe,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const {
  validateRequiredFields,
  validateEmail,
} = require("../middleware/validateRequest");

const router = express.Router();

router.post(
  "/login",
  validateRequiredFields([
    "email",
    "password",
  ]),
  validateEmail,
  loginAdmin
);

router.get(
  "/me",
  authMiddleware,
  getMe
);

module.exports = router;