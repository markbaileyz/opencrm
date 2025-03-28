
import { Home, Users, Calendar, FileText, Settings, Building2, DollarSign, BriefcaseMedical, Activity, Phone, GitBranch } from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Knowledge Base",
    href: "/knowledge-base",
    icon: FileText,
  },
  {
    title: "Organizations",
    href: "/organizations",
    icon: Building2,
  },
  {
    title: "Deals",
    href: "/deals",
    icon: DollarSign,
  },
  {
    title: "Office Management",
    href: "/office-management",
    icon: BriefcaseMedical,
  },
  {
    title: "Health Tracker",
    href: "/health-tracker",
    icon: Activity,
  },
  {
    title: "Call Tracking",
    href: "/call-tracking",
    icon: Phone,
  },
  {
    title: "Workflow Automation",
    href: "/workflow-automation",
    icon: GitBranch,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  }
];
