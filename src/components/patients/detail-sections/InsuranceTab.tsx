
import React from "react";
import { Patient } from "@/types/patient";

interface InsuranceTabProps {
  patient: Patient;
}

const InsuranceTab: React.FC<InsuranceTabProps> = ({ patient }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="font-medium">Insurance Provider</h3>
          <p>{patient.insuranceProvider}</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Coverage Type</h3>
          <p>{patient.coverageType}</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Policy Number</h3>
          <p>{patient.policyNumber}</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Group Number</h3>
          <p>{patient.groupNumber || <span className="text-muted-foreground">N/A</span>}</p>
        </div>
      </div>
      
      {patient.insuranceHistory && patient.insuranceHistory.length > 0 && (
        <InsuranceHistorySection insuranceHistory={patient.insuranceHistory} />
      )}
    </div>
  );
};

interface InsuranceHistorySectionProps {
  insuranceHistory: Patient["insuranceHistory"];
}

const InsuranceHistorySection: React.FC<InsuranceHistorySectionProps> = ({ insuranceHistory }) => {
  if (!insuranceHistory || insuranceHistory.length === 0) return null;
  
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Insurance History</h3>
      <div className="border rounded-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium">Provider</th>
              <th className="py-2 px-4 text-left text-sm font-medium">Policy #</th>
              <th className="py-2 px-4 text-left text-sm font-medium">Coverage</th>
              <th className="py-2 px-4 text-left text-sm font-medium">Date Range</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {insuranceHistory.map((insurance, index) => (
              <tr key={index} className="bg-card">
                <td className="py-2 px-4 text-sm">{insurance.provider}</td>
                <td className="py-2 px-4 text-sm">{insurance.policyNumber}</td>
                <td className="py-2 px-4 text-sm">{insurance.coverageType}</td>
                <td className="py-2 px-4 text-sm">
                  {insurance.startDate} - {insurance.endDate || "Present"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsuranceTab;
