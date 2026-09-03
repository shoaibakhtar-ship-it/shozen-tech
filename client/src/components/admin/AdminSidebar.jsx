import {
  useEffect,
  useState,
} from "react";

import {
  ArrowRight,
  FolderKanban,
  LayoutDashboard,
  Layers3,
  Loader2,
  LockKeyhole,
  LogOut,
  Menu,
  MessageSquareText,
  ShieldCheck,
  X,
} from "lucide-react";

import api from "../../services/api";

import {
  useAdminPanel,
} from "../../context/AdminPanelContext";

import AdminDashboardPanel from "./AdminDashboardPanel";
import AdminProjectsPanel from "./AdminProjectsPanel";
import AdminServicesPanel from "./AdminServicesPanel";
import AdminEnquiriesPanel from "./AdminEnquiriesPanel";

function AdminSidebar() {
  const {
    isAdminPanelOpen,
    isAdminLoggedIn,
    adminAuthLoading,
    adminUser,

    activeAdminSection,

    openAdminPanel,
    closeAdminPanel,

    setActiveAdminSection,

    loginAdmin,
    logoutAdmin,
  } = useAdminPanel();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!isAdminPanelOpen) {
      setError("");
    }
  }, [isAdminPanelOpen]);

  useEffect(() => {
    const handleEscape = (
      event
    ) => {
      if (
        event.key === "Escape" &&
        isAdminPanelOpen
      ) {
        closeAdminPanel();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [
    isAdminPanelOpen,
    closeAdminPanel,
  ]);

  useEffect(() => {
    if (isAdminPanelOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [isAdminPanelOpen]);

  const handleLogin = async (
    event
  ) => {
    event.preventDefault();

    if (!email.trim()) {
      setError(
        "Email is required."
      );
      return;
    }

    if (!password) {
      setError(
        "Password is required."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response =
        await api.post(
          "/auth/login",
          {
            email:
              email.trim(),
            password,
          }
        );

      const token =
        response.data?.token ||
        response.data?.data
          ?.token;

      if (!token) {
        throw new Error(
          "Login token not received."
        );
      }

      loginAdmin(token);

      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      console.error(
        "Admin login error:",
        err
      );

      setError(
        err.response?.data
          ?.message ||
          err.message ||
          "Admin login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();

    setEmail("");
    setPassword("");
    setError("");
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderKanban,
    },
    {
      id: "services",
      label: "Services",
      icon: Layers3,
    },
    {
      id: "enquiries",
      label: "Enquiries",
      icon:
        MessageSquareText,
    },
  ];

  const renderAdminContent =
    () => {
      if (
        activeAdminSection ===
        "projects"
      ) {
        return (
          <AdminProjectsPanel />
        );
      }

      if (
        activeAdminSection ===
        "services"
      ) {
        return (
          <AdminServicesPanel />
        );
      }

      if (
        activeAdminSection ===
        "enquiries"
      ) {
        return (
          <AdminEnquiriesPanel />
        );
      }

      return (
        <AdminDashboardPanel />
      );
    };

  return (
    <>
      {/* FLOATING ADMIN BUTTON */}
      {!isAdminPanelOpen && (
        <button
          type="button"
          onClick={
            openAdminPanel
          }
          className="fixed bottom-5 left-5 z-[90] flex items-center gap-2 rounded-full bg-[#111111] px-4 py-3 text-xs font-semibold !text-white shadow-[0_15px_45px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ef0038]"
        >
          {adminAuthLoading ? (
            <Loader2
              size={17}
              className="animate-spin !text-white"
            />
          ) : isAdminLoggedIn ? (
            <ShieldCheck
              size={17}
              className="!text-white"
            />
          ) : (
            <LockKeyhole
              size={17}
              className="!text-white"
            />
          )}

          <span className="!text-white">
            {adminAuthLoading
              ? "Checking..."
              : isAdminLoggedIn
                ? "Admin Panel"
                : "Admin"}
          </span>

          {!adminAuthLoading && (
            <Menu
              size={15}
              className="!text-white"
            />
          )}
        </button>
      )}

      {/* BACKDROP */}
      <div
        onClick={
          closeAdminPanel
        }
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-[3px] transition-all duration-300 ${
          isAdminPanelOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed right-0 top-0 z-[110] flex h-dvh w-full flex-col bg-[#111111] text-white shadow-[0_0_80px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out sm:max-w-[560px] ${
          isAdminPanelOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="shrink-0 border-b border-white/10">
          <div className="flex items-center justify-between px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ef0038]">
                SHOZEN TECH
              </p>

              <h2 className="mt-1 truncate text-lg font-semibold tracking-[-0.02em] text-white">
                Admin Control
              </h2>
            </div>

            <button
              type="button"
              onClick={
                closeAdminPanel
              }
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Close admin panel"
            >
              <X size={20} />
            </button>
          </div>

          {/* ADMIN MENU */}
          {!adminAuthLoading &&
            isAdminLoggedIn && (
              <div className="border-t border-white/[0.06] px-3 py-3 sm:px-4">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {menuItems.map(
                    (item) => {
                      const Icon =
                        item.icon;

                      const active =
                        activeAdminSection ===
                        item.id;

                      return (
                        <button
                          key={
                            item.id
                          }
                          type="button"
                          onClick={() =>
                            setActiveAdminSection(
                              item.id
                            )
                          }
                          className={`flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-3.5 text-xs font-semibold transition ${
                            active
                              ? "bg-[#ef0038] text-white"
                              : "border border-white/10 bg-white/[0.04] text-white/45 hover:bg-white/[0.08] hover:text-white"
                          }`}
                        >
                          <Icon
                            size={15}
                          />

                          {
                            item.label
                          }
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}
        </div>

        {/* SESSION CHECKING */}
        {adminAuthLoading && (
          <div className="flex flex-1 items-center justify-center px-6">
            <div className="w-full max-w-sm text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#ef0038]/15 text-[#ff6c8e]">
                <Loader2
                  size={28}
                  className="animate-spin"
                />
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-white">
                Checking Admin Session
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/40">
                Verifying your secure
                admin session...
              </p>
            </div>
          </div>
        )}

        {/* LOGIN */}
        {!adminAuthLoading &&
          !isAdminLoggedIn && (
            <div className="flex flex-1 overflow-y-auto">
              <div className="my-auto w-full px-6 py-10 sm:px-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#ef0038] shadow-[0_15px_40px_rgba(239,0,56,0.25)]">
                  <LockKeyhole
                    size={27}
                    className="text-white"
                  />
                </div>

                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ef0038]">
                  Restricted Access
                </p>

                <h3 className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-white">
                  Admin Login
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-6 text-white/45">
                  Login to manage
                  SHOZEN TECH projects,
                  services and customer
                  enquiries securely.
                </p>

                <form
                  onSubmit={
                    handleLogin
                  }
                  className="mt-8 space-y-4"
                >
                  <div>
                    <label
                      htmlFor="sidebar-admin-email"
                      className="mb-2 block text-xs font-medium text-white/60"
                    >
                      Email Address
                    </label>

                    <input
                      id="sidebar-admin-email"
                      type="email"
                      value={email}
                      onChange={(
                        event
                      ) =>
                        setEmail(
                          event.target
                            .value
                        )
                      }
                      placeholder="Enter admin email"
                      autoComplete="email"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#ef0038] focus:bg-white/[0.07]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sidebar-admin-password"
                      className="mb-2 block text-xs font-medium text-white/60"
                    >
                      Password
                    </label>

                    <input
                      id="sidebar-admin-password"
                      type="password"
                      value={password}
                      onChange={(
                        event
                      ) =>
                        setPassword(
                          event.target
                            .value
                        )
                      }
                      placeholder="Enter password"
                      autoComplete="current-password"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#ef0038] focus:bg-white/[0.07]"
                    />
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs leading-5 text-red-300">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      loading
                    }
                    className="group flex h-12 w-full items-center justify-between rounded-xl bg-[#ef0038] px-4 text-sm font-semibold text-white transition hover:bg-[#d90033] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>
                      {loading
                        ? "Logging in..."
                        : "Login to Admin"}
                    </span>

                    {loading ? (
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                    ) : (
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    )}
                  </button>
                </form>

                <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
                  <ShieldCheck
                    size={15}
                    className="shrink-0 text-white/30"
                  />

                  <p className="text-[11px] leading-5 text-white/30">
                    Admin operations
                    are protected by
                    backend
                    authentication.
                  </p>
                </div>
              </div>
            </div>
          )}

        {/* ADMIN CONTENT */}
        {!adminAuthLoading &&
          isAdminLoggedIn && (
            <>
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
                {renderAdminContent()}
              </div>

              {/* FOOTER */}
              <div className="shrink-0 border-t border-white/10 bg-[#111111] p-4">
                {adminUser && (
                  <div className="mb-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300">
                        <ShieldCheck
                          size={16}
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-white">
                          {adminUser.name ||
                            "Administrator"}
                        </p>

                        {adminUser.email && (
                          <p className="mt-0.5 truncate text-[10px] text-white/30">
                            {
                              adminUser.email
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={
                    handleLogout
                  }
                  className="flex min-h-11 w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-semibold text-white/60 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
                >
                  <span className="flex items-center gap-2">
                    <LogOut
                      size={16}
                    />

                    Logout
                  </span>

                  <ArrowRight
                    size={15}
                  />
                </button>
              </div>
            </>
          )}
      </aside>
    </>
  );
}

export default AdminSidebar;