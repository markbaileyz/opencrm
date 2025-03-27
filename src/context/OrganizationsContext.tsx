
import React, { createContext, useContext, useState, useEffect } from "react";
import { Organization, OrganizationFilters } from "@/types/organization";
import { sampleOrganizations } from "@/data/sampleOrganizations";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface OrganizationsContextType {
  organizations: Organization[];
  filteredOrganizations: Organization[];
  filters: OrganizationFilters;
  loading: boolean;
  error: string | null;
  setFilters: (filters: OrganizationFilters) => void;
  addOrganization: (organization: Omit<Organization, "id" | "createdAt" | "updatedAt">) => void;
  updateOrganization: (organization: Organization) => void;
  deleteOrganization: (id: string) => void;
}

const OrganizationsContext = createContext<OrganizationsContextType | undefined>(undefined);

export const useOrganizations = () => {
  const context = useContext(OrganizationsContext);
  if (!context) {
    throw new Error("useOrganizations must be used within an OrganizationsProvider");
  }
  return context;
};

export const OrganizationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>([]);
  const [filters, setFilters] = useState<OrganizationFilters>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load sample organizations
  useEffect(() => {
    try {
      setOrganizations(sampleOrganizations);
      setLoading(false);
    } catch (err) {
      setError("Failed to load organizations");
      setLoading(false);
    }
  }, []);

  // Apply filters whenever organizations or filters change
  useEffect(() => {
    let result = [...organizations];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter((org) => 
        org.name.toLowerCase().includes(searchTerm) || 
        org.email.toLowerCase().includes(searchTerm) ||
        (org.contactPersonName && org.contactPersonName.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.type) {
      result = result.filter((org) => org.type === filters.type);
    }
    
    if (filters.status) {
      result = result.filter((org) => org.status === filters.status);
    }
    
    if (filters.size) {
      result = result.filter((org) => org.size === filters.size);
    }
    
    setFilteredOrganizations(result);
  }, [organizations, filters]);

  // Add a new organization
  const addOrganization = (orgData: Omit<Organization, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newOrganization: Organization = {
      ...orgData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    
    setOrganizations((prev) => [...prev, newOrganization]);
    toast({
      title: "Organization added",
      description: `${newOrganization.name} has been added successfully.`,
    });
  };

  // Update an existing organization
  const updateOrganization = (updatedOrg: Organization) => {
    setOrganizations((prev) => 
      prev.map((org) => 
        org.id === updatedOrg.id 
          ? { ...updatedOrg, updatedAt: new Date().toISOString() } 
          : org
      )
    );
    toast({
      title: "Organization updated",
      description: `${updatedOrg.name} has been updated successfully.`,
    });
  };

  // Delete an organization
  const deleteOrganization = (id: string) => {
    const orgToDelete = organizations.find((org) => org.id === id);
    if (orgToDelete) {
      setOrganizations((prev) => prev.filter((org) => org.id !== id));
      toast({
        title: "Organization deleted",
        description: `${orgToDelete.name} has been deleted.`,
        variant: "destructive",
      });
    }
  };

  const value = {
    organizations,
    filteredOrganizations,
    filters,
    loading,
    error,
    setFilters,
    addOrganization,
    updateOrganization,
    deleteOrganization,
  };

  return (
    <OrganizationsContext.Provider value={value}>
      {children}
    </OrganizationsContext.Provider>
  );
};
