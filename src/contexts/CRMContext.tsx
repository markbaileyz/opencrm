
import React, { createContext, useContext, useState } from "react";
import ContactsModule from "@/components/crm-modules/ContactsModule";
import CalendarModule from "@/components/crm-modules/CalendarModule";
import EmailModule from "@/components/crm-modules/EmailModule";
import BillingModule from "@/components/crm-modules/BillingModule";
import CallTrackingModule from "@/components/crm-modules/CallTrackingModule";
import DocumentsModule from "@/components/crm-modules/DocumentsModule";
import HealthcareCRMModule from "@/components/crm-modules/HealthcareCRMModule";
import RealEstateCRMModule from "@/components/crm-modules/RealEstateCRMModule";
import RestaurantCRMModule from "@/components/crm-modules/RestaurantCRMModule";

// Define types
export type CRMModuleType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  component: React.ComponentType;
  category: "core" | "industry" | "extension";
  active: boolean;
};

type CRMContextType = {
  modules: CRMModuleType[];
  activeModules: CRMModuleType[];
  toggleModuleActive: (id: string) => void;
  isModuleActive: (id: string) => boolean;
  setCrmType: (type: string) => void;
  crmType: string;
};

// Create context
const CRMContext = createContext<CRMContextType>({
  modules: [],
  activeModules: [],
  toggleModuleActive: () => {},
  isModuleActive: () => false,
  setCrmType: () => {},
  crmType: "generic",
});

// Create provider
export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Define available modules
  const allModules: CRMModuleType[] = [
    {
      id: "contacts",
      name: "Contacts",
      description: "Manage contacts and leads",
      icon: "users",
      component: ContactsModule,
      category: "core",
      active: true,
    },
    {
      id: "calendar",
      name: "Calendar",
      description: "Schedule and manage appointments",
      icon: "calendar",
      component: CalendarModule,
      category: "core",
      active: true,
    },
    {
      id: "email",
      name: "Email",
      description: "Send and receive emails",
      icon: "mail",
      component: EmailModule,
      category: "core",
      active: true,
    },
    {
      id: "billing",
      name: "Billing",
      description: "Manage invoices and payments",
      icon: "credit-card",
      component: BillingModule,
      category: "core",
      active: false,
    },
    {
      id: "call-tracking",
      name: "Call Tracking",
      description: "Track calls and follow-ups",
      icon: "phone",
      component: CallTrackingModule,
      category: "extension",
      active: false,
    },
    {
      id: "documents",
      name: "Documents",
      description: "Store and manage documents",
      icon: "file-text",
      component: DocumentsModule,
      category: "extension",
      active: false,
    },
    {
      id: "healthcare",
      name: "Healthcare CRM",
      description: "CRM for healthcare providers",
      icon: "stethoscope",
      component: HealthcareCRMModule,
      category: "industry",
      active: true,
    },
    {
      id: "real-estate",
      name: "Real Estate CRM",
      description: "CRM for real estate agents",
      icon: "home",
      component: RealEstateCRMModule,
      category: "industry",
      active: false,
    },
    {
      id: "restaurant",
      name: "Restaurant CRM",
      description: "CRM for restaurants",
      icon: "utensils",
      component: RestaurantCRMModule,
      category: "industry",
      active: false,
    },
  ];

  const [modules, setModules] = useState<CRMModuleType[]>(allModules);
  const [crmType, setCrmType] = useState<string>("healthcare");

  // Get active modules
  const activeModules = modules.filter((module) => module.active);

  // Toggle module active state
  const toggleModuleActive = (id: string) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id ? { ...module, active: !module.active } : module
      )
    );
  };

  // Check if module is active
  const isModuleActive = (id: string) => {
    const module = modules.find((m) => m.id === id);
    return module ? module.active : false;
  };

  return (
    <CRMContext.Provider
      value={{
        modules,
        activeModules,
        toggleModuleActive,
        isModuleActive,
        setCrmType,
        crmType,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

// Create hook for using CRM context
export const useCRM = () => useContext(CRMContext);
