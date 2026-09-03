const ApiError = require("../utils/ApiError");

const validateRequiredFields = (fields) => {
  return (req, res, next) => {
    const missingFields = fields.filter((field) => {
      const value = req.body[field];

      if (value === undefined || value === null) {
        return true;
      }

      if (
        typeof value === "string" &&
        value.trim() === ""
      ) {
        return true;
      }

      return false;
    });

    if (missingFields.length > 0) {
      throw new ApiError(
        400,
        `Missing required fields: ${missingFields.join(", ")}`
      );
    }

    next();
  };
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next();
  }

  if (typeof email !== "string") {
    throw new ApiError(
      400,
      "Please provide a valid email address"
    );
  }

  const normalizedEmail = email
    .trim()
    .toLowerCase();

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(normalizedEmail)) {
    throw new ApiError(
      400,
      "Please provide a valid email address"
    );
  }

  req.body.email = normalizedEmail;

  next();
};

const validateProjectData = (
  req,
  res,
  next
) => {
  const {
    technologies,
    featured,
  } = req.body;

  if (
    technologies !== undefined &&
    !Array.isArray(technologies)
  ) {
    throw new ApiError(
      400,
      "Technologies must be an array"
    );
  }

  if (
    technologies !== undefined &&
    !technologies.every(
      (item) => typeof item === "string"
    )
  ) {
    throw new ApiError(
      400,
      "Every technology must be a string"
    );
  }

  if (
    featured !== undefined &&
    typeof featured !== "boolean"
  ) {
    throw new ApiError(
      400,
      "Featured must be true or false"
    );
  }

  next();
};

const validateServiceData = (
  req,
  res,
  next
) => {
  const {
    features,
    active,
  } = req.body;

  if (
    features !== undefined &&
    !Array.isArray(features)
  ) {
    throw new ApiError(
      400,
      "Features must be an array"
    );
  }

  if (
    features !== undefined &&
    !features.every(
      (item) => typeof item === "string"
    )
  ) {
    throw new ApiError(
      400,
      "Every feature must be a string"
    );
  }

  if (
    active !== undefined &&
    typeof active !== "boolean"
  ) {
    throw new ApiError(
      400,
      "Active must be true or false"
    );
  }

  next();
};

module.exports = {
  validateRequiredFields,
  validateEmail,
  validateProjectData,
  validateServiceData,
};