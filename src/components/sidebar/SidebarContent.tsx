
import React from "react";
import { useLocation } from "react-router-dom";
import { SidebarItem } from "@/data/sidebarItems";
import SidebarLink from "./SidebarLink";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarContentProps {
  sidebarItems: SidebarItem[];
}

const SidebarContent = ({ sidebarItems }: SidebarContentProps) => {
  const location = useLocation();
  const { hasRole, user } = useAuth();
  const [openMenus, setOpenMenus] = React.useState<string[]>([]);
  
  // Filter sidebar items based on user's role
  const filteredItems = sidebarItems.filter(item => {
    if (!item.role) return true;
    return hasRole(item.role);
  });
  
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

  // Toggle submenu visibility
  const toggleSubmenu = (title: string) => {
    setOpenMenus(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };
  
  return (
    <nav className="space-y-1">
      {filteredItems.map((item) => (
        <div key={item.title} className="mb-1">
          {item.submenu ? (
            <div>
              <button
                onClick={() => toggleSubmenu(item.title)}
                className={cn(
                  "w-full flex items-center justify-between py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200",
                  isActive(item.href) 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <div className="flex items-center space-x-3">
                  {renderIcon(item.icon)}
                  <span>{item.title}</span>
                </div>
                {openMenus.includes(item.title) ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>
              
              {openMenus.includes(item.title) && (
                <div className="pl-10 mt-1 space-y-1">
                  {item.submenu
                    .filter(subItem => {
                      if (!subItem.role) return true;
                      return hasRole(subItem.role);
                    })
                    .map((subItem) => (
                      <SidebarLink
                        key={subItem.title}
                        href={subItem.href}
                        isActive={isActive(subItem.href)}
                      >
                        {renderIcon(subItem.icon)}
                        <span>{subItem.title}</span>
                      </SidebarLink>
                    ))}
                </div>
              )}
            </div>
          ) : (
            <SidebarLink
              href={item.href}
              isActive={isActive(item.href)}
            >
              {renderIcon(item.icon)}
              <span>{item.title}</span>
            </SidebarLink>
          )}
        </div>
      ))}
    </nav>
  );
};

export default SidebarContent;
