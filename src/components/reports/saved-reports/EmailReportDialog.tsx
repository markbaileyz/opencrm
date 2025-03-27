
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SavedReport } from "./types";
import { Mail, Calendar, Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmailReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: SavedReport | null;
  onEmailReport: (reportId: string, email: string) => void;
  onScheduleReport: (reportId: string, email: string, frequency: string) => void;
}

const EmailReportDialog: React.FC<EmailReportDialogProps> = ({
  open,
  onOpenChange,
  report,
  onEmailReport,
  onScheduleReport,
}) => {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [activeTab, setActiveTab] = useState("send");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!report) return;
    
    if (activeTab === "send") {
      onEmailReport(report.id, email);
    } else {
      onScheduleReport(report.id, email, frequency);
    }
    
    onOpenChange(false);
  };

  if (!report) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Report</DialogTitle>
          <DialogDescription>
            Send or schedule "{report.name}" report via email
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="send" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="send" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              <span>Send Now</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="send" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Recipient Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Email Preview</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-1"><strong>Subject:</strong> {report.name} - Report from OpenCRM</p>
                  <p className="mb-1"><strong>From:</strong> reports@opencrm.app</p>
                  <p className="mb-1"><strong>To:</strong> {email || "recipient@example.com"}</p>
                  <div className="mt-2 p-2 border rounded bg-card">
                    <p>Hi there,</p>
                    <p className="my-2">Please find attached the latest "{report.name}" report.</p>
                    <p className="mt-2">Best regards,</p>
                    <p>The OpenCRM Team</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schedule-email">Recipient Email</Label>
                <Input
                  id="schedule-email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Schedule Preview</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>
                    This report will be sent <strong>{frequency}</strong> to{" "}
                    <strong>{email || "recipient@example.com"}</strong>
                  </p>
                  <p className="mt-2">
                    The first report will be sent immediately, and subsequent reports
                    will follow the {frequency} schedule.
                  </p>
                </div>
              </div>
            </TabsContent>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {activeTab === "send" ? "Send Report" : "Schedule Report"}
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmailReportDialog;
