
import React from "react";
import { CRMModule } from "@/types/crm-modules";
import { Building, Utensils, Home, Tooth, Users, CalendarClock, FileText, Mail, Phone, CreditCard } from "lucide-react";
import HealthcareCRMModule from "@/components/crm-modules/HealthcareCRMModule";
import RealEstateCRMModule from "@/components/crm-modules/RealEstateCRMModule";
import RestaurantCRMModule from "@/components/crm-modules/RestaurantCRMModule";
import ContactsModule from "@/components/crm-modules/ContactsModule";
import CalendarModule from "@/components/crm-modules/CalendarModule";
import DocumentsModule from "@/components/crm-modules/DocumentsModule";
import EmailModule from "@/components/crm-modules/EmailModule";
import CallTrackingModule from "@/components/crm-modules/CallTrackingModule";
import BillingModule from "@/components/crm-modules/BillingModule";

// Core modules
export const CORE_MODULES: CRMModule[] = [
  {
    id: "contacts",
    name: "Contacts",
    description: "Manage your customer contacts and leads",
    icon: Users,
    price: 9.99,
    component: ContactsModule,
    features: [
      "Contact database", 
      "Lead tracking",
      "Contact organization",
      "Import/export contacts"
    ]
  },
  {
    id: "calendar",
    name: "Calendar & Scheduling",
    description: "Schedule and manage appointments",
    icon: CalendarClock,
    price: 9.99,
    component: CalendarModule,
    features: [
      "Appointment scheduling",
      "Calendar view",
      "Reminders",
      "Recurring appointments"
    ]
  },
  {
    id: "documents",
    name: "Documents",
    description: "Store and manage documents",
    icon: FileText,
    price: 7.99,
    component: DocumentsModule,
    features: [
      "Document storage",
      "File sharing",
      "Document templates",
      "Version control"
    ]
  },
  {
    id: "email",
    name: "Email Integration",
    description: "Send and receive emails within the CRM",
    icon: Mail,
    price: 5.99,
    component: EmailModule,
    features: [
      "Email sending/receiving",
      "Email templates",
      "Email tracking",
      "Email campaigns"
    ]
  },
  {
    id: "call-tracking",
    name: "Call Tracking",
    description: "Track and record calls with customers",
    icon: Phone,
    price: 6.99,
    component: CallTrackingModule,
    features: [
      "Call logging",
      "Call recording",
      "Call analytics",
      "Call notes"
    ]
  },
  {
    id: "billing",
    name: "Billing & Payments",
    description: "Manage billing and receive payments",
    icon: CreditCard,
    price: 12.99,
    component: BillingModule,
    features: [
      "Invoice generation",
      "Payment processing",
      "Subscription management",
      "Payment reminders"
    ]
  }
];

// Industry-specific modules
export const INDUSTRY_MODULES: CRMModule[] = [
  {
    id: "healthcare",
    name: "Healthcare CRM",
    description: "Specialized tools for dental and healthcare practices",
    icon: Tooth,
    price: 24.99,
    component: HealthcareCRMModule,
    features: [
      "Patient records",
      "Treatment plans",
      "Medical history",
      "Insurance verification",
      "HIPAA compliance",
      "Patient portal"
    ],
    dependencies: ["contacts", "calendar", "documents"]
  },
  {
    id: "real-estate",
    name: "Real Estate CRM",
    description: "Tools for property management and client check-in",
    icon: Home,
    price: 19.99,
    component: RealEstateCRMModule,
    features: [
      "Property listings",
      "Client check-in",
      "Showing scheduling",
      "Property matching",
      "Transaction tracking",
      "Commission management"
    ],
    dependencies: ["contacts", "calendar"]
  },
  {
    id: "restaurant",
    name: "Restaurant CRM",
    description: "Order management and customer tracking for restaurants",
    icon: Utensils,
    price: 17.99,
    component: RestaurantCRMModule,
    features: [
      "Order management",
      "Table reservations",
      "Menu management",
      "Customer preferences",
      "Loyalty program",
      "Online ordering"
    ],
    dependencies: ["contacts", "calendar"]
  },
  {
    id: "basic",
    name: "Basic CRM",
    description: "Simple customer relationship management for any business",
    icon: Building,
    price: 14.99,
    component: ContactsModule,
    features: [
      "Contact management",
      "Task tracking",
      "Basic reporting",
      "Notes and activities",
      "Simple pipeline"
    ],
    dependencies: ["contacts"]
  }
];

// All modules combined
export const ALL_MODULES = [...CORE_MODULES, ...INDUSTRY_MODULES];

// Helper function to get a module by ID
export const getModuleById = (moduleId: string): CRMModule | undefined => {
  return ALL_MODULES.find(module => module.id === moduleId);
};

// Calculate price based on selected modules
export const calculatePrice = (moduleIds: string[]): number => {
  return moduleIds.reduce((total, moduleId) => {
    const module = getModuleById(moduleId);
    return total + (module?.price || 0);
  }, 0);
};
