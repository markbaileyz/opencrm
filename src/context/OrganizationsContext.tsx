
import React, { createContext, useContext, useState } from 'react';

// Define the shape of an organization
interface Organization {
  id: number;
  name: string;
  type?: string;
  size?: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  industry?: string;
  status: 'Active' | 'Inactive' | 'Prospect';
  website?: string;
  address?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
  };
  primaryContact?: {
    id: number;
    name: string;
  };
  relationshipStrength?: number;
  connections?: number[];
}

// Define the context interface
interface OrganizationsContextType {
  organizations: Organization[];
  filteredOrganizations: Organization[];
  filter: {
    search: string;
    type: string;
    status: string;
    size: string;
  };
  setFilter: React.Dispatch<React.SetStateAction<{
    search: string;
    type: string;
    status: string;
    size: string;
  }>>;
  addOrganization: (org: Omit<Organization, 'id'>) => void;
  updateOrganization: (id: number, org: Partial<Organization>) => void;
  deleteOrganization: (id: number) => void;
  getOrganizationById: (id: number) => Organization | undefined;
  getConnectedOrganizations: (id: number) => Organization[];
}

// Create the context
const OrganizationsContext = createContext<OrganizationsContextType>({} as OrganizationsContextType);

// Create the provider component
export const OrganizationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: 1,
      name: 'General Hospital',
      type: 'Hospital',
      size: 'Large',
      industry: 'Healthcare',
      status: 'Active',
      website: 'www.generalhospital.org',
      relationshipStrength: 85,
      connections: [2, 3]
    },
    {
      id: 2,
      name: 'MediLab Research',
      type: 'Research',
      size: 'Medium',
      industry: 'Healthcare',
      status: 'Active',
      website: 'www.medilabresearch.com',
      relationshipStrength: 75,
      connections: [1, 4, 5]
    },
    {
      id: 3,
      name: 'Community Health Clinic',
      type: 'Clinic',
      size: 'Small',
      industry: 'Healthcare',
      status: 'Active',
      website: 'www.communityhealthclinic.org',
      relationshipStrength: 90,
      connections: [1, 6]
    },
    {
      id: 4,
      name: 'NorthStar Medical Supplies',
      type: 'Supplier',
      size: 'Medium',
      industry: 'Medical Equipment',
      status: 'Active',
      website: 'www.northstarmed.com',
      relationshipStrength: 65,
      connections: [2]
    },
    {
      id: 5,
      name: 'PharmaPlus',
      type: 'Pharmacy',
      size: 'Enterprise',
      industry: 'Pharmaceuticals',
      status: 'Active',
      website: 'www.pharmaplus.com',
      relationshipStrength: 70,
      connections: [2, 6]
    },
    {
      id: 6,
      name: 'Health Insurance Partners',
      type: 'Insurance',
      size: 'Large',
      industry: 'Insurance',
      status: 'Active',
      website: 'www.healthinsurancepartners.com',
      relationshipStrength: 80,
      connections: [3, 5]
    },
    {
      id: 7,
      name: 'City Medical University',
      type: 'Education',
      size: 'Large',
      industry: 'Education',
      status: 'Prospect',
      website: 'www.citymedicaluniversity.edu',
      relationshipStrength: 40,
      connections: []
    },
    {
      id: 8,
      name: 'BioResearch Labs',
      type: 'Research',
      size: 'Small',
      industry: 'Biotechnology',
      status: 'Inactive',
      website: 'www.bioresearchlabs.com',
      relationshipStrength: 25,
      connections: []
    },
    {
      id: 9,
      name: 'Global Medical Conference',
      type: 'Event',
      size: 'Small',
      industry: 'Events',
      status: 'Prospect',
      website: 'www.globalmedconf.com',
      relationshipStrength: 55,
      connections: []
    },
  ]);
  
  const [filter, setFilter] = useState({
    search: '',
    type: '',
    status: '',
    size: ''
  });
  
  // Filter organizations based on the current filter state
  const filteredOrganizations = organizations.filter(org => {
    const searchMatch = 
      !filter.search || 
      org.name.toLowerCase().includes(filter.search.toLowerCase()) ||
      (org.industry && org.industry.toLowerCase().includes(filter.search.toLowerCase()));
      
    const typeMatch = !filter.type || org.type === filter.type;
    const statusMatch = !filter.status || org.status === filter.status;
    const sizeMatch = !filter.size || org.size === filter.size;
    
    return searchMatch && typeMatch && statusMatch && sizeMatch;
  });
  
  // Add a new organization
  const addOrganization = (org: Omit<Organization, 'id'>) => {
    const newId = organizations.length > 0 
      ? Math.max(...organizations.map(o => o.id)) + 1 
      : 1;
      
    setOrganizations([...organizations, { ...org, id: newId }]);
  };
  
  // Update an organization
  const updateOrganization = (id: number, updates: Partial<Organization>) => {
    setOrganizations(organizations.map(org => 
      org.id === id ? { ...org, ...updates } : org
    ));
  };
  
  // Delete an organization
  const deleteOrganization = (id: number) => {
    setOrganizations(organizations.filter(org => org.id !== id));
  };
  
  // Get an organization by id
  const getOrganizationById = (id: number) => {
    return organizations.find(org => org.id === id);
  };
  
  // Get organizations connected to a specific organization
  const getConnectedOrganizations = (id: number) => {
    const org = organizations.find(o => o.id === id);
    
    if (!org || !org.connections) {
      return [];
    }
    
    return organizations.filter(o => org.connections?.includes(o.id));
  };
  
  const value = {
    organizations,
    filteredOrganizations,
    filter,
    setFilter,
    addOrganization,
    updateOrganization,
    deleteOrganization,
    getOrganizationById,
    getConnectedOrganizations
  };
  
  return (
    <OrganizationsContext.Provider value={value}>
      {children}
    </OrganizationsContext.Provider>
  );
};

// Custom hook for using the organizations context
export const useOrganizations = () => {
  const context = useContext(OrganizationsContext);
  
  if (!context) {
    throw new Error('useOrganizations must be used within an OrganizationsProvider');
  }
  
  return context;
};
