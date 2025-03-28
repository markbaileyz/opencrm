
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  FileText,
  Mail,
  User,
  Building2,
  BarChart2,
  BadgeDollarSign,
  Stethoscope,
  Pill,
  ClipboardList,
  Activity,
  Phone,
  BookUser,
  GanttChart,
  Building,
  ShieldCheck,
  Workflow
} from "lucide-react";

export interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  submenu?: SidebarItem[];
  role?: string[];
}

// Base sidebar items that should appear for all users
export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: <Users size={20} />,
    submenu: [
      {
        title: "Patient List",
        href: "/patients",
        icon: <Users size={20} />,
      },
      {
        title: "Vitals",
        href: "/patient-vitals",
        icon: <Activity size={20} />,
      },
      {
        title: "Medical Records",
        href: "/medical-records",
        icon: <ClipboardList size={20} />,
      },
      {
        title: "Medications",
        href: "/medications",
        icon: <Pill size={20} />,
      },
      {
        title: "Prescriptions",
        href: "/prescriptions",
        icon: <FileText size={20} />,
      },
      {
        title: "Health Tracker",
        href: "/health-tracker",
        icon: <Activity size={20} />,
      },
    ],
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: <Calendar size={20} />,
  },
  {
    title: "Communications",
    href: "/email",
    icon: <Mail size={20} />,
    submenu: [
      {
        title: "Email",
        href: "/email",
        icon: <Mail size={20} />,
      },
      {
        title: "Call Tracking",
        href: "/call-tracking",
        icon: <Phone size={20} />,
      },
      {
        title: "Workflows",
        href: "/workflows",
        icon: <Workflow size={20} />,
      },
    ],
  },
  {
    title: "Contacts",
    href: "/contacts",
    icon: <User size={20} />,
  },
  {
    title: "Deals",
    href: "/deals",
    icon: <BadgeDollarSign size={20} />,
  },
  {
    title: "Organizations",
    href: "/organizations",
    icon: <Building2 size={20} />,
  },
  {
    title: "Front Desk",
    href: "/front-desk",
    icon: <BookUser size={20} />,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: <BarChart2 size={20} />,
  },
  {
    title: "Office",
    href: "/office",
    icon: <Building size={20} />,
  },
  {
    title: "Compliance",
    href: "/compliance",
    icon: <ShieldCheck size={20} />,
  },
  {
    title: "Roadmap",
    href: "/dashboard-roadmap",
    icon: <GanttChart size={20} />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings size={20} />,
    submenu: [
      {
        title: "User Settings",
        href: "/settings",
        icon: <Settings size={20} />,
      },
      {
        title: "Admin Settings",
        href: "/admin-settings",
        icon: <Settings size={20} />,
        role: ["admin"],
      },
      {
        title: "User Management",
        href: "/user-management",
        icon: <Users size={20} />,
        role: ["admin"],
      },
    ],
  },
];

// Function to get all sidebar items
export const getAllSidebarItems = () => {
  return sidebarItems;
};
