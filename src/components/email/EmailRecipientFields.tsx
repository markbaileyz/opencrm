
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EmailRecipientFieldsProps {
  to: string;
  cc: string;
  bcc: string;
  setTo: (value: string) => void;
  setCc: (value: string) => void;
  setBcc: (value: string) => void;
}

const EmailRecipientFields: React.FC<EmailRecipientFieldsProps> = ({
  to,
  cc,
  bcc,
  setTo,
  setCc,
  setBcc
}) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="to">To</Label>
        <Input
          id="to"
          placeholder="recipient@example.com"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cc">Cc</Label>
        <Input
          id="cc"
          placeholder="cc@example.com"
          value={cc}
          onChange={(e) => setCc(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="bcc">Bcc</Label>
        <Input
          id="bcc"
          placeholder="bcc@example.com"
          value={bcc}
          onChange={(e) => setBcc(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EmailRecipientFields;
