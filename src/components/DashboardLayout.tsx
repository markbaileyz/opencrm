
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  BarChart3,
  Calendar,
  Mailbox,
  Tags,
  Building,
  Lightbulb,
  HelpCircle,
  BookOpen,
  Shield,
  Key,
  FileLock,
  UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  roles?: string[];
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { logout, user, hasRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();
  
  const baseSidebarItems: SidebarItem[] = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      href: "/dashboard",
    },
  ];

  const medicalSidebarItems: SidebarItem[] = [
    {
      icon: <Users className="h-5 w-5" />,
      label: "Patients",
      href: "/patients",
      roles: ["admin", "doctor", "nurse"],
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Calendar",
      href: "/calendar",
      roles: ["admin", "doctor", "nurse"],
    },
    {
      icon: <Mailbox className="h-5 w-5" />,
      label: "Email",
      href: "/email",
      roles: ["admin", "doctor", "nurse"],
    },
  ];

  const adminSidebarItems: SidebarItem[] = [
    {
      icon: <Building className="h-5 w-5" />,
      label: "Organizations",
      href: "/organizations",
      roles: ["admin"],
    },
    {
      icon: <Tags className="h-5 w-5" />,
      label: "Deals",
      href: "/deals",
      roles: ["admin"],
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Reports",
      href: "/reports",
      roles: ["admin"],
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      label: "Roadmap",
      href: "/roadmap",
      roles: ["admin"],
    },
  ];

  const settingsSidebarItems: SidebarItem[] = [
    {
      icon: <HelpCircle className="h-5 w-5" />,
      label: "Knowledge Base",
      href: "/knowledge-base",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Challenges & Solutions",
      href: "/challenges-solutions",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/settings",
    },
  ];

  const adminSettingsItems: SidebarItem[] = [
    {
      icon: <Shield className="h-5 w-5" />,
      label: "Admin Settings",
      href: "/admin-settings",
      roles: ["admin"],
    },
    {
      icon: <FileLock className="h-5 w-5" />,
      label: "Compliance",
      href: "/compliance",
      roles: ["admin"],
    },
    {
      icon: <UserCog className="h-5 w-5" />,
      label: "User Management",
      href: "/users",
      roles: ["admin"],
    },
  ];
  
  const allSidebarItems = [
    ...baseSidebarItems,
    ...medicalSidebarItems,
    ...adminSidebarItems,
    ...settingsSidebarItems,
    ...adminSettingsItems
  ];

  const sidebarItems = allSidebarItems.filter(item => {
    if (!item.roles) return true;
    return hasRole(item.roles);
  });
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };
  
  return (
    <div className="flex h-screen">
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 left-4 z-50"
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      <aside
        className={cn(
          "w-64 flex-shrink-0 bg-secondary border-r border-r-muted py-4 px-2 fixed h-full z-40 md:relative",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "transition-transform duration-300 ease-in-out md:translate-x-0"
        )}
      >
        <div className="mb-4 px-4">
          <Link to="/" className="flex items-center text-lg font-semibold">
            OpenCRM
          </Link>
          {user && (
            <div className="mt-2 text-sm text-muted-foreground flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              {user.displayName || user.email} ({user.role})
            </div>
          )}
        </div>
        
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "group flex items-center space-x-3 py-2 px-4 rounded-md transition-colors duration-200",
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <Separator className="my-6" />
        <div className="p-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
