import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CheckCircle2,
  Edit3,
  Layers3,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

import api from "../../services/api";
import { useAdminPanel } from "../../context/AdminPanelContext";

const initialForm = {
  title: "",
  slug: "",
  description: "",
  icon: "",
  active: true,
};

function AdminServicesPanel() {
  const { logoutAdmin } =
    useAdminPanel();

  const [services, setServices] =
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
    selectedService,
    setSelectedService,
  ] = useState(null);

  const [form, setForm] =
    useState(initialForm);

  const [features, setFeatures] =
    useState([]);

  const [
    featureInput,
    setFeatureInput,
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

  const loadServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get("/services");

      const data =
        response.data?.data;

      setServices(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error(
        "Services load error:",
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
          "Services load failed."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const filteredServices =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      if (!query) {
        return services;
      }

      return services.filter(
        (service) =>
          [
            service.title,
            service.slug,
            service.description,
            service.icon,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query)
      );
    }, [services, search]);

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

    if (
      name === "title" &&
      !selectedService
    ) {
      setForm((current) => ({
        ...current,
        title: value,
        slug: createSlug(value),
      }));

      return;
    }

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const openAddModal = () => {
    setSelectedService(null);
    setForm(initialForm);
    setFeatures([]);
    setFeatureInput("");
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (
    service
  ) => {
    setSelectedService(service);

    setForm({
      title:
        service.title || "",

      slug:
        service.slug || "",

      description:
        service.description || "",

      icon:
        service.icon || "",

      active:
        service.active !== false,
    });

    setFeatures(
      Array.isArray(
        service.features
      )
        ? service.features
        : []
    );

    setFeatureInput("");
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setSelectedService(null);
    setForm(initialForm);
    setFeatures([]);
    setFeatureInput("");
    setError("");
  };

  const addFeature = () => {
    const value =
      featureInput.trim();

    if (!value) {
      return;
    }

    const exists =
      features.some(
        (item) =>
          item.toLowerCase() ===
          value.toLowerCase()
      );

    if (!exists) {
      setFeatures(
        (current) => [
          ...current,
          value,
        ]
      );
    }

    setFeatureInput("");
  };

  const removeFeature = (
    value
  ) => {
    setFeatures(
      (current) =>
        current.filter(
          (item) =>
            item !== value
        )
    );
  };

  const handleFeatureKeyDown =
    (event) => {
      if (
        event.key === "Enter"
      ) {
        event.preventDefault();
        addFeature();
      }
    };

  const resetFormAfterSave =
    () => {
      setModalOpen(false);
      setSelectedService(null);
      setForm(initialForm);
      setFeatures([]);
      setFeatureInput("");
      setError("");
    };

  const handleSaveService =
    async (event) => {
      event.preventDefault();

      if (!form.title.trim()) {
        setError(
          "Service title is required."
        );
        return;
      }

      if (!form.slug.trim()) {
        setError(
          "Service slug is required."
        );
        return;
      }

      if (
        !form.description.trim()
      ) {
        setError(
          "Service description is required."
        );
        return;
      }

      try {
        setSaving(true);
        setError("");

        const payload = {
          title:
            form.title.trim(),

          slug:
            form.slug.trim(),

          description:
            form.description.trim(),

          icon:
            form.icon.trim(),

          features,

          active:
            form.active,
        };

        if (selectedService) {
          await api.patch(
            `/services/${selectedService._id}`,
            payload
          );
        } else {
          await api.post(
            "/services",
            payload
          );
        }

        await loadServices();

        resetFormAfterSave();
      } catch (err) {
        console.error(
          "Service save error:",
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
            "Service save failed."
        );
      } finally {
        setSaving(false);
      }
    };

  const handleDeleteService =
    async (service) => {
      const confirmed =
        window.confirm(
          `Delete "${service.title}"?`
        );

      if (!confirmed) {
        return;
      }

      try {
        setDeletingId(
          service._id
        );

        setError("");

        await api.delete(
          `/services/${service._id}`
        );

        setServices(
          (current) =>
            current.filter(
              (item) =>
                item._id !==
                service._id
            )
        );
      } catch (err) {
        console.error(
          "Service delete error:",
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
            "Service delete failed."
        );
      } finally {
        setDeletingId("");
      }
    };

  const handleActiveToggle =
    async (service) => {
      try {
        setTogglingId(
          service._id
        );

        setError("");

        const newActive =
          service.active === false;

        const response =
          await api.patch(
            `/services/${service._id}`,
            {
              active:
                newActive,
            }
          );

        const updatedService =
          response.data?.data;

        setServices(
          (current) =>
            current.map(
              (item) =>
                item._id ===
                service._id
                  ? updatedService ||
                    {
                      ...item,
                      active:
                        newActive,
                    }
                  : item
            )
        );
      } catch (err) {
        console.error(
          "Service status error:",
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
            "Service status update failed."
        );
      } finally {
        setTogglingId("");
      }
    };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ef0038]">
            Content Management
          </p>

          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
            Services
          </h3>

          <p className="mt-1 text-xs leading-5 text-white/45">
            Manage services shown on
            the SHOZEN TECH website.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex min-h-11 items-center gap-2 rounded-xl bg-[#ef0038] px-4 text-xs font-semibold text-white transition hover:bg-[#d90033]"
        >
          <Plus size={16} />
          Add Service
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
            placeholder="Search services..."
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
          />
        </div>

        <button
          type="button"
          onClick={loadServices}
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

      {!loading &&
        filteredServices.length ===
          0 && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-10 text-center">
            <Layers3
              size={26}
              className="mx-auto text-white/25"
            />

            <p className="mt-3 text-sm font-medium text-white">
              No services found
            </p>

            <p className="mt-1 text-xs text-white/40">
              Add your first service
              from this panel.
            </p>
          </div>
        )}

      {/* SERVICES LIST */}
      {!loading &&
        filteredServices.length >
          0 && (
          <div className="space-y-3">
            {filteredServices.map(
              (service) => {
                const isActive =
                  service.active !== false;

                return (
                  <article
                    key={
                      service._id
                    }
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">
                            {
                              service.title
                            }
                          </h4>

                          <span
                            className={`rounded-full px-2 py-1 text-[9px] font-semibold uppercase tracking-wider ${
                              isActive
                                ? "bg-emerald-500/10 text-emerald-300"
                                : "bg-white/[0.06] text-white/35"
                            }`}
                          >
                            {isActive
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-white/35">
                          /
                          {
                            service.slug
                          }
                        </p>

                        {service.description && (
                          <p className="mt-3 line-clamp-2 text-xs leading-5 text-white/50">
                            {
                              service.description
                            }
                          </p>
                        )}

                        {Array.isArray(
                          service.features
                        ) &&
                          service
                            .features
                            .length >
                            0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {service.features
                                .slice(
                                  0,
                                  5
                                )
                                .map(
                                  (
                                    feature
                                  ) => (
                                    <span
                                      key={
                                        feature
                                      }
                                      className="rounded-full border border-white/10 px-2 py-1 text-[9px] text-white/45"
                                    >
                                      {
                                        feature
                                      }
                                    </span>
                                  )
                                )}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleActiveToggle(
                            service
                          )
                        }
                        disabled={
                          togglingId ===
                          service._id
                        }
                        className={`flex min-h-10 items-center gap-2 rounded-lg px-3 text-[11px] font-medium transition ${
                          isActive
                            ? "bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                            : "bg-white/[0.05] text-white/50 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {togglingId ===
                        service._id ? (
                          <Loader2
                            size={14}
                            className="animate-spin"
                          />
                        ) : (
                          <CheckCircle2
                            size={14}
                          />
                        )}

                        {isActive
                          ? "Active"
                          : "Inactive"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            service
                          )
                        }
                        className="flex min-h-10 items-center gap-2 rounded-lg bg-white/[0.05] px-3 text-[11px] font-medium text-white/55 transition hover:bg-white/10 hover:text-white"
                      >
                        <Edit3
                          size={14}
                        />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteService(
                            service
                          )
                        }
                        disabled={
                          deletingId ===
                          service._id
                        }
                        className="ml-auto flex min-h-10 items-center gap-2 rounded-lg bg-red-500/10 px-3 text-[11px] font-medium text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                      >
                        {deletingId ===
                        service._id ? (
                          <Loader2
                            size={14}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2
                            size={14}
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

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-5">
          <div className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#151515] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ef0038]">
                  Service Management
                </p>

                <h3 className="mt-1 text-xl font-semibold text-white">
                  {selectedService
                    ? "Edit Service"
                    : "Add Service"}
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
                handleSaveService
              }
              className="overflow-y-auto"
            >
              <div className="space-y-5 p-5 sm:p-6">
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
                    placeholder="Website Development"
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
                    placeholder="website-development"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
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
                    placeholder="Describe this service..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Icon
                  </label>

                  <input
                    type="text"
                    name="icon"
                    value={
                      form.icon
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="code"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
                  />

                  <p className="mt-2 text-[11px] leading-5 text-white/30">
                    Example: code, web,
                    mobile, ai
                  </p>
                </div>

                {/* FEATURES */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Features
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={
                        featureInput
                      }
                      onChange={(
                        event
                      ) =>
                        setFeatureInput(
                          event.target
                            .value
                        )
                      }
                      onKeyDown={
                        handleFeatureKeyDown
                      }
                      placeholder="Business Websites"
                      className="h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
                    />

                    <button
                      type="button"
                      onClick={
                        addFeature
                      }
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-white transition hover:bg-[#ef0038]"
                    >
                      <Plus
                        size={17}
                      />
                    </button>
                  </div>

                  {features.length >
                    0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {features.map(
                        (
                          feature
                        ) => (
                          <span
                            key={
                              feature
                            }
                            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-white/65"
                          >
                            {
                              feature
                            }

                            <button
                              type="button"
                              onClick={() =>
                                removeFeature(
                                  feature
                                )
                              }
                              className="text-white/30 transition hover:text-red-300"
                            >
                              <X
                                size={12}
                              />
                            </button>
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* ACTIVE */}
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Active Service
                    </p>

                    <p className="mt-1 text-xs text-white/35">
                      Active services can
                      appear on the public
                      website.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="active"
                    checked={
                      form.active
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

                      {selectedService
                        ? "Update Service"
                        : "Add Service"}
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

export default AdminServicesPanel;