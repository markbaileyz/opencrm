
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Calendar,
  Mailbox,
  Tags,
  Building,
  Lightbulb,
  BarChart3,
  HelpCircle,
  BookOpen,
  Shield,
  FileLock,
  UserCog,
  ClipboardList
} from "lucide-react";
import React from "react";

export interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  roles?: string[];
}

// We need to create the sidebar items in a function that returns JSX
// This function will be called within the React component
export const baseSidebarItems: SidebarItem[] = [
  {
    icon: React.createElement(LayoutDashboard, { className: "h-5 w-5" }),
    label: "Dashboard",
    href: "/dashboard",
  },
];

export const medicalSidebarItems: SidebarItem[] = [
  {
    icon: React.createElement(Users, { className: "h-5 w-5" }),
    label: "Patients & Contacts",
    href: "/patients",
    roles: ["admin", "doctor", "nurse", "front-desk"],
  },
  {
    icon: React.createElement(ClipboardList, { className: "h-5 w-5" }),
    label: "Front Desk",
    href: "/front-desk",
    roles: ["admin", "front-desk"],
  },
  {
    icon: React.createElement(Calendar, { className: "h-5 w-5" }),
    label: "Calendar",
    href: "/calendar",
    roles: ["admin", "doctor", "nurse", "front-desk"],
  },
  {
    icon: React.createElement(Mailbox, { className: "h-5 w-5" }),
    label: "Email",
    href: "/email",
    roles: ["admin", "doctor", "nurse", "front-desk"],
  },
];

export const adminSidebarItems: SidebarItem[] = [
  {
    icon: React.createElement(Building, { className: "h-5 w-5" }),
    label: "Organizations",
    href: "/organizations",
    roles: ["admin"],
  },
  {
    icon: React.createElement(Tags, { className: "h-5 w-5" }),
    label: "Deals",
    href: "/deals",
    roles: ["admin"],
  },
  {
    icon: React.createElement(BarChart3, { className: "h-5 w-5" }),
    label: "Reports",
    href: "/reports",
    roles: ["admin"],
  },
  {
    icon: React.createElement(Lightbulb, { className: "h-5 w-5" }),
    label: "Roadmap",
    href: "/roadmap",
    roles: ["admin"],
  },
];

export const settingsSidebarItems: SidebarItem[] = [
  {
    icon: React.createElement(HelpCircle, { className: "h-5 w-5" }),
    label: "Knowledge Base",
    href: "/knowledge-base",
  },
  {
    icon: React.createElement(BookOpen, { className: "h-5 w-5" }),
    label: "Challenges & Solutions",
    href: "/challenges-solutions",
  },
  {
    icon: React.createElement(Settings, { className: "h-5 w-5" }),
    label: "Settings",
    href: "/settings",
  },
];

export const adminSettingsItems: SidebarItem[] = [
  {
    icon: React.createElement(Shield, { className: "h-5 w-5" }),
    label: "Admin Settings",
    href: "/admin-settings",
    roles: ["admin"],
  },
  {
    icon: React.createElement(FileLock, { className: "h-5 w-5" }),
    label: "Compliance",
    href: "/admin-settings",
    roles: ["admin"],
  },
  {
    icon: React.createElement(UserCog, { className: "h-5 w-5" }),
    label: "User Management",
    href: "/admin-settings",
    roles: ["admin"],
  },
];

export const getAllSidebarItems = () => [
  ...baseSidebarItems,
  ...medicalSidebarItems,
  ...adminSidebarItems,
  ...settingsSidebarItems,
  ...adminSettingsItems
];
