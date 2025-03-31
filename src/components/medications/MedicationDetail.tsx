
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, Calendar, Clock, AlertTriangle, FileText, Download, X } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      mechanism?: string;
      recommendation?: string;
    }[];
    attachments?: string[];
  };
  onClose: () => void;
}

const MedicationDetail: React.FC<MedicationDetailProps> = ({ medication, onClose }) => {
  const { toast } = useToast();
  const [expandedInteraction, setExpandedInteraction] = useState<string | null>(null);
  
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
  
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "low":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const handlePrintInteractions = () => {
    toast({
      title: "Printing interactions",
      description: "The interactions report is being prepared for printing.",
    });
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
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="interactions">
              Interactions
              {medication.interactions && medication.interactions.some(i => i.severity === "high") && (
                <span className="ml-1 text-red-500">•</span>
              )}
            </TabsTrigger>
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
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    The following medications may interact with {medication.name}:
                  </p>
                  <Button size="sm" variant="outline" onClick={handlePrintInteractions}>
                    <FileText className="h-4 w-4 mr-2" />
                    Print Report
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {medication.interactions.map((interaction, index) => (
                    <Collapsible
                      key={index}
                      open={expandedInteraction === interaction.medication}
                      onOpenChange={() => {
                        if (expandedInteraction === interaction.medication) {
                          setExpandedInteraction(null);
                        } else {
                          setExpandedInteraction(interaction.medication);
                        }
                      }}
                      className="border rounded-md overflow-hidden"
                    >
                      <CollapsibleTrigger className="w-full p-3 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          {getSeverityIcon(interaction.severity)}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{interaction.medication}</p>
                              <Badge className={getSeverityColor(interaction.severity)}>
                                {interaction.severity} severity
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground text-left">{interaction.description.substring(0, 60)}...</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          {expandedInteraction === interaction.medication ? "Less" : "More"}
                        </Button>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="p-4 pt-2 border-t bg-muted/10">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Full Description</h4>
                            <p className="text-sm">{interaction.description}</p>
                          </div>
                          
                          {interaction.mechanism && (
                            <div>
                              <h4 className="text-sm font-medium mb-1">Mechanism of Interaction</h4>
                              <p className="text-sm">{interaction.mechanism}</p>
                            </div>
                          )}
                          
                          {interaction.recommendation && (
                            <div>
                              <h4 className="text-sm font-medium mb-1">Recommendations</h4>
                              <p className="text-sm">{interaction.recommendation}</p>
                            </div>
                          )}
                          
                          <div className="pt-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="sm">
                                    Contact Prescriber
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Contact prescriber about this interaction</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                  <p className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-700 dark:text-blue-300">
                      This list may not be comprehensive. Always consult with a healthcare provider.
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 bg-muted/20 rounded-md">
                <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium">No known interactions</p>
                <p className="text-sm text-muted-foreground mt-1">
                  No known interactions with other medications have been identified for this medication.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="space-y-6">
                <div className="border-l-2 border-l-blue-500 pl-4 relative">
                  <div className="absolute w-2 h-2 rounded-full bg-blue-500 left-[-5px] top-1.5"></div>
                  <p className="text-sm font-medium">Prescribed</p>
                  <p className="text-xs text-muted-foreground">April 15, 2024</p>
                  <p className="text-sm mt-1">Initial prescription by Dr. Sarah Johnson</p>
                </div>
                
                <div className="border-l-2 border-l-green-500 pl-4 relative">
                  <div className="absolute w-2 h-2 rounded-full bg-green-500 left-[-5px] top-1.5"></div>
                  <p className="text-sm font-medium">Dosage Adjusted</p>
                  <p className="text-xs text-muted-foreground">May 3, 2024</p>
                  <p className="text-sm mt-1">Dosage increased from 10mg to 20mg daily</p>
                </div>
                
                <div className="border-l-2 border-l-amber-500 pl-4 relative">
                  <div className="absolute w-2 h-2 rounded-full bg-amber-500 left-[-5px] top-1.5"></div>
                  <p className="text-sm font-medium">Refill Requested</p>
                  <p className="text-xs text-muted-foreground">May 28, 2024</p>
                  <p className="text-sm mt-1">Patient requested refill via online portal</p>
                </div>
                
                <div className="border-l-2 border-l-blue-500 pl-4 relative">
                  <div className="absolute w-2 h-2 rounded-full bg-blue-500 left-[-5px] top-1.5"></div>
                  <p className="text-sm font-medium">Refill Approved</p>
                  <p className="text-xs text-muted-foreground">May 29, 2024</p>
                  <p className="text-sm mt-1">Refill approved by Dr. Sarah Johnson</p>
                </div>
              </div>
            </ScrollArea>
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
              <div className="text-center p-6 bg-muted/20 rounded-md">
                <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium">No Documents</p>
                <p className="text-sm text-muted-foreground mt-1">
                  No attachments or documentation available for this medication.
                </p>
              </div>
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
