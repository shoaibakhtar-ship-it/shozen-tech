import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";

import api from "../../services/api";
import { useAdminPanel } from "../../context/AdminPanelContext";

function AdminEnquiriesPanel() {
  const { logoutAdmin } =
    useAdminPanel();

  const [enquiries, setEnquiries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [updatingId, setUpdatingId] =
    useState("");

  const [deletingId, setDeletingId] =
    useState("");

  const handleUnauthorized = (
    err
  ) => {
    if (
      err.response?.status === 401
    ) {
      logoutAdmin();
      return true;
    }

    return false;
  };

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get("/contact");

      const data =
        response.data?.data;

      setEnquiries(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error(
        "Enquiries load error:",
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
          "Enquiries load failed."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const filteredEnquiries =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      if (!query) {
        return enquiries;
      }

      return enquiries.filter(
        (enquiry) =>
          [
            enquiry.name,
            enquiry.email,
            enquiry.phone,
            enquiry.company,
            enquiry.service,
            enquiry.budget,
            enquiry.message,
            enquiry.status,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query)
      );
    }, [enquiries, search]);

  const handleStatusChange =
    async (
      enquiry,
      newStatus
    ) => {
      try {
        setUpdatingId(
          enquiry._id
        );

        setError("");

        const response =
          await api.patch(
            `/contact/${enquiry._id}`,
            {
              status:
                newStatus,
            }
          );

        const updatedEnquiry =
          response.data?.data;

        setEnquiries(
          (current) =>
            current.map(
              (item) =>
                item._id ===
                enquiry._id
                  ? updatedEnquiry ||
                    {
                      ...item,
                      status:
                        newStatus,
                    }
                  : item
            )
        );
      } catch (err) {
        console.error(
          "Enquiry status error:",
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
            "Status update failed."
        );
      } finally {
        setUpdatingId("");
      }
    };

  const handleDelete =
    async (enquiry) => {
      const confirmed =
        window.confirm(
          `Delete enquiry from "${enquiry.name}"?`
        );

      if (!confirmed) {
        return;
      }

      try {
        setDeletingId(
          enquiry._id
        );

        setError("");

        await api.delete(
          `/contact/${enquiry._id}`
        );

        setEnquiries(
          (current) =>
            current.filter(
              (item) =>
                item._id !==
                enquiry._id
            )
        );
      } catch (err) {
        console.error(
          "Enquiry delete error:",
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
            "Enquiry delete failed."
        );
      } finally {
        setDeletingId("");
      }
    };

  const getStatusStyles = (
    status
  ) => {
    if (status === "closed") {
      return "bg-emerald-500/10 text-emerald-300";
    }

    if (
      status === "contacted"
    ) {
      return "bg-blue-500/10 text-blue-300";
    }

    return "bg-[#ef0038]/10 text-[#ff6c8e]";
  };

  const getStatusLabel = (
    status
  ) => {
    if (status === "closed") {
      return "Closed";
    }

    if (
      status === "contacted"
    ) {
      return "Contacted";
    }

    return "New";
  };

  const formatDate = (
    date
  ) => {
    if (!date) {
      return "";
    }

    return new Date(
      date
    ).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ef0038]">
            Customer Management
          </p>

          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
            Enquiries
          </h3>

          <p className="mt-1 text-xs leading-5 text-white/45">
            View and manage customer
            enquiries received from the
            website.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-white/35">
            Total
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {enquiries.length}
          </p>
        </div>
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
            placeholder="Search enquiries..."
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#ef0038]"
          />
        </div>

        <button
          type="button"
          onClick={
            loadEnquiries
          }
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

      {error && (
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
                className="h-40 animate-pulse rounded-2xl bg-white/[0.05]"
              />
            )
          )}
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        filteredEnquiries.length ===
          0 && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-10 text-center">
            <MessageSquareText
              size={28}
              className="mx-auto text-white/25"
            />

            <p className="mt-3 text-sm font-medium text-white">
              No enquiries found
            </p>

            <p className="mt-1 text-xs text-white/40">
              Customer enquiries will
              appear here.
            </p>
          </div>
        )}

      {/* ENQUIRY LIST */}
      {!loading &&
        filteredEnquiries.length >
          0 && (
          <div className="space-y-3">
            {filteredEnquiries.map(
              (enquiry) => {
                const status =
                  enquiry.status ||
                  "new";

                return (
                  <article
                    key={
                      enquiry._id
                    }
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="text-base font-semibold text-white">
                          {
                            enquiry.name
                          }
                        </h4>

                        {enquiry.company && (
                          <p className="mt-1 text-xs text-white/40">
                            {
                              enquiry.company
                            }
                          </p>
                        )}
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider ${getStatusStyles(
                          status
                        )}`}
                      >
                        {getStatusLabel(
                          status
                        )}
                      </span>
                    </div>

                    {/* CONTACT */}
                    <div className="mt-4 space-y-2">
                      {enquiry.email && (
                        <a
                          href={`mailto:${enquiry.email}`}
                          className="flex items-center gap-2 text-xs text-white/55 transition hover:text-white"
                        >
                          <Mail
                            size={
                              14
                            }
                          />

                          <span className="break-all">
                            {
                              enquiry.email
                            }
                          </span>
                        </a>
                      )}

                      {enquiry.phone && (
                        <a
                          href={`tel:${enquiry.phone}`}
                          className="flex items-center gap-2 text-xs text-white/55 transition hover:text-white"
                        >
                          <Phone
                            size={
                              14
                            }
                          />

                          {
                            enquiry.phone
                          }
                        </a>
                      )}
                    </div>

                    {/* INFO */}
                    {(enquiry.service ||
                      enquiry.budget) && (
                      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {enquiry.service && (
                          <div className="rounded-xl bg-white/[0.04] p-3">
                            <p className="text-[9px] uppercase tracking-wider text-white/30">
                              Service
                            </p>

                            <p className="mt-1 text-xs font-medium text-white/65">
                              {
                                enquiry.service
                              }
                            </p>
                          </div>
                        )}

                        {enquiry.budget && (
                          <div className="rounded-xl bg-white/[0.04] p-3">
                            <p className="text-[9px] uppercase tracking-wider text-white/30">
                              Budget
                            </p>

                            <p className="mt-1 text-xs font-medium text-white/65">
                              {
                                enquiry.budget
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* MESSAGE */}
                    {enquiry.message && (
                      <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-white/30">
                          Message
                        </p>

                        <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-white/60">
                          {
                            enquiry.message
                          }
                        </p>
                      </div>
                    )}

                    {enquiry.createdAt && (
                      <p className="mt-3 text-[10px] text-white/25">
                        Received:{" "}
                        {formatDate(
                          enquiry.createdAt
                        )}
                      </p>
                    )}

                    {/* STATUS */}
                    <div className="mt-4 border-t border-white/10 pt-3">
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-white/30">
                        Status
                      </label>

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <select
                          value={
                            status
                          }
                          disabled={
                            updatingId ===
                            enquiry._id
                          }
                          onChange={(
                            event
                          ) =>
                            handleStatusChange(
                              enquiry,
                              event.target
                                .value
                            )
                          }
                          className="h-10 min-w-0 flex-1 rounded-lg border border-white/10 bg-[#191919] px-3 text-xs text-white outline-none focus:border-[#ef0038] disabled:opacity-50"
                        >
                          <option value="new">
                            New
                          </option>

                          <option value="contacted">
                            Contacted
                          </option>

                          <option value="closed">
                            Closed
                          </option>
                        </select>

                        <div className="flex gap-2">
                          {updatingId ===
                            enquiry._id && (
                            <div className="flex h-10 w-10 items-center justify-center">
                              <Loader2
                                size={
                                  16
                                }
                                className="animate-spin text-white/50"
                              />
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                enquiry
                              )
                            }
                            disabled={
                              deletingId ===
                              enquiry._id
                            }
                            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-red-500/10 px-3 text-[11px] font-medium text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                          >
                            {deletingId ===
                            enquiry._id ? (
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
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        )}
    </div>
  );
}

export default AdminEnquiriesPanel;