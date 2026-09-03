const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} = require("../services/serviceService");

const getAllServicesController = asyncHandler(async (req, res) => {
  const services = await getAllServices();

  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});

const getServiceBySlugController = asyncHandler(async (req, res) => {
  const service = await getServiceBySlug(req.params.slug);

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  res.status(200).json({
    success: true,
    data: service,
  });
});

const createServiceController = asyncHandler(async (req, res) => {
  const allowedFields = [
    "title",
    "slug",
    "description",
    "icon",
    "features",
    "active",
  ];

  const serviceData = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      serviceData[field] = req.body[field];
    }
  });

  const service = await createService(serviceData);

  res.status(201).json({
    success: true,
    message: "Service created successfully",
    data: service,
  });
});

const updateServiceController = asyncHandler(async (req, res) => {
  const allowedFields = [
    "title",
    "slug",
    "description",
    "icon",
    "features",
    "active",
  ];

  const updateData = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(
      400,
      "No valid service fields provided for update"
    );
  }

  const service = await updateService(
    req.params.id,
    updateData
  );

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  res.status(200).json({
    success: true,
    message: "Service updated successfully",
    data: service,
  });
});

const deleteServiceController = asyncHandler(async (req, res) => {
  const service = await deleteService(req.params.id);

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });
});

module.exports = {
  getAllServicesController,
  getServiceBySlugController,
  createServiceController,
  updateServiceController,
  deleteServiceController,
};