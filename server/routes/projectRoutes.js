const express = require("express");

const {
  getAllProjectsController,
  getProjectBySlugController,
  createProjectController,
  updateProjectController,
  deleteProjectController,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

const {
  validateRequiredFields,
  validateProjectData,
} = require("../middleware/validateRequest");

const router = express.Router();

router.get(
  "/",
  getAllProjectsController
);

router.get(
  "/:slug",
  getProjectBySlugController
);

router.post(
  "/",
  authMiddleware,
  validateRequiredFields([
    "title",
    "slug",
    "description",
    "shortDescription",
    "category",
  ]),
  validateProjectData,
  createProjectController
);

router.patch(
  "/:id",
  authMiddleware,
  validateProjectData,
  updateProjectController
);

router.delete(
  "/:id",
  authMiddleware,
  deleteProjectController
);

module.exports = router;