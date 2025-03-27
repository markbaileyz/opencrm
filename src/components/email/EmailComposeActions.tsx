
import React from "react";
import { Button } from "@/components/ui/button";
import { Send, Save } from "lucide-react";

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
  return (
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
};

export default EmailComposeActions;
