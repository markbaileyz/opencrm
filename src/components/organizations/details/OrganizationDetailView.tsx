
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users, BarChart, Clock, MapPin, Globe, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OrganizationHealthIndicator from "./OrganizationHealthIndicator";
import OrganizationInteractionHistory from "./OrganizationInteractionHistory";
import OrganizationContacts from "./OrganizationContacts";
import OrganizationDeals from "./OrganizationDeals";

interface Organization {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  phone: string;
  email: string;
  status: "active" | "inactive" | "lead" | "prospect";
  type: "customer" | "partner" | "vendor" | "competitor";
  lastInteraction?: string;
  totalRevenue?: number;
  contactCount?: number;
  dealCount?: number;
  createdAt: string;
}

interface OrganizationDetailViewProps {
  organization: Organization;
}

const OrganizationDetailView: React.FC<OrganizationDetailViewProps> = ({ organization }) => {
  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "lead": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "prospect": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Type badge color
  const getTypeColor = (type: string) => {
    switch (type) {
      case "customer": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "partner": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
      case "vendor": return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300";
      case "competitor": return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">{organization.name}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(organization.status)}>
                  {organization.status.charAt(0).toUpperCase() + organization.status.slice(1)}
                </Badge>
                <Badge className={getTypeColor(organization.type)}>
                  {organization.type.charAt(0).toUpperCase() + organization.type.slice(1)}
                </Badge>
                <Badge variant="outline" className="bg-background">
                  {organization.industry}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button size="sm">Contact</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Size:</span>
                <span>{organization.size}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Location:</span>
                <span>{organization.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Created:</span>
                <span>{new Date(organization.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Website:</span>
                <a href={organization.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{organization.website}</a>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Phone:</span>
                <span>{organization.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Email:</span>
                <a href={`mailto:${organization.email}`} className="text-primary hover:underline">{organization.email}</a>
              </div>
            </div>
          </div>

          <OrganizationHealthIndicator organizationId={organization.id} />

          <Tabs defaultValue="interactions" className="mt-6">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="interactions" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Interactions</span>
              </TabsTrigger>
              <TabsTrigger value="contacts" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Contacts</span>
              </TabsTrigger>
              <TabsTrigger value="deals" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>Deals</span>
              </TabsTrigger>
              <TabsTrigger value="relationship" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>Relationships</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="interactions">
              <OrganizationInteractionHistory organizationId={organization.id} />
            </TabsContent>
            
            <TabsContent value="contacts">
              <OrganizationContacts organizationId={organization.id} />
            </TabsContent>
            
            <TabsContent value="deals">
              <OrganizationDeals organizationId={organization.id} />
            </TabsContent>
            
            <TabsContent value="relationship">
              <div className="p-4 bg-muted/30 rounded-md text-center">
                <p className="text-muted-foreground">Relationship mapping is coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationDetailView;
