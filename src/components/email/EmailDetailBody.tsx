
import React from "react";
import { Separator } from "@/components/ui/separator";
import EmailLabels from "./EmailLabels";

interface EmailDetailBodyProps {
  body: string;
  labels: string[];
  allLabels: string[];
  onAddLabel: (label: string) => void;
  onRemoveLabel: (label: string) => void;
  showLabels: boolean;
}

const EmailDetailBody: React.FC<EmailDetailBodyProps> = ({
  body,
  labels,
  allLabels,
  onAddLabel,
  onRemoveLabel,
  showLabels
}) => {
  return (
    <>
      {showLabels && (
        <div className="mb-4">
          <EmailLabels 
            labels={labels}
            allLabels={allLabels}
            onAddLabel={onAddLabel}
            onRemoveLabel={onRemoveLabel}
          />
        </div>
      )}

      <Separator className="my-4" />
      
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </>
  );
};

export default EmailDetailBody;
