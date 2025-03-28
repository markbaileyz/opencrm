
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Network, Building, ArrowRight, UserRound, Workflow, Handshake } from "lucide-react";

interface Organization {
  id: string;
  name: string;
  type: string;
  relationship: "partner" | "vendor" | "customer" | "competitor" | "affiliate";
  strength: "strong" | "moderate" | "weak";
}

interface OrganizationRelationshipMapProps {
  organizationId: string;
}

const OrganizationRelationshipMap = ({ organizationId }: OrganizationRelationshipMapProps) => {
  const [relatedOrgs, setRelatedOrgs] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("all");
  
  // Mock data for demonstration
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchRelatedOrgs = async () => {
      setIsLoading(true);
      try {
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockData: Organization[] = [
          { id: "1", name: "City Medical Center", type: "Hospital", relationship: "partner", strength: "strong" },
          { id: "2", name: "Health Supplies Inc.", type: "Supplier", relationship: "vendor", strength: "moderate" },
          { id: "3", name: "Metro Health Insurance", type: "Insurance", relationship: "partner", strength: "strong" },
          { id: "4", name: "Medical Research Group", type: "Research", relationship: "affiliate", strength: "weak" },
          { id: "5", name: "Competing Clinic", type: "Clinic", relationship: "competitor", strength: "moderate" },
          { id: "6", name: "Patient Transport LLC", type: "Service", relationship: "vendor", strength: "moderate" },
        ];
        
        setRelatedOrgs(mockData);
      } catch (error) {
        console.error("Error fetching related organizations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRelatedOrgs();
  }, [organizationId]);
  
  const filteredOrgs = filter === "all" 
    ? relatedOrgs 
    : relatedOrgs.filter(org => org.relationship === filter);
  
  const getRelationshipIcon = (relationship: string) => {
    switch (relationship) {
      case "partner":
        return <Handshake className="h-4 w-4" />;
      case "vendor":
        return <Building className="h-4 w-4" />;
      case "customer":
        return <UserRound className="h-4 w-4" />;
      case "competitor":
        return <ArrowRight className="h-4 w-4" />;
      case "affiliate":
        return <Workflow className="h-4 w-4" />;
      default:
        return <Network className="h-4 w-4" />;
    }
  };
  
  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case "partner":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "vendor":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "customer":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "competitor":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "affiliate":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };
  
  const getStrengthIndicator = (strength: string) => {
    switch (strength) {
      case "strong":
        return (
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </div>
        );
      case "moderate":
        return (
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
            <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
            <div className="h-2 w-2 bg-muted rounded-full"></div>
          </div>
        );
      case "weak":
        return (
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
            <div className="h-2 w-2 bg-muted rounded-full"></div>
            <div className="h-2 w-2 bg-muted rounded-full"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Organization Relationships</h3>
        <ButtonCustom variant="outline" size="sm" className="text-xs">
          <Network className="h-4 w-4 mr-2" /> Map View
        </ButtonCustom>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <ButtonCustom 
          variant={filter === "all" ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setFilter("all")}
        >
          All
        </ButtonCustom>
        <ButtonCustom 
          variant={filter === "partner" ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setFilter("partner")}
        >
          Partners
        </ButtonCustom>
        <ButtonCustom 
          variant={filter === "vendor" ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setFilter("vendor")}
        >
          Vendors
        </ButtonCustom>
        <ButtonCustom 
          variant={filter === "customer" ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setFilter("customer")}
        >
          Customers
        </ButtonCustom>
        <ButtonCustom 
          variant={filter === "competitor" ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setFilter("competitor")}
        >
          Competitors
        </ButtonCustom>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-6 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredOrgs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrgs.map((org) => (
            <Card key={org.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{org.name}</h4>
                  <Badge className={getRelationshipColor(org.relationship)}>
                    {getRelationshipIcon(org.relationship)}
                    <span className="ml-1 capitalize">{org.relationship}</span>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{org.type}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Relationship Strength</span>
                  {getStrengthIndicator(org.strength)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Network className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
          <h3 className="mt-4 text-lg font-medium">No relationships found</h3>
          <p className="text-muted-foreground">This organization doesn't have any {filter !== "all" ? filter : ""} relationships yet.</p>
        </div>
      )}
    </div>
  );
};

export default OrganizationRelationshipMap;
