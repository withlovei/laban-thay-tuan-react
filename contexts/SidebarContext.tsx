import React, { createContext, useContext, useState } from 'react';

type SidebarContextType = {
  isSidebarVisible: boolean;
  showSidebar: () => void;
  hideSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const showSidebar = () => setIsSidebarVisible(true);
  const hideSidebar = () => setIsSidebarVisible(false);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarVisible,
        showSidebar,
        hideSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within an SidebarProvider');
  }
  return context;
}; 