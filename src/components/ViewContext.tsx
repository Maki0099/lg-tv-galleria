
import React, { createContext, useContext, useState } from "react";

interface ViewContextType {
  isCompactView: boolean;
  toggleView: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCompactView, setIsCompactView] = useState(false);

  const toggleView = () => {
    setIsCompactView((prev) => !prev);
  };

  return (
    <ViewContext.Provider value={{ isCompactView, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
};
