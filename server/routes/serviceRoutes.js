const express = require("express");

const {
  getAllServicesController,
  getServiceBySlugController,
  createServiceController,
  updateServiceController,
  deleteServiceController,
} = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");

const {
  validateRequiredFields,
  validateServiceData,
} = require("../middleware/validateRequest");

const router = express.Router();

router.get(
  "/",
  getAllServicesController
);

router.get(
  "/:slug",
  getServiceBySlugController
);

router.post(
  "/",
  authMiddleware,
  validateRequiredFields([
    "title",
    "slug",
    "description",
  ]),
  validateServiceData,
  createServiceController
);

router.patch(
  "/:id",
  authMiddleware,
  validateServiceData,
  updateServiceController
);

router.delete(
  "/:id",
  authMiddleware,
  deleteServiceController
);

module.exports = router;