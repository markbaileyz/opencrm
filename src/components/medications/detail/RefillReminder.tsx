
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, AlertTriangle } from "lucide-react";

interface RefillReminderProps {
  medicationName: string;
  refills?: number;
  expiryDate?: string;
  onRefillRequest?: () => void;
}

const RefillReminder: React.FC<RefillReminderProps> = ({
  medicationName,
  refills = 0,
  expiryDate,
  onRefillRequest
}) => {
  const isRefillsLow = refills !== undefined && refills < 2;
  const isExpiringSoon = expiryDate && new Date(expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  const showWarning = isRefillsLow || isExpiringSoon;

  return (
    <Card className={`${showWarning ? 'border-yellow-200' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          Refill Information
          {showWarning && (
            <AlertTriangle className="h-5 w-5 ml-2 text-yellow-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Refills Remaining</p>
              <p className={`font-medium ${isRefillsLow ? 'text-yellow-600' : ''}`}>
                {refills !== undefined ? refills : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expires On</p>
              <p className={`font-medium ${isExpiringSoon ? 'text-yellow-600' : ''}`}>
                {expiryDate || 'N/A'}
              </p>
            </div>
          </div>

          {showWarning && (
            <div className="bg-yellow-50 p-3 rounded-md text-sm">
              {isRefillsLow && (
                <p className="text-yellow-800">
                  You have {refills} refill{refills !== 1 ? 's' : ''} remaining for {medicationName}.
                  {refills === 0 ? ' Please contact your doctor for a new prescription.' : ' Consider requesting a refill soon.'}
                </p>
              )}
              {isExpiringSoon && (
                <p className="text-yellow-800 mt-1">
                  Your prescription expires on {expiryDate}. Please schedule a follow-up with your doctor.
                </p>
              )}
            </div>
          )}

          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-center gap-2"
            onClick={onRefillRequest}
          >
            <RefreshCcw className="h-4 w-4" />
            Request Refill
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RefillReminder;
