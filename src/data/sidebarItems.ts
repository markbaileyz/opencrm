
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
  ClipboardList,
  FileText,
  Stethoscope,
  Pill,
  MessageSquare,
  Star,
  Award,
  Clipboard,
  HeartPulse
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
    roles: ["admin", "power-user", "doctor", "nurse", "front-desk"],
  },
  {
    icon: React.createElement(ClipboardList, { className: "h-5 w-5" }),
    label: "Front Desk",
    href: "/front-desk",
    roles: ["admin", "power-user", "front-desk"],
  },
  {
    icon: React.createElement(Calendar, { className: "h-5 w-5" }),
    label: "Calendar",
    href: "/calendar",
    roles: ["admin", "power-user", "doctor", "nurse", "front-desk"],
  },
  {
    icon: React.createElement(Mailbox, { className: "h-5 w-5" }),
    label: "Email",
    href: "/email",
    roles: ["admin", "power-user", "doctor", "nurse", "front-desk", "patient"],
  },
];

export const patientSidebarItems: SidebarItem[] = [
  {
    icon: React.createElement(FileText, { className: "h-5 w-5" }),
    label: "Medical Records",
    href: "/medical-records",
    roles: ["admin", "power-user", "doctor", "nurse", "patient"],
  },
  {
    icon: React.createElement(Pill, { className: "h-5 w-5" }),
    label: "Medications",
    href: "/medications",
    roles: ["admin", "power-user", "doctor", "nurse", "patient"],
  },
  {
    icon: React.createElement(HeartPulse, { className: "h-5 w-5" }),
    label: "Health Tracker",
    href: "/health-tracker",
    roles: ["admin", "power-user", "doctor", "patient"],
  },
];

export const doctorSidebarItems: SidebarItem[] = [
  {
    icon: React.createElement(Stethoscope, { className: "h-5 w-5" }),
    label: "Clinical Dashboard",
    href: "/clinical-dashboard",
    roles: ["admin", "power-user", "doctor"],
  },
  {
    icon: React.createElement(Clipboard, { className: "h-5 w-5" }),
    label: "Prescriptions",
    href: "/prescriptions",
    roles: ["admin", "power-user", "doctor"],
  },
];

export const nurseSidebarItems: SidebarItem[] = [
  {
    icon: React.createElement(Clipboard, { className: "h-5 w-5" }),
    label: "Patient Vitals",
    href: "/patient-vitals",
    roles: ["admin", "power-user", "doctor", "nurse"],
  },
];

export const communicationItems: SidebarItem[] = [
  {
    icon: React.createElement(MessageSquare, { className: "h-5 w-5" }),
    label: "Secure Chat",
    href: "/secure-chat",
    roles: ["admin", "power-user", "doctor", "nurse", "front-desk", "patient"],
  },
];

export const frontDeskItems: SidebarItem[] = [
  {
    icon: React.createElement(Star, { className: "h-5 w-5" }),
    label: "Patient Feedback",
    href: "/patient-feedback",
    roles: ["admin", "power-user", "front-desk"],
  },
  {
    icon: React.createElement(Award, { className: "h-5 w-5" }),
    label: "Office Management",
    href: "/office-management",
    roles: ["admin", "power-user", "front-desk"],
  },
];

export const adminSidebarItems: SidebarItem[] = [
  {
    icon: React.createElement(Building, { className: "h-5 w-5" }),
    label: "Organizations",
    href: "/organizations",
    roles: ["admin", "power-user"],
  },
  {
    icon: React.createElement(Tags, { className: "h-5 w-5" }),
    label: "Deals",
    href: "/deals",
    roles: ["admin", "power-user"],
  },
  {
    icon: React.createElement(BarChart3, { className: "h-5 w-5" }),
    label: "Reports",
    href: "/reports",
    roles: ["admin", "power-user"],
  },
  {
    icon: React.createElement(Lightbulb, { className: "h-5 w-5" }),
    label: "Roadmap",
    href: "/dashboard-roadmap",
    roles: ["admin", "power-user"],
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
    href: "/compliance",
    roles: ["admin", "power-user"],
  },
  {
    icon: React.createElement(UserCog, { className: "h-5 w-5" }),
    label: "User Management",
    href: "/user-management",
    roles: ["admin"],
  },
];

export const getAllSidebarItems = () => [
  ...baseSidebarItems,
  ...medicalSidebarItems,
  ...patientSidebarItems,
  ...doctorSidebarItems,
  ...nurseSidebarItems,
  ...communicationItems,
  ...frontDeskItems,
  ...adminSidebarItems,
  ...settingsSidebarItems,
  ...adminSettingsItems
];
