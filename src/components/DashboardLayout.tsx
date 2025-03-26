
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonCustom } from "./ui/button-custom";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  ClipboardList,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out glass border-r border-border md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-4 border-b border-border">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                NextCRM
              </span>
            </Link>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
            <nav className="space-y-1">
              <SidebarLink href="/dashboard" icon={<Home className="h-5 w-5" />}>
                Dashboard
              </SidebarLink>
              <SidebarLink href="/dashboard/patients" icon={<Users className="h-5 w-5" />}>
                Patients
              </SidebarLink>
              <SidebarLink href="/dashboard/calendar" icon={<Calendar className="h-5 w-5" />}>
                Calendar
              </SidebarLink>
              <SidebarLink href="/dashboard/messages" icon={<MessageSquare className="h-5 w-5" />}>
                Messages
              </SidebarLink>
              <SidebarLink href="/dashboard/documents" icon={<ClipboardList className="h-5 w-5" />}>
                Documents
              </SidebarLink>
              <SidebarLink href="/dashboard/settings" icon={<Settings className="h-5 w-5" />}>
                Settings
              </SidebarLink>
            </nav>
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {user?.email.charAt(0).toUpperCase()}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium truncate max-w-[120px]">
                    {user?.email}
                  </p>
                </div>
              </div>
              <ButtonCustom
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-5 w-5" />
              </ButtonCustom>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="md:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 glass border-b border-border shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Search */}
            <div className="hidden md:flex items-center h-10 rounded-md bg-background px-3 flex-1 max-w-xs">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent outline-none w-full text-sm"
              />
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <button className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium md:hidden">
                {user?.email.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

// Sidebar Link Component
interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarLink = ({ href, icon, children }: SidebarLinkProps) => {
  // Check if current path matches this link
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{children}</span>
    </Link>
  );
};

export default DashboardLayout;
