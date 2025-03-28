
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
  
  // Get all items without grouping
  const allItems = filteredItems;
  
  const isActive = (path: string) => location.pathname === path;

  // Helper function to render icon components properly
  const renderIcon = (IconComponent: any) => {
    // Check if IconComponent is a valid React element
    if (React.isValidElement(IconComponent)) {
      return IconComponent;
    }
    // Create an instance of the icon component
    const Icon = IconComponent;
    return <Icon size={20} />;
  };
  
  return (
    <nav className="space-y-6">
      {/* All items without sectioning to ensure everything is visible */}
      <div className="space-y-1">
        {allItems.map((item) => (
          <SidebarLink
            key={item.title}
            href={item.href}
            isActive={isActive(item.href)}
          >
            {renderIcon(item.icon)}
            <span>{item.title}</span>
          </SidebarLink>
        ))}
      </div>
    </nav>
  );
};

export default SidebarContent;
