import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CheckCircle2,
  Edit3,
  ExternalLink,
  ImagePlus,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import api from "../../services/api";
import getMediaUrl from "../../utils/getMediaUrl";
import { useAdminPanel } from "../../context/AdminPanelContext";

const initialForm = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  category: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
};

const technologyOptions = [
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Bootstrap",
  "Firebase",
  "REST API",
  "Redux",
  "Git",
  "GitHub",
  "Vite",
  "AWS",
];

function AdminProjectsPanel() {
  const { logoutAdmin } =
    useAdminPanel();

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [
    selectedProject,
    setSelectedProject,
  ] = useState(null);

  const [form, setForm] =
    useState(initialForm);

  const [
    technologies,
    setTechnologies,
  ] = useState([]);

  const [imageFile, setImageFile] =
    useState(null);

  const [
    imagePreview,
    setImagePreview,
  ] = useState("");

  const [
    existingImage,
    setExistingImage,
  ] = useState("");

  const [saving, setSaving] =
    useState(false);

  const [
    deletingId,
    setDeletingId,
  ] = useState("");

  const [
    togglingId,
    setTogglingId,
  ] = useState("");

  const notifyProjectsUpdated =
    () => {
      window.dispatchEvent(
        new Event(
          "shozen-projects-updated"
        )
      );
    };

  const handleUnauthorized = (
    err
  ) => {
    if (
      err.response?.status === 401
    ) {
      logoutAdmin();
      setModalOpen(false);

      return true;
    }

    return false;
  };

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get("/projects");

      const data =
        response.data?.data;

      setProjects(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error(
        "Projects load error:",
        err
      );

      if (
        handleUnauthorized(err)
      ) {
        return;
      }

      setError(
        err.response?.data
          ?.message ||
          "Projects load failed."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    return () => {
      if (
        imagePreview.startsWith(
          "blob:"
        )
      ) {
        URL.revokeObjectURL(
          imagePreview
        );
      }
    };
  }, [imagePreview]);

  const filteredProjects =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      if (!query) {
        return projects;
      }

      return projects.filter(
        (project) =>
          [
            project.title,
            project.slug,
            project.category,
            project.shortDescription,
            project.description,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query)
      );
    }, [projects, search]);

  const createSlug = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        ""
      );

  const handleFormChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (
      name === "title" &&
      !selectedProject
    ) {
      setForm((current) => ({
        ...current,
        title: value,
        slug: createSlug(value),
      }));
    }
  };

  const openAddModal = () => {
    setSelectedProject(null);
    setForm(initialForm);
    setTechnologies([]);
    setImageFile(null);
    setImagePreview("");
    setExistingImage("");
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (
    project
  ) => {
    setSelectedProject(project);

    setForm({
      title:
        project.title || "",

      slug:
        project.slug || "",

      shortDescription:
        project.shortDescription ||
        "",

      description:
        project.description || "",

      category:
        project.category || "",

      liveUrl:
        project.liveUrl || "",

      githubUrl:
        project.githubUrl || "",

      featured: Boolean(
        project.featured
      ),
    });

    setTechnologies(
      Array.isArray(
        project.technologies
      )
        ? project.technologies
        : []
    );

    setImageFile(null);
    setImagePreview("");

    setExistingImage(
      project.image || ""
    );

    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) {
      return;
    }

    if (
      imagePreview.startsWith(
        "blob:"
      )
    ) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setModalOpen(false);
    setSelectedProject(null);
    setForm(initialForm);
    setTechnologies([]);
    setImageFile(null);
    setImagePreview("");
    setExistingImage("");
    setError("");
  };

  const toggleTechnology = (
    technology
  ) => {
    setTechnologies(
      (current) => {
        const selected =
          current.includes(
            technology
          );

        if (selected) {
          return current.filter(
            (item) =>
              item !== technology
          );
        }

        return [
          ...current,
          technology,
        ];
      }
    );
  };

  const handleImageChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      setError(
        "Only JPG, PNG and WEBP images are allowed."
      );

      event.target.value = "";
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        "Image must be under 5MB."
      );

      event.target.value = "";
      return;
    }

    if (
      imagePreview.startsWith(
        "blob:"
      )
    ) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    const previewUrl =
      URL.createObjectURL(file);

    setImageFile(file);
    setImagePreview(
      previewUrl
    );

    setError("");
  };

  const removeSelectedImage =
    () => {
      if (
        imagePreview.startsWith(
          "blob:"
        )
      ) {
        URL.revokeObjectURL(
          imagePreview
        );
      }

      setImageFile(null);
      setImagePreview("");
      setExistingImage("");
  };

  const uploadProjectImage =
    async (file) => {
      if (!file) {
        return "";
      }

      const formData =
        new FormData();

      formData.append(
        "image",
        file
      );

      const response =
        await api.post(
          "/uploads/project-image",
          formData
        );

      const imagePath =
        response.data?.data?.image;

      if (!imagePath) {
        throw new Error(
          "Image upload failed."
        );
      }

      return imagePath;
    };

  const handleSaveProject =
    async (event) => {
      event.preventDefault();

      if (!form.title.trim()) {
        setError(
          "Project title is required."
        );
        return;
      }

      if (!form.slug.trim()) {
        setError(
          "Project slug is required."
        );
        return;
      }

      if (
        !form.description.trim()
      ) {
        setError(
          "Project description is required."
        );
        return;
      }

      try {
        setSaving(true);
        setError("");

        let finalImage =
          existingImage;

        if (imageFile) {
          finalImage =
            await uploadProjectImage(
              imageFile
            );
        }

        const payload = {
          title:
            form.title.trim(),

          slug:
            form.slug.trim(),

          shortDescription:
            form.shortDescription.trim(),

          description:
            form.description.trim(),

          category:
            form.category.trim(),

          image:
            finalImage,

          technologies,

          liveUrl:
            form.liveUrl.trim(),

          githubUrl:
            form.githubUrl.trim(),

          featured:
            form.featured,
        };

        if (selectedProject) {
          await api.patch(
            `/projects/${selectedProject._id}`,
            payload
          );
        } else {
          await api.post(
            "/projects",
            payload
          );
        }

        await loadProjects();

        notifyProjectsUpdated();

        if (
          imagePreview.startsWith(
            "blob:"
          )
        ) {
          URL.revokeObjectURL(
            imagePreview
          );
        }

        setModalOpen(false);
        setSelectedProject(null);
        setForm(initialForm);
        setTechnologies([]);
        setImageFile(null);
        setImagePreview("");
        setExistingImage("");
      } catch (err) {
        console.error(
          "Project save error:",
          err
        );

        if (
          handleUnauthorized(err)
        ) {
          return;
        }

        setError(
          err.response?.data
            ?.message ||
            err.message ||
            "Project save failed."
        );
      } finally {
        setSaving(false);
      }
    };

  const handleDeleteProject =
    async (project) => {
      const confirmed =
        window.confirm(
          `Delete "${project.title}"?`
        );

      if (!confirmed) {
        return;
      }

      try {
        setDeletingId(
          project._id
        );

        setError("");

        await api.delete(
          `/projects/${project._id}`
        );

        setProjects(
          (current) =>
            current.filter(
              (item) =>
                item._id !==
                project._id
            )
        );

        notifyProjectsUpdated();
      } catch (err) {
        console.error(
          "Project delete error:",
          err
        );

        if (
          handleUnauthorized(err)
        ) {
          return;
        }

        setError(
          err.response?.data
            ?.message ||
            "Project delete failed."
        );
      } finally {
        setDeletingId("");
      }
    };

  const handleFeaturedToggle =
    async (project) => {
      try {
        setTogglingId(
          project._id
        );

        setError("");

        const newFeatured =
          !project.featured;

        const response =
          await api.patch(
            `/projects/${project._id}`,
            {
              featured:
                newFeatured,
            }
          );

        const updatedProject =
          response.data?.data;

        setProjects(
          (current) =>
            current.map(
              (item) =>
                item._id ===
                project._id
                  ? updatedProject ||
                    {
                      ...item,
                      featured:
                        newFeatured,
                    }
                  : item
            )
        );

        notifyProjectsUpdated();
      } catch (err) {
        console.error(
          "Featured update error:",
          err
        );

        if (
          handleUnauthorized(err)
        ) {
          return;
        }

        setError(
          err.response?.data
            ?.message ||
            "Featured status update failed."
        );
      } finally {
        setTogglingId("");
      }
    };

  return (
    <div className="space-y-5">
      {/* TOP */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ef0038]">
            Content Management
          </p>

          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
            Projects
          </h3>

          <p className="mt-1 text-xs leading-5 text-white/45">
            Add, edit and manage
            projects shown on the
            website.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex min-h-11 items-center gap-2 rounded-xl bg-[#ef0038] px-4 text-xs font-semibold text-white transition hover:bg-[#d90033]"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search projects..."
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
          />
        </div>

        <button
          type="button"
          onClick={loadProjects}
          disabled={loading}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
          title="Refresh"
        >
          <RefreshCw
            size={16}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />
        </button>
      </div>

      {error &&
        !modalOpen && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs leading-5 text-red-300">
            {error}
          </div>
        )}

      {/* LOADING */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-2xl bg-white/[0.05]"
              />
            )
          )}
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        filteredProjects.length ===
          0 && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-10 text-center">
            <ImagePlus
              size={26}
              className="mx-auto text-white/25"
            />

            <p className="mt-3 text-sm font-medium text-white">
              No projects found
            </p>

            <p className="mt-1 text-xs text-white/40">
              Add your first project
              from this panel.
            </p>
          </div>
        )}

      {/* PROJECT LIST */}
      {!loading &&
        filteredProjects.length >
          0 && (
          <div className="space-y-3">
            {filteredProjects.map(
              (project) => {
                const imageUrl =
                  getMediaUrl(
                    project.image
                  );

                return (
                  <article
                    key={project._id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
                  >
                    <div className="flex gap-4 p-4">
                      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-white/[0.05]">
                        {imageUrl ? (
                          <img
                            src={
                              imageUrl
                            }
                            alt={
                              project.title
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ImagePlus
                              size={
                                20
                              }
                              className="text-white/20"
                            />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="truncate text-sm font-semibold text-white">
                              {
                                project.title
                              }
                            </h4>

                            <p className="mt-1 truncate text-xs text-white/35">
                              /
                              {
                                project.slug
                              }
                            </p>
                          </div>

                          {project.featured && (
                            <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#ef0038]/15 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#ff6c8e]">
                              <Star
                                size={
                                  10
                                }
                                fill="currentColor"
                              />
                              Featured
                            </span>
                          )}
                        </div>

                        {project.category && (
                          <p className="mt-2 text-[11px] font-medium text-white/55">
                            {
                              project.category
                            }
                          </p>
                        )}

                        {Array.isArray(
                          project.technologies
                        ) &&
                          project
                            .technologies
                            .length >
                            0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {project.technologies
                                .slice(
                                  0,
                                  4
                                )
                                .map(
                                  (
                                    technology
                                  ) => (
                                    <span
                                      key={
                                        technology
                                      }
                                      className="rounded-full border border-white/10 px-2 py-1 text-[9px] text-white/45"
                                    >
                                      {
                                        technology
                                      }
                                    </span>
                                  )
                                )}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleFeaturedToggle(
                            project
                          )
                        }
                        disabled={
                          togglingId ===
                          project._id
                        }
                        className={`flex min-h-10 items-center gap-2 rounded-lg px-3 text-[11px] font-medium transition ${
                          project.featured
                            ? "bg-[#ef0038]/15 text-[#ff6c8e]"
                            : "bg-white/[0.05] text-white/55 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {togglingId ===
                        project._id ? (
                          <Loader2
                            size={
                              14
                            }
                            className="animate-spin"
                          />
                        ) : (
                          <Star
                            size={
                              14
                            }
                            fill={
                              project.featured
                                ? "currentColor"
                                : "none"
                            }
                          />
                        )}

                        Featured
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            project
                          )
                        }
                        className="flex min-h-10 items-center gap-2 rounded-lg bg-white/[0.05] px-3 text-[11px] font-medium text-white/55 transition hover:bg-white/10 hover:text-white"
                      >
                        <Edit3
                          size={14}
                        />
                        Edit
                      </button>

                      <a
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex min-h-10 items-center gap-2 rounded-lg bg-white/[0.05] px-3 text-[11px] font-medium text-white/55 transition hover:bg-white/10 hover:text-white"
                      >
                        <ExternalLink
                          size={14}
                        />
                        View
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteProject(
                            project
                          )
                        }
                        disabled={
                          deletingId ===
                          project._id
                        }
                        className="ml-auto flex min-h-10 items-center gap-2 rounded-lg bg-red-500/10 px-3 text-[11px] font-medium text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                      >
                        {deletingId ===
                        project._id ? (
                          <Loader2
                            size={
                              14
                            }
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2
                            size={
                              14
                            }
                          />
                        )}

                        Delete
                      </button>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        )}

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-5">
          <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#151515] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ef0038]">
                  Project Management
                </p>

                <h3 className="mt-1 text-xl font-semibold text-white">
                  {selectedProject
                    ? "Edit Project"
                    : "Add Project"}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={
                handleSaveProject
              }
              className="overflow-y-auto"
            >
              <div className="space-y-5 p-5 sm:p-6">
                {/* IMAGE */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Project Image
                  </label>

                  {imagePreview ||
                  existingImage ? (
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={
                            imagePreview ||
                            getMediaUrl(
                              existingImage
                            )
                          }
                          alt="Project preview"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2 p-3">
                        <label className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg bg-white/[0.07] px-3 text-xs font-medium text-white/65 transition hover:bg-white/10 hover:text-white">
                          <Upload
                            size={
                              14
                            }
                          />
                          Change Image

                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                            onChange={
                              handleImageChange
                            }
                            className="hidden"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={
                            removeSelectedImage
                          }
                          className="flex min-h-10 items-center gap-2 rounded-lg bg-red-500/10 px-3 text-xs font-medium text-red-300 transition hover:bg-red-500/20"
                        >
                          <Trash2
                            size={
                              14
                            }
                          />
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-9 text-center transition hover:border-[#ef0038]/50 hover:bg-white/[0.05]">
                      <ImagePlus
                        size={28}
                        className="text-white/25"
                      />

                      <p className="mt-3 text-sm font-medium text-white">
                        Choose image from
                        PC
                      </p>

                      <p className="mt-1 text-xs text-white/35">
                        JPG, PNG or WEBP
                        · Max 5MB
                      </p>

                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                        onChange={
                          handleImageChange
                        }
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={
                      form.title
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="Project title"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Slug *
                  </label>

                  <input
                    type="text"
                    name="slug"
                    value={
                      form.slug
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="project-slug"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={
                      form.category
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="Website Development"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Short Description
                  </label>

                  <textarea
                    name="shortDescription"
                    value={
                      form.shortDescription
                    }
                    onChange={
                      handleFormChange
                    }
                    rows={3}
                    placeholder="Short project summary"
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Description *
                  </label>

                  <textarea
                    name="description"
                    value={
                      form.description
                    }
                    onChange={
                      handleFormChange
                    }
                    rows={5}
                    placeholder="Full project description"
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
                  />
                </div>

                {/* TECHNOLOGIES */}
                <div>
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-white/60">
                      Technologies
                    </label>

                    <p className="mt-1 text-[11px] text-white/30">
                      Click to select
                      technologies used
                      in this project.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {technologyOptions.map(
                      (
                        technology
                      ) => {
                        const selected =
                          technologies.includes(
                            technology
                          );

                        return (
                          <button
                            key={
                              technology
                            }
                            type="button"
                            onClick={() =>
                              toggleTechnology(
                                technology
                              )
                            }
                            className={`flex min-h-10 items-center gap-2 rounded-xl border px-3 text-xs font-medium transition ${
                              selected
                                ? "border-[#ef0038] bg-[#ef0038] text-white"
                                : "border-white/10 bg-white/[0.04] text-white/50 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                            }`}
                          >
                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                                selected
                                  ? "border-white bg-white text-[#ef0038]"
                                  : "border-white/25"
                              }`}
                            >
                              {selected && (
                                <CheckCircle2
                                  size={
                                    12
                                  }
                                />
                              )}
                            </span>

                            {
                              technology
                            }
                          </button>
                        );
                      }
                    )}
                  </div>

                  {technologies.length >
                    0 && (
                    <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
                        Selected Technologies
                      </p>

                      <p className="mt-2 text-xs leading-5 text-white/60">
                        {technologies.join(
                          " • "
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Live URL
                  </label>

                  <input
                    type="url"
                    name="liveUrl"
                    value={
                      form.liveUrl
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="https://..."
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    GitHub URL
                  </label>

                  <input
                    type="url"
                    name="githubUrl"
                    value={
                      form.githubUrl
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="https://github.com/..."
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
                  />
                </div>

                {/* FEATURED */}
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Featured Project
                    </p>

                    <p className="mt-1 text-xs text-white/35">
                      Show this project
                      prominently on the
                      website.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="featured"
                    checked={
                      form.featured
                    }
                    onChange={
                      handleFormChange
                    }
                    className="h-5 w-5 accent-[#ef0038]"
                  />
                </label>

                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs leading-5 text-red-300">
                    {error}
                  </div>
                )}
              </div>

              {/* MODAL FOOTER */}
              <div className="flex flex-wrap justify-end gap-2 border-t border-white/10 bg-[#111111] px-5 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="min-h-11 rounded-xl border border-white/10 px-5 text-xs font-semibold text-white/60 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-40"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex min-h-11 items-center gap-2 rounded-xl bg-[#ef0038] px-5 text-xs font-semibold text-white transition hover:bg-[#d90033] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2
                        size={16}
                      />

                      {selectedProject
                        ? "Update Project"
                        : "Add Project"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProjectsPanel;