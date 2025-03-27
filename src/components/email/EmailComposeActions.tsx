
import React from "react";
import { Button } from "@/components/ui/button";
import { Send, Save } from "lucide-react";
import ResponsiveContainer from "@/components/ui/responsive-container";

const EmailComposeActions = ({ 
  onSaveDraft, 
  onCancel, 
  onSubmit, 
  isSending, 
  isValid 
}: {
  onSaveDraft: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  isSending: boolean;
  isValid: boolean;
}) => {
  // Mobile optimized actions
  const mobileActions = (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-3 grid grid-cols-3 gap-2 z-10">
      <Button 
        variant="outline" 
        onClick={onCancel}
        className="w-full"
      >
        Cancel
      </Button>
      <Button 
        variant="outline" 
        onClick={onSaveDraft}
        className="w-full"
      >
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
      <Button 
        onClick={onSubmit}
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
        <Button variant="outline" onClick={onCancel} className="mr-2">
          Cancel
        </Button>
        <Button variant="outline" onClick={onSaveDraft}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
      </div>
      <Button 
        onClick={onSubmit}
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
