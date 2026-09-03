import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FolderKanban,
  Layers3,
  Loader2,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Star,
  ArrowRight,
} from "lucide-react";

import api from "../../services/api";
import { useAdminPanel } from "../../context/AdminPanelContext";

function AdminDashboardPanel() {
  const {
    logoutAdmin,
    setActiveAdminSection,
  } = useAdminPanel();

  const [projects, setProjects] =
    useState([]);

  const [services, setServices] =
    useState([]);

  const [enquiries, setEnquiries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadDashboard = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const [
          projectsResult,
          servicesResult,
          enquiriesResult,
        ] = await Promise.allSettled([
          api.get("/projects"),

          api.get("/services"),

          api.get("/contact"),
        ]);

        if (
          enquiriesResult.status ===
            "rejected" &&
          enquiriesResult.reason
            ?.response?.status === 401
        ) {
          logoutAdmin();
          return;
        }

        if (
          projectsResult.status ===
          "fulfilled"
        ) {
          const data =
            projectsResult.value.data
              ?.data;

          setProjects(
            Array.isArray(data)
              ? data
              : []
          );
        }

        if (
          servicesResult.status ===
          "fulfilled"
        ) {
          const data =
            servicesResult.value.data
              ?.data;

          setServices(
            Array.isArray(data)
              ? data
              : []
          );
        }

        if (
          enquiriesResult.status ===
          "fulfilled"
        ) {
          const data =
            enquiriesResult.value.data
              ?.data;

          setEnquiries(
            Array.isArray(data)
              ? data
              : []
          );
        }

        const failedRequests = [
          projectsResult,
          servicesResult,
          enquiriesResult,
        ].filter(
          (result) =>
            result.status ===
            "rejected"
        );

        if (
          failedRequests.length > 0
        ) {
          setError(
            "Some dashboard data could not be loaded."
          );
        }
      } catch (err) {
        console.error(
          "Dashboard load error:",
          err
        );

        if (
          err.response?.status === 401
        ) {
          logoutAdmin();
          return;
        }

        setError(
          err.response?.data
            ?.message ||
            "Dashboard data load failed."
        );
      } finally {
        setLoading(false);
      }
    },
    [logoutAdmin]
  );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const stats = useMemo(
    () => {
      const featuredProjects =
        projects.filter(
          (project) =>
            project.featured
        ).length;

      const activeServices =
        services.filter(
          (service) =>
            service.active !== false
        ).length;

      const newEnquiries =
        enquiries.filter(
          (enquiry) =>
            !enquiry.status ||
            enquiry.status === "new"
        ).length;

      return {
        totalProjects:
          projects.length,

        featuredProjects,

        totalServices:
          services.length,

        activeServices,

        totalEnquiries:
          enquiries.length,

        newEnquiries,
      };
    },
    [
      projects,
      services,
      enquiries,
    ]
  );

  const recentEnquiries =
    useMemo(() => {
      return [...enquiries]
        .sort(
          (a, b) =>
            new Date(
              b.createdAt || 0
            ) -
            new Date(
              a.createdAt || 0
            )
        )
        .slice(0, 4);
    }, [enquiries]);

  const formatDate = (
    value
  ) => {
    if (!value) {
      return "";
    }

    return new Date(
      value
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const statCards = [
    {
      label: "Projects",
      value:
        stats.totalProjects,
      subText: `${stats.featuredProjects} featured`,
      icon: FolderKanban,
      section: "projects",
    },

    {
      label: "Services",
      value:
        stats.totalServices,
      subText: `${stats.activeServices} active`,
      icon: Layers3,
      section: "services",
    },

    {
      label: "Enquiries",
      value:
        stats.totalEnquiries,
      subText: `${stats.newEnquiries} new`,
      icon:
        MessageSquareText,
      section: "enquiries",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[350px] items-center justify-center">
        <div className="text-center">
          <Loader2
            size={28}
            className="mx-auto animate-spin text-[#ef0038]"
          />

          <p className="mt-3 text-xs text-white/40">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* TOP */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ef0038]">
            SHOZEN TECH
          </p>

          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
            Dashboard
          </h3>

          <p className="mt-1 text-xs leading-5 text-white/45">
            Live overview of your
            website content.
          </p>
        </div>

        <button
          type="button"
          onClick={
            loadDashboard
          }
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/50 transition hover:bg-white/10 hover:text-white"
          title="Refresh dashboard"
        >
          <RefreshCw
            size={16}
          />
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs leading-5 text-amber-200">
          {error}
        </div>
      )}

      {/* LOGIN STATUS */}
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.06] p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
          <ShieldCheck
            size={19}
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            Admin Logged In
          </p>

          <p className="mt-1 text-xs text-white/40">
            Website management
            controls are active.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {statCards.map(
          (card) => {
            const Icon =
              card.icon;

            return (
              <button
                key={
                  card.label
                }
                type="button"
                onClick={() =>
                  setActiveAdminSection(
                    card.section
                  )
                }
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-[#ef0038]/40 hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/60">
                    <Icon
                      size={18}
                    />
                  </div>

                  <ArrowRight
                    size={15}
                    className="text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-white"
                  />
                </div>

                <p className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-white">
                  {card.value}
                </p>

                <p className="mt-1 text-xs font-medium text-white/60">
                  {card.label}
                </p>

                <p className="mt-1 text-[10px] text-white/30">
                  {card.subText}
                </p>
              </button>
            );
          }
        )}
      </div>

      {/* FEATURED PROJECTS INFO */}
      <button
        type="button"
        onClick={() =>
          setActiveAdminSection(
            "projects"
          )
        }
        className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-[#ef0038]/40 hover:bg-white/[0.07]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ef0038]/15 text-[#ff6c8e]">
            <Star
              size={18}
              fill="currentColor"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Featured Projects
            </p>

            <p className="mt-1 text-xs text-white/40">
              {
                stats.featuredProjects
              }{" "}
              project
              {stats.featuredProjects ===
              1
                ? ""
                : "s"}{" "}
              currently featured
            </p>
          </div>
        </div>

        <ArrowRight
          size={17}
          className="text-white/25"
        />
      </button>

      {/* RECENT ENQUIRIES */}
      <div className="rounded-[22px] border border-white/10 bg-white/[0.04]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <div>
            <p className="text-sm font-semibold text-white">
              Recent Enquiries
            </p>

            <p className="mt-1 text-[10px] text-white/30">
              Latest customer
              messages
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setActiveAdminSection(
                "enquiries"
              )
            }
            className="flex items-center gap-1.5 text-[11px] font-semibold text-[#ff6c8e] transition hover:text-white"
          >
            View All

            <ArrowRight
              size={13}
            />
          </button>
        </div>

        {recentEnquiries.length ===
        0 ? (
          <div className="px-4 py-8 text-center">
            <MessageSquareText
              size={24}
              className="mx-auto text-white/20"
            />

            <p className="mt-3 text-xs text-white/35">
              No enquiries yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.07]">
            {recentEnquiries.map(
              (enquiry) => (
                <button
                  key={
                    enquiry._id
                  }
                  type="button"
                  onClick={() =>
                    setActiveAdminSection(
                      "enquiries"
                    )
                  }
                  className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left transition hover:bg-white/[0.035]"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-xs font-semibold text-white">
                        {
                          enquiry.name ||
                          "Unknown"
                        }
                      </p>

                      {(!enquiry.status ||
                        enquiry.status ===
                          "new") && (
                        <span className="rounded-full bg-[#ef0038]/15 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-[#ff6c8e]">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-1 truncate text-[11px] text-white/35">
                      {enquiry.service ||
                        enquiry.email ||
                        "Website enquiry"}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[9px] text-white/25">
                      {formatDate(
                        enquiry.createdAt
                      )}
                    </p>
                  </div>
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboardPanel;