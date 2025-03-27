
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
  const { hasRole } = useAuth();
  
  // Filter sidebar items based on user's role
  const filteredItems = sidebarItems.filter(item => {
    if (!item.roles) return true;
    return hasRole(item.roles);
  });
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="space-y-1">
      {filteredItems.map((item) => (
        <SidebarLink
          key={item.label}
          href={item.href}
          isActive={isActive(item.href)}
        >
          {item.icon}
          <span>{item.label}</span>
        </SidebarLink>
      ))}
    </nav>
  );
};

export default SidebarContent;
