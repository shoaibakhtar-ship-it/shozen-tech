const express =
  require("express");

const authMiddleware =
  require("../middleware/authMiddleware");

const uploadProjectImage =
  require("../middleware/uploadMiddleware");

const router =
  express.Router();

router.post(
  "/project-image",

  authMiddleware,

  uploadProjectImage.single(
    "image"
  ),

  (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Project image is required.",
        });
    }

    const imageUrl =
      req.file.path;

    if (!imageUrl) {
      return res
        .status(500)
        .json({
          success: false,
          message:
            "Cloudinary image upload failed.",
        });
    }

    return res
      .status(201)
      .json({
        success: true,

        message:
          "Image uploaded successfully.",

        data: {
          image:
            imageUrl,
        },
      });
  }
);

module.exports = router;