
import React from "react";
import { useLocation } from "react-router-dom";
import { SidebarItem } from "@/data/sidebarItems";
import SidebarLink from "./SidebarLink";
import { useAuth } from "@/context/AuthContext";

interface SidebarContentProps {
  sidebarItems: SidebarItem[];
}

const SidebarContent = ({ sidebarItems }: SidebarContentProps) => {
  const location = useLocation();
  const { hasRole, user } = useAuth();
  
  // Filter sidebar items based on user's role
  const filteredItems = sidebarItems.filter(item => {
    if (!item.role) return true;
    return hasRole(item.role);
  });
  
  // Group sidebar items by their roles to create logical sections
  const baseSectionItems = filteredItems.filter(item => !item.role);
  const patientSectionItems = filteredItems.filter(item => 
    item.role?.includes("patient") && 
    !item.role?.includes("front-desk") && 
    !item.role?.some(r => ["admin", "power-user"].includes(r))
  );
  const medicalSectionItems = filteredItems.filter(item => 
    (item.role?.includes("doctor") || item.role?.includes("nurse")) && 
    !patientSectionItems.includes(item)
  );
  const frontDeskSectionItems = filteredItems.filter(item => 
    item.role?.includes("front-desk") && 
    !medicalSectionItems.includes(item) && 
    !patientSectionItems.includes(item)
  );
  const adminSectionItems = filteredItems.filter(item => 
    (item.role?.includes("admin") || item.role?.includes("power-user")) && 
    !frontDeskSectionItems.includes(item) && 
    !medicalSectionItems.includes(item) && 
    !patientSectionItems.includes(item)
  );
  
  const isActive = (path: string) => location.pathname === path;

  // Only show relevant sections based on user role
  const showPatientSection = user?.role === "patient" || user?.role === "admin" || user?.role === "power-user";
  const showMedicalSection = user?.role === "doctor" || user?.role === "nurse" || user?.role === "admin" || user?.role === "power-user";
  const showFrontDeskSection = user?.role === "front-desk" || user?.role === "admin" || user?.role === "power-user";
  const showAdminSection = user?.role === "admin" || user?.role === "power-user";
  
  const renderSidebarItem = (item: SidebarItem) => {
    // Create an instance of the icon component with the size prop
    const IconComponent = item.icon;
    
    return (
      <SidebarLink
        key={item.title}
        href={item.href}
        isActive={isActive(item.href)}
      >
        <IconComponent size={20} />
        <span>{item.title}</span>
      </SidebarLink>
    );
  };
  
  return (
    <nav className="space-y-6">
      {/* Base section */}
      <div className="space-y-1">
        {baseSectionItems.map(renderSidebarItem)}
      </div>
      
      {/* Patient section */}
      {showPatientSection && patientSectionItems.length > 0 && (
        <div>
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Patient
          </h3>
          <div className="mt-2 space-y-1">
            {patientSectionItems.map(renderSidebarItem)}
          </div>
        </div>
      )}
      
      {/* Medical section */}
      {showMedicalSection && medicalSectionItems.length > 0 && (
        <div>
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Medical
          </h3>
          <div className="mt-2 space-y-1">
            {medicalSectionItems.map(renderSidebarItem)}
          </div>
        </div>
      )}
      
      {/* Front Desk section */}
      {showFrontDeskSection && frontDeskSectionItems.length > 0 && (
        <div>
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Front Desk
          </h3>
          <div className="mt-2 space-y-1">
            {frontDeskSectionItems.map(renderSidebarItem)}
          </div>
        </div>
      )}
      
      {/* Admin section */}
      {showAdminSection && adminSectionItems.length > 0 && (
        <div>
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Admin
          </h3>
          <div className="mt-2 space-y-1">
            {adminSectionItems.map(renderSidebarItem)}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SidebarContent;
