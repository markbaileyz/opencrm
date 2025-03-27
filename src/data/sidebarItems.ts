
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
  UserCog
} from "lucide-react";
import React from "react";

export interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  roles?: string[];
}

export const baseSidebarItems: SidebarItem[] = [
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: "Dashboard",
    href: "/dashboard",
  },
];

export const medicalSidebarItems: SidebarItem[] = [
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

export const adminSidebarItems: SidebarItem[] = [
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

export const settingsSidebarItems: SidebarItem[] = [
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

export const adminSettingsItems: SidebarItem[] = [
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

export const getAllSidebarItems = () => [
  ...baseSidebarItems,
  ...medicalSidebarItems,
  ...adminSidebarItems,
  ...settingsSidebarItems,
  ...adminSettingsItems
];
