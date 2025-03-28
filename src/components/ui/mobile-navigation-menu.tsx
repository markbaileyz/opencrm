
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarItem, sidebarItems } from "@/data/sidebarItems";

const MobileNavigationMenu = () => {
  const location = useLocation();
  const { setOpenMobile } = useSidebar();
  const { user, hasRole } = useAuth();
  
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

  // Group sidebar items by their roles
  const baseSidebarItems = sidebarItems.filter(item => !item.role);
  const patientSidebarItems = sidebarItems.filter(item => 
    item.role?.includes("patient") && 
    !item.role?.includes("front-desk") && 
    !item.role?.some(r => ["admin", "power-user"].includes(r))
  );
  const doctorSidebarItems = sidebarItems.filter(item => 
    item.role?.includes("doctor") && 
    !patientSidebarItems.includes(item)
  );
  const nurseSidebarItems = sidebarItems.filter(item => 
    item.role?.includes("nurse") && 
    !doctorSidebarItems.includes(item) && 
    !patientSidebarItems.includes(item)
  );
  const frontDeskItems = sidebarItems.filter(item => 
    item.role?.includes("front-desk") && 
    !nurseSidebarItems.includes(item) && 
    !doctorSidebarItems.includes(item) && 
    !patientSidebarItems.includes(item)
  );
  const medicalSidebarItems = [...doctorSidebarItems, ...nurseSidebarItems];
  const communicationItems = sidebarItems.filter(item => 
    item.title === "Communications" || 
    item.title === "Email" || 
    item.title === "Call Tracking" ||
    item.title === "Workflows"
  );
  const adminSidebarItems = sidebarItems.filter(item => 
    (item.role?.includes("admin") || item.role?.includes("power-user")) && 
    !frontDeskItems.includes(item) && 
    !medicalSidebarItems.includes(item) && 
    !patientSidebarItems.includes(item) &&
    !communicationItems.includes(item)
  );
  const settingsSidebarItems = sidebarItems.filter(item => 
    item.title === "Settings" || 
    item.href === "/settings"
  );
  const adminSettingsItems = sidebarItems.filter(item => 
    (item.href === "/admin-settings" || item.href === "/user-management") && 
    item.role?.includes("admin")
  );
  
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
          {filterItemsByRole(baseSidebarItems).map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.title}
              active={isActive(item.href)}
              onClick={closeMobileMenu}
            />
          ))}
        </div>
        
        {/* Patient specific section - only show for patients */}
        {(hasRole("patient") || hasRole("admin") || hasRole("power-user")) && filterItemsByRole(patientSidebarItems).length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Patient
            </div>
            <div className="p-2">
              {filterItemsByRole(patientSidebarItems).map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.title}
                  active={isActive(item.href)}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Doctor specific section */}
        {(hasRole("doctor") || hasRole("admin") || hasRole("power-user")) && filterItemsByRole(doctorSidebarItems).length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Doctor
            </div>
            <div className="p-2">
              {filterItemsByRole(doctorSidebarItems).map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.title}
                  active={isActive(item.href)}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Nurse specific section */}
        {(hasRole("nurse") || hasRole("admin") || hasRole("power-user") || hasRole("doctor")) && filterItemsByRole(nurseSidebarItems).length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Nurse
            </div>
            <div className="p-2">
              {filterItemsByRole(nurseSidebarItems).map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.title}
                  active={isActive(item.href)}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Front desk specific section */}
        {(hasRole("front-desk") || hasRole("admin") || hasRole("power-user")) && filterItemsByRole(frontDeskItems).length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Front Desk
            </div>
            <div className="p-2">
              {filterItemsByRole(frontDeskItems).map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.title}
                  active={isActive(item.href)}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Medical staff section */}
        {filterItemsByRole(medicalSidebarItems).length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Medical
            </div>
            <div className="p-2">
              {filterItemsByRole(medicalSidebarItems).map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.title}
                  active={isActive(item.href)}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Communication section */}
        {filterItemsByRole(communicationItems).length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Communication
            </div>
            <div className="p-2">
              {filterItemsByRole(communicationItems).map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.title}
                  active={isActive(item.href)}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Admin section */}
        {(hasRole("admin") || hasRole("power-user")) && filterItemsByRole(adminSidebarItems).length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Admin
            </div>
            <div className="p-2">
              {filterItemsByRole(adminSidebarItems).map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.title}
                  active={isActive(item.href)}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </>
        )}
        
        <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
          Settings
        </div>
        <div className="p-2">
          {filterItemsByRole(settingsSidebarItems).map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.title}
              active={isActive(item.href)}
              onClick={closeMobileMenu}
            />
          ))}
          
          {hasRole("admin") && (
            <>
              {filterItemsByRole(adminSettingsItems).map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.title}
                  active={isActive(item.href)}
                  onClick={closeMobileMenu}
                />
              ))}
            </>
          )}
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
