
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarItem, sidebarItems } from "@/data/sidebarItems";
import { ChevronDown, ChevronRight } from "lucide-react";

const MobileNavigationMenu = () => {
  const location = useLocation();
  const { setOpenMobile } = useSidebar();
  const { user, hasRole } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const isActive = (href: string) => {
    return location.pathname === href;
  };
  
  const closeMobileMenu = () => {
    setOpenMobile(false);
  };
  
  // Filter items based on user role
  const filterItemsByRole = (items: SidebarItem[]) => {
    return items.filter(item => {
      if (!item.role) return true;
      return hasRole(item.role);
    });
  };

  // Get all items
  const allSidebarItems = sidebarItems;

  // Toggle submenu visibility
  const toggleSubmenu = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };
  
  // Render icon components properly
  const renderIcon = (IconComponent: any) => {
    if (React.isValidElement(IconComponent)) {
      return IconComponent;
    }
    const Icon = IconComponent;
    return <Icon size={20} />;
  };
  
  // On mount, check if any menu should be open based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Check if current path is in any submenu
    filterItemsByRole(allSidebarItems).forEach(item => {
      if (item.submenu) {
        const isInSubmenu = item.submenu.some(subItem => subItem.href === currentPath);
        if (isInSubmenu && !expandedItems.includes(item.title)) {
          setExpandedItems(prev => [...prev, item.title]);
        }
      }
    });
  }, [location.pathname]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.photoURL} alt={user?.displayName || ""} />
            <AvatarFallback>{getInitials(user?.displayName || "")}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user?.displayName || "User"}</div>
            <div className="text-xs text-muted-foreground">{user?.email}</div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {filterItemsByRole(allSidebarItems).map((item) => (
            <div key={item.href || item.title} className="mb-1">
              {item.submenu ? (
                <div>
                  <button
                    onClick={(e) => toggleSubmenu(item.title, e)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-md text-sm font-medium transition-colors",
                      isActive(item.href) 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-current">{renderIcon(item.icon)}</span>
                      {item.title}
                    </div>
                    {expandedItems.includes(item.title) ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                  
                  {expandedItems.includes(item.title) && (
                    <div className="pl-10 mt-1 space-y-1">
                      {item.submenu
                        .filter(subItem => {
                          if (!subItem.role) return true;
                          return hasRole(subItem.role);
                        })
                        .map((subItem) => (
                          <NavLink
                            key={subItem.href}
                            href={subItem.href}
                            icon={renderIcon(subItem.icon)}
                            label={subItem.title}
                            active={isActive(subItem.href)}
                            onClick={closeMobileMenu}
                          />
                        ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  href={item.href}
                  icon={renderIcon(item.icon)}
                  label={item.title}
                  active={isActive(item.href)}
                  onClick={closeMobileMenu}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t">
        <button 
          className="w-full py-2 px-3 text-sm text-left rounded-md hover:bg-muted"
          onClick={() => {
            closeMobileMenu();
            // Add logout logic here
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  icon,
  label,
  active = false,
  onClick
}) => {
  return (
    <Link 
      to={href} 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm mb-1 transition-colors",
        active 
          ? "bg-primary/10 text-primary font-medium" 
          : "hover:bg-muted text-foreground"
      )}
    >
      <span className="text-current">{icon}</span>
      {label}
    </Link>
  );
};

export default MobileNavigationMenu;
