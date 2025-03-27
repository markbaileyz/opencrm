
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  Mail,
  FileText,
  Settings,
  Building2,
  BarChart3,
  LogOut,
  Store,
  Thermometer,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  indented?: boolean;
}

const SidebarLink = ({
  href,
  icon,
  children,
  className,
  isActive,
  indented = false,
}: SidebarLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
        indented && "ml-6",
        className
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarSection = ({ title, children }: SidebarSectionProps) => {
  return (
    <div className="px-3 py-2">
      <h3 className="mb-2 text-xs font-semibold text-muted-foreground">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

const DashboardSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [officeOpen, setOfficeOpen] = React.useState(true);
  const [patientOpen, setPatientOpen] = React.useState(true);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen flex-col border-r">
      <div className="p-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            OpenCRM
          </span>
        </Link>
      </div>
      
      <Separator />
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <SidebarLink
            href="/dashboard"
            icon={<LayoutDashboard className="h-4 w-4" />}
            isActive={isActive("/dashboard")}
          >
            Dashboard
          </SidebarLink>
          
          <Collapsible
            open={patientOpen}
            onOpenChange={setPatientOpen}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "flex w-full items-center justify-between p-2",
                  isActive("/patients") && "bg-primary/10 text-primary font-medium"
                )}
              >
                <div className="flex items-center gap-3">
                  <UserCog className="h-4 w-4" />
                  <span>Patients</span>
                </div>
                {patientOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              <SidebarLink
                href="/patients"
                icon={<Thermometer className="h-4 w-4" />}
                isActive={isActive("/patients")}
                indented
              >
                Patient Records
              </SidebarLink>
              <SidebarLink
                href="/front-desk"
                icon={<Store className="h-4 w-4" />}
                isActive={isActive("/front-desk")}
                indented
              >
                Front Desk
              </SidebarLink>
            </CollapsibleContent>
          </Collapsible>
          
          <SidebarLink
            href="/contacts"
            icon={<Users className="h-4 w-4" />}
            isActive={isActive("/contacts")}
          >
            Contacts
          </SidebarLink>
          
          <SidebarLink
            href="/calendar"
            icon={<Calendar className="h-4 w-4" />}
            isActive={isActive("/calendar")}
          >
            Calendar
          </SidebarLink>
          
          <SidebarLink
            href="/email"
            icon={<Mail className="h-4 w-4" />}
            isActive={isActive("/email")}
          >
            Email
          </SidebarLink>
          
          <Collapsible
            open={officeOpen}
            onOpenChange={setOfficeOpen}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "flex w-full items-center justify-between p-2",
                  isActive("/office") && "bg-primary/10 text-primary font-medium"
                )}
              >
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4" />
                  <span>Office</span>
                </div>
                {officeOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              <SidebarLink
                href="/office"
                icon={<Building2 className="h-4 w-4" />}
                isActive={isActive("/office")}
                indented
              >
                Office Management
              </SidebarLink>
            </CollapsibleContent>
          </Collapsible>
          
          <SidebarLink
            href="/reports"
            icon={<BarChart3 className="h-4 w-4" />}
            isActive={isActive("/reports")}
          >
            Reports
          </SidebarLink>
          
          <SidebarLink
            href="/settings"
            icon={<Settings className="h-4 w-4" />}
            isActive={isActive("/settings")}
          >
            Settings
          </SidebarLink>
        </nav>
      </div>
      
      <Separator />
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <div className="rounded-full h-8 w-8 bg-primary/10 flex items-center justify-center">
              {user?.displayName?.charAt(0) || "U"}
            </div>
            <div>
              <p className="font-medium">{user?.displayName || "User"}</p>
              <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
