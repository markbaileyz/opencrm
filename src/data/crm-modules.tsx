
import React from "react";
import { CRMModule } from "@/types/crm-modules";
import { Users, Calendar, Phone, Mail, FileText, Building, Home, Utensils, DollarSign, Calculator } from "lucide-react";

// Components
import ContactsModule from "@/components/crm-modules/ContactsModule";
import CalendarModule from "@/components/crm-modules/CalendarModule";
import CallTrackingModule from "@/components/crm-modules/CallTrackingModule";
import EmailModule from "@/components/crm-modules/EmailModule";
import DocumentsModule from "@/components/crm-modules/DocumentsModule";
import RealEstateCRMModule from "@/components/crm-modules/RealEstateCRMModule";
import RestaurantCRMModule from "@/components/crm-modules/RestaurantCRMModule";
import HealthcareCRMModule from "@/components/crm-modules/HealthcareCRMModule";
import BillingModule from "@/components/crm-modules/BillingModule";

// List of available CRM modules
export const ALL_MODULES: CRMModule[] = [
  {
    id: "contacts",
    name: "Contacts Management",
    description: "Store and manage all your contacts and leads",
    icon: Users,
    price: 9.99,
    component: ContactsModule,
    features: [
      "Contact database",
      "Lead tracking",
      "Activity history",
      "Follow-up reminders",
      "Contact tagging"
    ]
  },
  {
    id: "calendar",
    name: "Calendar & Scheduling",
    description: "Manage appointments and scheduling",
    icon: Calendar,
    price: 7.99,
    component: CalendarModule,
    features: [
      "Appointment scheduling",
      "Calendar views",
      "Reminders",
      "Recurring appointments",
      "Availability management"
    ]
  },
  {
    id: "call-tracking",
    name: "Call Tracking",
    description: "Log and manage phone calls with clients",
    icon: Phone,
    price: 5.99,
    component: CallTrackingModule,
    features: [
      "Call logging",
      "Call notes",
      "Call recording",
      "Call analytics",
      "Follow-up scheduling"
    ],
    dependencies: ["contacts"]
  },
  {
    id: "email",
    name: "Email Integration",
    description: "Send and track emails within the CRM",
    icon: Mail,
    price: 6.99,
    component: EmailModule,
    features: [
      "Email sending",
      "Email templates",
      "Email tracking",
      "Email scheduling",
      "Automated follow-ups"
    ],
    dependencies: ["contacts"]
  },
  {
    id: "documents",
    name: "Document Management",
    description: "Store and manage client documents",
    icon: FileText,
    price: 4.99,
    component: DocumentsModule,
    features: [
      "Document storage",
      "Document sharing",
      "Version control",
      "Document templates",
      "E-signatures"
    ]
  },
  {
    id: "real-estate",
    name: "Real Estate CRM",
    description: "Specialized tools for real estate businesses",
    icon: Home,
    price: 12.99,
    component: RealEstateCRMModule,
    features: [
      "Property listings",
      "Client matching",
      "Showing schedule",
      "Transaction management",
      "Market analytics"
    ],
    dependencies: ["contacts", "calendar"]
  },
  {
    id: "restaurant",
    name: "Restaurant CRM",
    description: "Specialized tools for restaurants",
    icon: Utensils,
    price: 12.99,
    component: RestaurantCRMModule,
    features: [
      "Reservation management",
      "Order history",
      "Customer preferences",
      "Loyalty program",
      "Menu management"
    ],
    dependencies: ["contacts"]
  },
  {
    id: "healthcare",
    name: "Healthcare CRM",
    description: "Specialized tools for healthcare providers",
    icon: Users,
    price: 14.99,
    component: HealthcareCRMModule,
    features: [
      "Patient records",
      "Appointment scheduling",
      "Treatment plans",
      "Insurance verification",
      "HIPAA compliance"
    ],
    dependencies: ["contacts", "calendar"]
  },
  {
    id: "billing",
    name: "Billing & Invoicing",
    description: "Generate and manage invoices and payments",
    icon: DollarSign,
    price: 8.99,
    component: BillingModule,
    features: [
      "Invoice generation",
      "Payment tracking",
      "Recurring billing",
      "Payment reminders",
      "Financial reporting"
    ]
  }
];

// Helper function to get a module by ID
export const getModuleById = (id: string): CRMModule | undefined => {
  return ALL_MODULES.find(module => module.id === id);
};

// Helper to calculate price based on active modules
export const calculatePrice = (activeModuleIds: string[]): number => {
  return activeModuleIds.reduce((total, moduleId) => {
    const module = getModuleById(moduleId);
    return total + (module?.price || 0);
  }, 0);
};
