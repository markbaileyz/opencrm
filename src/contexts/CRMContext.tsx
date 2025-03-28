
import React, { createContext, useContext, useState, useEffect } from "react";
import { CRMConfig, CRMModule } from "@/types/crm-modules";
import { ALL_MODULES, calculatePrice, getModuleById } from "@/data/crm-modules";

interface CRMContextType {
  config: CRMConfig;
  modules: CRMModule[];
  addModule: (moduleId: string) => void;
  removeModule: (moduleId: string) => void;
  isModuleActive: (moduleId: string) => boolean;
  getActiveModules: () => CRMModule[];
  getTotalPrice: () => number;
}

const initialConfig: CRMConfig = {
  activeModules: ["contacts"], // Start with the contacts module
  totalPrice: 9.99
};

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<CRMConfig>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem("crmConfig");
    return saved ? JSON.parse(saved) : initialConfig;
  });

  useEffect(() => {
    // Save to localStorage whenever config changes
    localStorage.setItem("crmConfig", JSON.stringify(config));
  }, [config]);

  const addModule = (moduleId: string) => {
    // Check if the module exists
    const module = getModuleById(moduleId);
    if (!module) return;

    // Check if the module is already active
    if (config.activeModules.includes(moduleId)) return;

    // Add dependencies if they exist
    let newActiveModules = [...config.activeModules, moduleId];
    
    if (module.dependencies) {
      module.dependencies.forEach(depId => {
        if (!newActiveModules.includes(depId)) {
          newActiveModules.push(depId);
        }
      });
    }

    const newTotalPrice = calculatePrice(newActiveModules);
    
    setConfig({
      activeModules: newActiveModules,
      totalPrice: newTotalPrice
    });
  };

  const removeModule = (moduleId: string) => {
    // Don't allow removing dependencies of active modules
    const dependentModules = ALL_MODULES.filter(
      m => m.dependencies?.includes(moduleId) && config.activeModules.includes(m.id)
    );
    
    if (dependentModules.length > 0) {
      console.error("Cannot remove this module as it is required by: ", 
        dependentModules.map(m => m.name).join(", "));
      return;
    }

    const newActiveModules = config.activeModules.filter(id => id !== moduleId);
    const newTotalPrice = calculatePrice(newActiveModules);
    
    setConfig({
      activeModules: newActiveModules,
      totalPrice: newTotalPrice
    });
  };

  const isModuleActive = (moduleId: string): boolean => {
    return config.activeModules.includes(moduleId);
  };

  const getActiveModules = (): CRMModule[] => {
    return ALL_MODULES.filter(module => config.activeModules.includes(module.id));
  };

  const getTotalPrice = (): number => {
    return config.totalPrice;
  };

  return (
    <CRMContext.Provider 
      value={{ 
        config, 
        modules: ALL_MODULES, 
        addModule, 
        removeModule, 
        isModuleActive,
        getActiveModules,
        getTotalPrice
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error("useCRM must be used within a CRMProvider");
  }
  return context;
};
