
import React, { createContext, useContext, useState } from "react";

interface SidebarContextType {
  isOpen: boolean;
  openMobile: boolean;
  setIsOpen: (value: boolean) => void;
  setOpenMobile: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  openMobile: false,
  setIsOpen: () => {},
  setOpenMobile: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, openMobile, setIsOpen, setOpenMobile }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen } = useSidebar();
  
  return (
    <aside
      className={`${isOpen ? "w-64" : "w-16"} bg-background border-r transition-all duration-300 ease-in-out h-screen`}
    >
      {children}
    </aside>
  );
};

export const SidebarContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen } = useSidebar();
  
  return (
    <div className={`${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
      {children}
    </div>
  );
};
