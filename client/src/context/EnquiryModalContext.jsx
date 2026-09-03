import { createContext, useContext, useState } from "react";
import ProjectEnquiryModal from "../components/common/ProjectEnquiryModal";

const EnquiryModalContext = createContext(null);

export function EnquiryModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openEnquiryModal = () => {
    setIsOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsOpen(false);
  };

  return (
    <EnquiryModalContext.Provider
      value={{
        openEnquiryModal,
        closeEnquiryModal,
      }}
    >
      {children}

      <ProjectEnquiryModal
        isOpen={isOpen}
        onClose={closeEnquiryModal}
      />
    </EnquiryModalContext.Provider>
  );
}

export function useEnquiryModal() {
  const context = useContext(EnquiryModalContext);

  if (!context) {
    throw new Error(
      "useEnquiryModal must be used inside EnquiryModalProvider"
    );
  }

  return context;
}