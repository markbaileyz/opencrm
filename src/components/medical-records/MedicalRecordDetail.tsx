
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck, Calendar, User, Building, Info, Download } from "lucide-react";
import { MedicalRecord } from "@/types/medicalRecord";
import { format } from "date-fns";

interface MedicalRecordDetailProps {
  record: MedicalRecord;
  onClose: () => void;
}

const MedicalRecordDetail: React.FC<MedicalRecordDetailProps> = ({ record, onClose }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case "final":
        return <Badge className="bg-green-100 text-green-800">Final</Badge>;
      case "amended":
        return <Badge className="bg-blue-100 text-blue-800">Amended</Badge>;
      default:
        return null;
    }
  };

  const getRecordTypeBadge = (type: string) => {
    switch (type) {
      case "visit":
        return <Badge variant="outline" className="border-blue-500 text-blue-700">Visit</Badge>;
      case "lab":
        return <Badge variant="outline" className="border-purple-500 text-purple-700">Lab</Badge>;
      case "imaging":
        return <Badge variant="outline" className="border-indigo-500 text-indigo-700">Imaging</Badge>;
      case "procedure":
        return <Badge variant="outline" className="border-red-500 text-red-700">Procedure</Badge>;
      case "vaccination":
        return <Badge variant="outline" className="border-green-500 text-green-700">Vaccination</Badge>;
      case "allergy":
        return <Badge variant="outline" className="border-orange-500 text-orange-700">Allergy</Badge>;
      case "diagnosis":
        return <Badge variant="outline" className="border-amber-500 text-amber-700">Diagnosis</Badge>;
      case "note":
        return <Badge variant="outline" className="border-gray-500 text-gray-700">Note</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{record.title}</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-2 mt-1">
              {getRecordTypeBadge(record.recordType)}
              {getStatusBadge(record.status)}
            </div>
          </CardDescription>
        </div>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(record.date), "MMMM d, yyyy")}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <User className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Provider</p>
                  <p className="text-sm text-muted-foreground">{record.provider}</p>
                </div>
              </div>
              {record.facility && (
                <div className="flex items-start gap-2">
                  <Building className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Facility</p>
                    <p className="text-sm text-muted-foreground">{record.facility}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(record.updatedAt), "MMMM d, yyyy")}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{record.description}</p>
            </div>
            
            {record.tags && record.tags.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {record.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="details" className="mt-4">
            <p className="text-sm text-muted-foreground">Detailed information coming soon...</p>
          </TabsContent>
          
          <TabsContent value="attachments" className="mt-4">
            {record.attachments && record.attachments.length > 0 ? (
              <div className="space-y-2">
                {record.attachments.map((attachment, index) => (
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
              <p className="text-sm text-muted-foreground">No attachments available</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordDetail;
