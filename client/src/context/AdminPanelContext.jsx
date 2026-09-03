import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AdminPanelContext = createContext(null);

export function AdminPanelProvider({
  children,
}) {
  const [
    isAdminPanelOpen,
    setIsAdminPanelOpen,
  ] = useState(false);

  const [
    adminToken,
    setAdminToken,
  ] = useState(() =>
    localStorage.getItem(
      "shozenAdminToken"
    )
  );

  const [
    adminUser,
    setAdminUser,
  ] = useState(null);

  const [
    adminAuthLoading,
    setAdminAuthLoading,
  ] = useState(Boolean(adminToken));

  const [
    activeAdminSection,
    setActiveAdminSection,
  ] = useState("dashboard");

  const openAdminPanel = () => {
    setIsAdminPanelOpen(true);
  };

  const closeAdminPanel = () => {
    setIsAdminPanelOpen(false);
  };

  const toggleAdminPanel = () => {
    setIsAdminPanelOpen(
      (current) => !current
    );
  };

  const loginAdmin = (token) => {
    localStorage.setItem(
      "shozenAdminToken",
      token
    );

    setAdminToken(token);
    setAdminAuthLoading(true);

    setActiveAdminSection(
      "dashboard"
    );
  };

  const logoutAdmin = () => {
    localStorage.removeItem(
      "shozenAdminToken"
    );

    setAdminToken(null);
    setAdminUser(null);
    setAdminAuthLoading(false);

    setActiveAdminSection(
      "dashboard"
    );
  };

  useEffect(() => {
    if (!adminToken) {
      setAdminUser(null);
      setAdminAuthLoading(false);
      return;
    }

    let cancelled = false;

    const verifyAdmin = async () => {
      try {
        setAdminAuthLoading(true);

        const response =
          await api.get(
            "/auth/me"
          );

        if (cancelled) {
          return;
        }

        const user =
          response.data?.data ||
          response.data?.user ||
          response.data;

        setAdminUser(user);
      } catch (err) {
        console.error(
          "Admin session verification failed:",
          err
        );

        if (cancelled) {
          return;
        }

        localStorage.removeItem(
          "shozenAdminToken"
        );

        setAdminToken(null);
        setAdminUser(null);

        setActiveAdminSection(
          "dashboard"
        );
      } finally {
        if (!cancelled) {
          setAdminAuthLoading(false);
        }
      }
    };

    verifyAdmin();

    return () => {
      cancelled = true;
    };
  }, [adminToken]);

  const isAdminLoggedIn =
    Boolean(
      adminToken &&
      adminUser
    );

  const value = {
    isAdminPanelOpen,

    adminToken,
    adminUser,
    adminAuthLoading,
    isAdminLoggedIn,

    activeAdminSection,
    setActiveAdminSection,

    openAdminPanel,
    closeAdminPanel,
    toggleAdminPanel,

    loginAdmin,
    logoutAdmin,
  };

  return (
    <AdminPanelContext.Provider
      value={value}
    >
      {children}
    </AdminPanelContext.Provider>
  );
}

export function useAdminPanel() {
  const context =
    useContext(
      AdminPanelContext
    );

  if (!context) {
    throw new Error(
      "useAdminPanel must be used inside AdminPanelProvider"
    );
  }

  return context;
}