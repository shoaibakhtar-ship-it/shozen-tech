const express = require("express");

const {
  createContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
  deleteContactController,
} = require("../controllers/contactController");

const authMiddleware = require("../middleware/authMiddleware");

const {
  validateRequiredFields,
  validateEmail,
} = require("../middleware/validateRequest");

const router = express.Router();

router.post(
  "/",
  validateRequiredFields([
    "name",
    "email",
    "message",
  ]),
  validateEmail,
  createContactController
);

router.get(
  "/",
  authMiddleware,
  getAllContactsController
);

router.get(
  "/:id",
  authMiddleware,
  getContactByIdController
);

router.patch(
  "/:id",
  authMiddleware,
  updateContactController
);

router.delete(
  "/:id",
  authMiddleware,
  deleteContactController
);

module.exports = router;