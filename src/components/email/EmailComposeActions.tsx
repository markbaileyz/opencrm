
import React from "react";
import { Button } from "@/components/ui/button";
import { Send, Save } from "lucide-react";
import ResponsiveContainer from "@/components/ui/responsive-container";

interface EmailComposeActionsProps {
  onSaveDraft: () => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSending: boolean;
  isValid: boolean;
}

const EmailComposeActions: React.FC<EmailComposeActionsProps> = ({
  onSaveDraft,
  onCancel,
  onSubmit,
  isSending,
  isValid
}) => {
  // Mobile optimized actions
  const MobileActions = () => (
    <div className="flex w-full items-center justify-between gap-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className="flex-1"
      >
        Cancel
      </Button>
      
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onSaveDraft}
          className="w-10 h-10 p-0"
        >
          <Save className="h-4 w-4" />
        </Button>
        
        <Button 
          type="submit" 
          disabled={isSending || !isValid}
          onClick={onSubmit}
          className="w-10 h-10 p-0"
        >
          {isSending ? "..." : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
  
  // Desktop actions
  const DesktopActions = () => (
    <div className="flex items-center gap-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onSaveDraft}
        className="gap-1"
      >
        <Save className="h-4 w-4" />
        Save Draft
      </Button>
      
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      
      <Button 
        type="submit" 
        disabled={isSending || !isValid}
        className="gap-1"
        onClick={onSubmit}
      >
        {isSending ? "Sending..." : (
          <>
            <Send className="h-4 w-4" />
            Send
          </>
        )}
      </Button>
    </div>
  );

  return (
    <ResponsiveContainer
      mobileView={<MobileActions />}
      desktopView={<DesktopActions />}
    />
  );
};

export default EmailComposeActions;
