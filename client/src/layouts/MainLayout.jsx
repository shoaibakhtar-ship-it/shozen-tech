import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import EnquiryWidget from "../components/common/EnquiryWidget";
import AdminSidebar from "../components/admin/AdminSidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#111111]">
      <ScrollToTop />

      <Navbar />

      <main className="flex-1 bg-white">
        <Outlet />
      </main>

      <Footer />

      <EnquiryWidget />

      {/* GLOBAL ADMIN SIDEBAR */}
      <AdminSidebar />
    </div>
  );
}

export default MainLayout;