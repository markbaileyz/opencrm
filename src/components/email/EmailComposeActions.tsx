
import React from "react";
import { Button } from "@/components/ui/button";
import { Send, Save } from "lucide-react";
import ResponsiveContainer from "@/components/ui/responsive-container";

interface EmailComposeActionsProps {
  onSend: () => void;
  onDraft: () => void;
  onDiscard: () => void;
  isSending: boolean;
  isValid: boolean;
}

const EmailComposeActions: React.FC<EmailComposeActionsProps> = ({ 
  onSend, 
  onDraft, 
  onDiscard, 
  isSending, 
  isValid 
}) => {
  // Mobile optimized actions
  const mobileActions = (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-3 grid grid-cols-3 gap-2 z-10">
      <Button 
        variant="outline" 
        onClick={onDiscard}
        className="w-full"
      >
        Cancel
      </Button>
      <Button 
        variant="outline" 
        onClick={onDraft}
        className="w-full"
      >
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
      <Button 
        onClick={onSend}
        disabled={isSending || !isValid}
        className="w-full"
      >
        {isSending ? (
          "Sending..."
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Send
          </>
        )}
      </Button>
    </div>
  );

  // Desktop optimized actions
  const desktopActions = (
    <div className="flex items-center justify-between pt-4 border-t mt-4">
      <div>
        <Button variant="outline" onClick={onDiscard} className="mr-2">
          Cancel
        </Button>
        <Button variant="outline" onClick={onDraft}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
      </div>
      <Button 
        onClick={onSend}
        disabled={isSending || !isValid}
      >
        {isSending ? (
          "Sending..."
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Send Email
          </>
        )}
      </Button>
    </div>
  );

  return (
    <ResponsiveContainer
      mobileView={mobileActions}
      desktopView={desktopActions}
      children={<></>} // Empty child as placeholder
    />
  );
};

export default EmailComposeActions;
