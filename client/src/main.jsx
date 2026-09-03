import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { EnquiryModalProvider } from "./context/EnquiryModalContext";
import { AdminPanelProvider } from "./context/AdminPanelContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AdminPanelProvider>
        <EnquiryModalProvider>
          <App />
        </EnquiryModalProvider>
      </AdminPanelProvider>
    </BrowserRouter>
  </StrictMode>
);