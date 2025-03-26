
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmailHeaderProps {
  onComposeClick: () => void;
}

const EmailHeader: React.FC<EmailHeaderProps> = ({ onComposeClick }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-2">Email</h1>
        <p className="text-muted-foreground">
          Manage your email communications with contacts
        </p>
      </div>
      <Button onClick={onComposeClick} className="gap-2">
        <Plus className="h-4 w-4" />
        Compose
      </Button>
    </div>
  );
};

export default EmailHeader;
