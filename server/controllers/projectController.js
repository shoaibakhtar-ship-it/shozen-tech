const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require("../services/projectService");

const getAllProjectsController = asyncHandler(async (req, res) => {
  const projects = await getAllProjects();

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

const getProjectBySlugController = asyncHandler(async (req, res) => {
  const project = await getProjectBySlug(req.params.slug);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

const createProjectController = asyncHandler(async (req, res) => {
  const allowedFields = [
    "title",
    "slug",
    "description",
    "shortDescription",
    "category",
    "image",
    "technologies",
    "liveUrl",
    "githubUrl",
    "featured",
  ];

  const projectData = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      projectData[field] = req.body[field];
    }
  });

  const project = await createProject(projectData);

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
});

const updateProjectController = asyncHandler(async (req, res) => {
  const allowedFields = [
    "title",
    "slug",
    "description",
    "shortDescription",
    "category",
    "image",
    "technologies",
    "liveUrl",
    "githubUrl",
    "featured",
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
      "No valid project fields provided for update"
    );
  }

  const project = await updateProject(
    req.params.id,
    updateData
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: project,
  });
});

const deleteProjectController = asyncHandler(async (req, res) => {
  const project = await deleteProject(req.params.id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});

module.exports = {
  getAllProjectsController,
  getProjectBySlugController,
  createProjectController,
  updateProjectController,
  deleteProjectController,
};