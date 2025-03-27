
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import DealStageProgress from "./DealStageProgress";
import DealTimeline from "./DealTimeline";
import { Building, Mail, Phone, Calendar, User, Clock, DollarSign } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  position: string;
}

interface Organization {
  id: string;
  name: string;
  industry?: string;
}

interface DealDetailPanelProps {
  deal: {
    id: string;
    name: string;
    stage: string;
    stageIndex: number;
    totalStages: number;
    value: number;
    probability: number;
    closeDate: Date;
    createdDate: Date;
    daysSinceStageChange: number;
    avgDaysInStage: number;
    isStuck?: boolean;
    description?: string;
    tags?: string[];
    organization?: Organization;
    contacts?: Contact[];
  };
  timeline: Array<{
    id: string;
    type: "stage-change" | "note" | "meeting" | "email" | "task" | "contact";
    title: string;
    date: Date;
    user: string;
    description?: string;
    completed?: boolean;
  }>;
  onAddActivity?: () => void;
}

const DealDetailPanel: React.FC<DealDetailPanelProps> = ({
  deal,
  timeline,
  onAddActivity
}) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{deal.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              {deal.organization && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{deal.organization.name}</span>
                </div>
              )}
              <Badge variant="outline" className="font-normal">
                {deal.stage}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">{formatCurrency(deal.value)}</div>
            <div className="text-sm text-muted-foreground">{deal.probability}% probability</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <div className="space-y-6">
              <DealStageProgress
                currentStage={deal.stage}
                totalStages={deal.totalStages}
                currentStageIndex={deal.stageIndex}
                timeInStage={deal.daysSinceStageChange}
                averageTimeInStage={deal.avgDaysInStage}
                isStuck={deal.isStuck}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Close Date</span>
                  </div>
                  <p className="font-medium">{deal.closeDate.toLocaleDateString()}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Created</span>
                  </div>
                  <p className="font-medium">{deal.createdDate.toLocaleDateString()}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>Value</span>
                  </div>
                  <p className="font-medium">{formatCurrency(deal.value)}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Building className="h-4 w-4 mr-2" />
                    <span>Organization</span>
                  </div>
                  <p className="font-medium">{deal.organization?.name || "N/A"}</p>
                </div>
              </div>
              
              {deal.description && (
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {deal.description}
                  </p>
                </div>
              )}
              
              {deal.tags && deal.tags.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {deal.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <DealTimeline timeline={timeline} onAddActivity={onAddActivity} />
          </TabsContent>
          
          <TabsContent value="contacts">
            <div className="space-y-4">
              {deal.contacts && deal.contacts.length > 0 ? (
                deal.contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3 p-3 border rounded-md">
                    <Avatar>
                      <div className="bg-primary text-white h-full w-full flex items-center justify-center font-medium">
                        {contact.name.charAt(0)}
                      </div>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.position}</div>
                      <div className="flex gap-4 mt-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Mail className="h-3 w-3 mr-1" />
                          <span>{contact.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No contacts associated with this deal</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DealDetailPanel;
