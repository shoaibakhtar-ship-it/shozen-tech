const Service = require("../models/Service");

const getAllServices = async () => {
  return await Service.find().sort({ createdAt: -1 });
};

const getServiceBySlug = async (slug) => {
  return await Service.findOne({ slug });
};

const createService = async (serviceData) => {
  return await Service.create(serviceData);
};

const updateService = async (id, updateData) => {
  return await Service.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteService = async (id) => {
  return await Service.findByIdAndDelete(id);
};

module.exports = {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};