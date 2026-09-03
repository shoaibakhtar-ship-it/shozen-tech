const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME,

  api_key:
    process.env.CLOUDINARY_API_KEY,

  api_secret:
    process.env.CLOUDINARY_API_SECRET,
});

const storage =
  new CloudinaryStorage({
    cloudinary,

    params: async (
      req,
      file
    ) => ({
      folder:
        "shozen-tech/projects",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],

      public_id:
        `project-${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}`,
    }),
  });

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (
    !allowedTypes.includes(
      file.mimetype
    )
  ) {
    return cb(
      new Error(
        "Only JPG, PNG and WEBP images are allowed."
      ),
      false
    );
  }

  cb(null, true);
};

const uploadProjectImage =
  multer({
    storage,

    limits: {
      fileSize:
        5 * 1024 * 1024,
    },

    fileFilter,
  });

module.exports =
  uploadProjectImage;