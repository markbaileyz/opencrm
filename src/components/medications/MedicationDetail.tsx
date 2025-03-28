
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, Calendar, Clock, AlertTriangle, FileText, Download } from "lucide-react";

interface MedicationDetailProps {
  medication: {
    name: string;
    dosage: string;
    schedule: string;
    type: string;
    startDate?: string;
    endDate?: string;
    prescribedBy?: string;
    notes?: string;
    refills?: number;
    sideEffects?: string[];
    interactions?: {
      medication: string;
      severity: "low" | "medium" | "high";
      description: string;
    }[];
    attachments?: string[];
  };
  onClose: () => void;
}

const MedicationDetail: React.FC<MedicationDetailProps> = ({ medication, onClose }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">{medication.name}</CardTitle>
          <CardDescription className="mt-1">
            <div className="flex items-center gap-2">
              <Badge variant={medication.type === "Prescription" ? "default" : "outline"}>
                {medication.type}
              </Badge>
              {medication.refills !== undefined && (
                <Badge variant="outline" className="border-green-500 text-green-700">
                  {medication.refills} refills remaining
                </Badge>
              )}
            </div>
          </CardDescription>
        </div>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Pill className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Dosage</p>
                  <p className="text-sm text-muted-foreground">{medication.dosage}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Schedule</p>
                  <p className="text-sm text-muted-foreground">{medication.schedule}</p>
                </div>
              </div>
              {medication.startDate && (
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">{medication.startDate}</p>
                  </div>
                </div>
              )}
              {medication.endDate && (
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">End Date</p>
                    <p className="text-sm text-muted-foreground">{medication.endDate}</p>
                  </div>
                </div>
              )}
              {medication.prescribedBy && (
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Prescribed By</p>
                    <p className="text-sm text-muted-foreground">{medication.prescribedBy}</p>
                  </div>
                </div>
              )}
            </div>
            
            {medication.notes && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Notes</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{medication.notes}</p>
              </div>
            )}
            
            {medication.sideEffects && medication.sideEffects.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Possible Side Effects</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  {medication.sideEffects.map((effect, index) => (
                    <li key={index}>{effect}</li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="interactions" className="mt-4">
            {medication.interactions && medication.interactions.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-2">
                  The following medications may interact with {medication.name}:
                </p>
                {medication.interactions.map((interaction, index) => (
                  <div key={index} className="border rounded-md p-3 flex items-start gap-3">
                    <AlertTriangle className={`h-5 w-5 ${
                      interaction.severity === "high" ? "text-red-500" : 
                      interaction.severity === "medium" ? "text-amber-500" : 
                      "text-blue-500"
                    }`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{interaction.medication}</p>
                        <Badge className={getSeverityColor(interaction.severity)}>
                          {interaction.severity} severity
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{interaction.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No known interactions with other medications.</p>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <p className="text-sm text-muted-foreground">Medication history and changes will appear here.</p>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-4">
            {medication.attachments && medication.attachments.length > 0 ? (
              <div className="space-y-2">
                {medication.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <span className="text-sm">{attachment}</span>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No attachments available for this medication.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 justify-end">
        <Button variant="outline">Refill Request</Button>
        <Button>Manage Medication</Button>
      </CardFooter>
    </Card>
  );
};

export default MedicationDetail;
