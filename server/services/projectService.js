const Project = require("../models/Project");

const getAllProjects = async () => {
  return await Project.find().sort({ createdAt: -1 });
};

const getProjectBySlug = async (slug) => {
  return await Project.findOne({ slug });
};

const createProject = async (projectData) => {
  return await Project.create(projectData);
};

const updateProject = async (id, updateData) => {
  return await Project.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};

module.exports = {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};