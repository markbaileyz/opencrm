
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  FileText, 
  ClipboardCheck, 
  ShieldCheck,
  UserCheck,
  Clock,
  Stethoscope,
  Bookmark
} from "lucide-react";
import { healthcareBranchPatterns } from "./templateUtils";

interface BranchPatternSelectorProps {
  onUseTemplate: (templateId: string) => void;
}

const branchPatterns = [
  {
    id: "test-results-branch",
    name: "Test Results Routing",
    description: "Route patients based on test results compared to normal ranges.",
    icon: <FileText className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-700",
    pattern: "testResults",
    branchCount: healthcareBranchPatterns.testResults.branches.length
  },
  {
    id: "insurance-verification-branch",
    name: "Insurance Verification",
    description: "Route based on insurance verification status.",
    icon: <ShieldCheck className="h-5 w-5" />,
    color: "bg-green-100 text-green-700",
    pattern: "insuranceVerification",
    branchCount: healthcareBranchPatterns.insuranceVerification.branches.length
  },
  {
    id: "patient-history-branch",
    name: "Medical History Evaluation",
    description: "Evaluate patient history to determine appropriate care path.",
    icon: <ClipboardCheck className="h-5 w-5" />,
    color: "bg-amber-100 text-amber-700",
    pattern: "patientHistory",
    branchCount: healthcareBranchPatterns.patientHistory.branches.length
  },
  {
    id: "appointment-type-branch",
    name: "Appointment Type Routing",
    description: "Different workflows based on appointment type.",
    icon: <Clock className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-700",
    pattern: "appointmentType",
    branchCount: healthcareBranchPatterns.appointmentType.branches.length
  },
  {
    id: "vital-signs-branch",
    name: "Vital Signs Monitoring",
    description: "Monitor vital signs and route based on readings.",
    icon: <Activity className="h-5 w-5" />,
    color: "bg-red-100 text-red-700",
    pattern: "vitalSigns",
    branchCount: 3
  },
  {
    id: "medication-check-branch",
    name: "Medication Verification",
    description: "Verify medication history and potential interactions.",
    icon: <Stethoscope className="h-5 w-5" />,
    color: "bg-indigo-100 text-indigo-700",
    pattern: "medicationCheck",
    branchCount: 4
  }
];

const BranchPatternSelector: React.FC<BranchPatternSelectorProps> = ({ onUseTemplate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <Bookmark className="h-4 w-4 text-primary" />
          Predefined Branch Patterns
        </h3>
        <p className="text-sm text-muted-foreground">
          These branch patterns provide common decision paths for healthcare workflows. Add them to your workflow
          to quickly create condition-based routing for patients, test results, and more.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branchPatterns.map(pattern => (
          <Card key={pattern.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-full ${pattern.color}`}>
                  {pattern.icon}
                </div>
                <Badge variant="outline">{pattern.branchCount} branches</Badge>
              </div>
              <CardTitle className="text-lg mt-2">{pattern.name}</CardTitle>
              <CardDescription>{pattern.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Button 
                onClick={() => onUseTemplate(pattern.id)} 
                className="w-full"
              >
                Use Pattern
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BranchPatternSelector;
