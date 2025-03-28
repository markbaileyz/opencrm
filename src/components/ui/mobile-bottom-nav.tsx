
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home,
  Calendar,
  Users,
  Mail,
  Settings,
  BarChart2,
  LucideIcon
} from "lucide-react";

interface MobileBottomNavProps {
  className?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ className }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems: NavItem[] = [
    {
      href: "/dashboard",
      label: "Home",
      icon: Home
    },
    {
      href: "/calendar",
      label: "Calendar",
      icon: Calendar
    },
    {
      href: "/contacts",
      label: "Contacts",
      icon: Users
    },
    {
      href: "/email",
      label: "Messages",
      icon: Mail
    },
    {
      href: "/reports",
      label: "Reports",
      icon: BarChart2
    }
  ];
  
  return (
    <div className={cn("md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t", className)}>
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <NavItem 
            key={item.href}
            {...item}
            isActive={currentPath === item.href}
          />
        ))}
      </div>
    </div>
  );
};

interface NavItemProps extends NavItem {
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, icon: Icon, isActive }) => {
  return (
    <Link 
      to={href}
      className={cn(
        "flex flex-col items-center justify-center py-2 px-1 w-1/5 transition-colors",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      <Icon size={20} className={cn(
        isActive ? "text-primary" : "text-muted-foreground"
      )} />
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </Link>
  );
};

export default MobileBottomNav;
