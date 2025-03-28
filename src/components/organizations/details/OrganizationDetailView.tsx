
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";

import OrganizationContacts from "./OrganizationContacts";
import OrganizationDeals from "./OrganizationDeals";
import OrganizationInteractionHistory from "./OrganizationInteractionHistory";
import OrganizationHealthIndicator from "./OrganizationHealthIndicator";
import OrganizationRelationshipMap from "../OrganizationRelationshipMap";

const OrganizationDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  // This would be a real API call in a production app
  const [organization, setOrganization] = useState({
    id: id || "1",
    name: "Regional Health Partners",
    type: "Healthcare Provider",
    industry: "Healthcare",
    employees: "1,000-5,000",
    website: "https://example.com",
    phone: "(555) 123-4567",
    address: "123 Medical Center Dr, Healthville, CA 94123",
    description: "Regional Health Partners is a leading healthcare organization that operates a network of hospitals and clinics throughout the region. They specialize in providing comprehensive medical services and innovative healthcare solutions.",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{organization.name}</h1>
          <p className="text-muted-foreground">{organization.type} • {organization.industry}</p>
        </div>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
      
      <OrganizationHealthIndicator organizationId={organization.id} />
      
      <Separator />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <h3 className="font-medium leading-none">Website</h3>
              <p className="text-sm text-muted-foreground">
                <a href={organization.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {organization.website}
                </a>
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium leading-none">Phone</h3>
              <p className="text-sm text-muted-foreground">{organization.phone}</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium leading-none">Address</h3>
              <p className="text-sm text-muted-foreground">{organization.address}</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium leading-none">Employees</h3>
              <p className="text-sm text-muted-foreground">{organization.employees}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">About</h3>
            <p className="text-sm text-muted-foreground">{organization.description}</p>
          </div>
          
          <OrganizationInteractionHistory organizationId={organization.id} />
        </TabsContent>
        
        <TabsContent value="contacts" className="mt-6">
          <OrganizationContacts organizationId={organization.id} />
        </TabsContent>
        
        <TabsContent value="deals" className="mt-6">
          <OrganizationDeals organizationId={organization.id} />
        </TabsContent>
        
        <TabsContent value="relationships" className="mt-6">
          <OrganizationRelationshipMap organizationId={organization.id} />
        </TabsContent>
        
        <TabsContent value="interactions" className="mt-6">
          <OrganizationInteractionHistory 
            organizationId={organization.id} 
            expanded={true} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationDetailView;
