
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Report {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  lastRun?: string;
  schedule?: {
    frequency: "daily" | "weekly" | "monthly";
    nextRun: string;
  };
  isFavorite: boolean;
}

interface EmailReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: Report | null;
  onEmailReport: (id: number, email: string, message: string) => void;
  onScheduleReport: (id: number, frequency: "daily" | "weekly" | "monthly") => void;
}

const EmailReportDialog: React.FC<EmailReportDialogProps> = ({
  open,
  onOpenChange,
  report,
  onEmailReport,
  onScheduleReport
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);
  
  const handleSend = () => {
    if (report) {
      onEmailReport(report.id, email, message);
      resetForm();
    }
  };
  
  const resetForm = () => {
    setEmail("");
    setMessage("");
    setShowSchedule(false);
  };
  
  const handleSchedule = (frequency: "daily" | "weekly" | "monthly") => {
    if (report) {
      onScheduleReport(report.id, frequency);
      resetForm();
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={(value) => { 
      onOpenChange(value); 
      if (!value) resetForm();
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {showSchedule ? 'Schedule Report' : 'Email Report'}
          </DialogTitle>
          <DialogDescription>
            {showSchedule 
              ? 'Set up a schedule to automatically generate this report'
              : `Send the "${report?.name}" report via email`
            }
          </DialogDescription>
        </DialogHeader>
        
        {showSchedule ? (
          <div className="grid gap-4 py-4">
            <Button variant="outline" onClick={() => handleSchedule("daily")}>Daily</Button>
            <Button variant="outline" onClick={() => handleSchedule("weekly")}>Weekly</Button>
            <Button variant="outline" onClick={() => handleSchedule("monthly")}>Monthly</Button>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                To
              </Label>
              <Input
                id="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
        )}
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
          <Button 
            variant="link" 
            onClick={() => setShowSchedule(!showSchedule)}
            className="sm:mb-0 mb-2"
          >
            {showSchedule ? 'Back to Email' : 'Schedule Instead'}
          </Button>
          
          {!showSchedule && (
            <Button type="submit" onClick={handleSend}>
              Send Report
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailReportDialog;
