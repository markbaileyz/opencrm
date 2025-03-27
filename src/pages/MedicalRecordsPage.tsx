
import React from "react";
import { ArrowLeft, FileText, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const MedicalRecordsPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleBack} size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Medical Records</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-1" />
              Advanced Search
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Record
            </Button>
          </div>
        </div>

        <div className="relative">
          <Input 
            placeholder="Search medical records..." 
            className="max-w-md"
            prefixIcon={<Search className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="recent">Recent Records</TabsTrigger>
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="shared">Shared With Me</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <RecordCard 
                  key={item}
                  title={`Medical Examination ${item}`}
                  date={new Date(2024, 3, item * 5).toLocaleDateString()}
                  type="Examination"
                  doctor="Dr. Smith"
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <RecordCard 
                  key={item}
                  title={`Medical Record ${item}`}
                  date={new Date(2024, item % 3, item * 3).toLocaleDateString()}
                  type={item % 2 === 0 ? "Lab Results" : "Examination"}
                  doctor={item % 3 === 0 ? "Dr. Johnson" : "Dr. Williams"}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="shared" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <RecordCard 
                title="Referral Letter"
                date="04/10/2024"
                type="Referral"
                doctor="Dr. Adams"
              />
              <RecordCard 
                title="Specialist Consultation"
                date="03/28/2024"
                type="Consultation"
                doctor="Dr. Chen"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface RecordCardProps {
  title: string;
  date: string;
  type: string;
  doctor: string;
}

const RecordCard: React.FC<RecordCardProps> = ({ title, date, type, doctor }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>Added on {date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span>{type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Doctor:</span>
            <span>{doctor}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default MedicalRecordsPage;
