import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Services from "../pages/Services";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import About from "../pages/About";
import Process from "../pages/Process";
import Contact from "../pages/Contact";

function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC WEBSITE */}
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/projects/:slug"
          element={
            <ProjectDetails />
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/process"
          element={<Process />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
      </Route>

      {/* OLD ADMIN URLS */}
      <Route
        path="/admin"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

      <Route
        path="/admin/login"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

      <Route
        path="/admin/projects"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

      <Route
        path="/admin/services"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

      {/* UNKNOWN ROUTE */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;