
import React from "react";
import { Separator } from "@/components/ui/separator";

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
      {showLabels && labels.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {labels.map(label => (
            <div key={label} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center">
              <span>{label}</span>
            </div>
          ))}
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
