
import React from "react";
import { Mail } from "lucide-react";

const EmailListEmpty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-3 bg-muted/30 rounded-lg border border-dashed border-muted">
      <Mail className="h-12 w-12 text-muted-foreground/50" />
      <p className="text-muted-foreground">No emails in this folder</p>
    </div>
  );
};

export default EmailListEmpty;
