
import React, { useState } from "react";
import InteractionCard from "./interactions/InteractionCard";
import InteractionEmpty from "./interactions/InteractionEmpty";
import InteractionHeader from "./interactions/InteractionHeader";
import InteractionDisclaimer from "./interactions/InteractionDisclaimer";

interface Interaction {
  medication: string;
  severity: "low" | "medium" | "high";
  description: string;
  mechanism?: string;
  recommendation?: string;
}

interface MedicationInteractionsProps {
  medicationName: string;
  interactions?: Interaction[];
}

const MedicationInteractions: React.FC<MedicationInteractionsProps> = ({ 
  medicationName,
  interactions 
}) => {
  const [expandedInteraction, setExpandedInteraction] = useState<string | null>(null);
  
  if (!interactions || interactions.length === 0) {
    return <InteractionEmpty />;
  }

  return (
    <div className="space-y-6">
      <InteractionHeader medicationName={medicationName} />
      
      <div className="space-y-4">
        {interactions.map((interaction, index) => (
          <InteractionCard
            key={index}
            interaction={interaction}
            isExpanded={expandedInteraction === interaction.medication}
            onToggle={() => {
              if (expandedInteraction === interaction.medication) {
                setExpandedInteraction(null);
              } else {
                setExpandedInteraction(interaction.medication);
              }
            }}
          />
        ))}
      </div>
      
      <InteractionDisclaimer />
    </div>
  );
};

export default MedicationInteractions;
