
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
  icon: any;
  submenu?: SidebarItem[];
  role?: string[];
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
    submenu: [
      {
        title: "Patient List",
        href: "/patients",
        icon: Users,
      },
      {
        title: "Vitals",
        href: "/patient-vitals",
        icon: Activity,
      },
      {
        title: "Medical Records",
        href: "/medical-records",
        icon: ClipboardList,
      },
      {
        title: "Medications",
        href: "/medications",
        icon: Pill,
      },
      {
        title: "Prescriptions",
        href: "/prescriptions",
        icon: FileText,
      },
      {
        title: "Health Tracker",
        href: "/health-tracker",
        icon: Activity,
      },
    ],
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Communications",
    href: "/email",
    icon: Mail,
    submenu: [
      {
        title: "Email",
        href: "/email",
        icon: Mail,
      },
      {
        title: "Call Tracking",
        href: "/call-tracking",
        icon: Phone,
      },
      {
        title: "Workflows",
        href: "/workflows",
        icon: Workflow,
      },
    ],
  },
  {
    title: "Contacts",
    href: "/contacts",
    icon: User,
  },
  {
    title: "Deals",
    href: "/deals",
    icon: BadgeDollarSign,
  },
  {
    title: "Organizations",
    href: "/organizations",
    icon: Building2,
  },
  {
    title: "Front Desk",
    href: "/front-desk",
    icon: BookUser,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart2,
  },
  {
    title: "Office",
    href: "/office",
    icon: Building,
  },
  {
    title: "Compliance",
    href: "/compliance",
    icon: ShieldCheck,
  },
  {
    title: "Roadmap",
    href: "/dashboard-roadmap",
    icon: GanttChart,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    submenu: [
      {
        title: "User Settings",
        href: "/settings",
        icon: Settings,
      },
      {
        title: "Admin Settings",
        href: "/admin-settings",
        icon: Settings,
        role: ["admin"],
      },
      {
        title: "User Management",
        href: "/user-management",
        icon: Users,
        role: ["admin"],
      },
    ],
  },
];
