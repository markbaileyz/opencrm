
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: string;
  type: "Prescription" | "OTC";
  startDate?: string;
  endDate?: string;
  prescribedBy?: string;
  notes?: string;
  refills?: number;
  sideEffects?: string[];
  interactions?: {
    medication: string;
    severity: "low" | "medium" | "high";
    description: string;
  }[];
  attachments?: string[];
}

export interface MedicationHistoryItem {
  id: string;
  medication: string;
  dosage: string;
  prescribedDate: string;
  endDate: string;
  prescribedBy: string;
  reason: string;
  status: "Completed" | "Discontinued" | "Replaced";
}

export interface MedicationInteraction {
  medications: string[];
  severity: "low" | "medium" | "high";
  description: string;
  recommendation: string;
}

// Sample current medications
export const currentMedications: Medication[] = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    schedule: "Once daily",
    type: "Prescription",
    startDate: "05/10/2023",
    endDate: "05/10/2024",
    prescribedBy: "Dr. Johnson",
    notes: "Take in the morning with food",
    refills: 3,
    sideEffects: ["Dry cough", "Dizziness", "Headache"],
    interactions: [
      {
        medication: "Potassium supplements",
        severity: "high",
        description: "May increase risk of high potassium levels"
      },
      {
        medication: "Ibuprofen",
        severity: "medium",
        description: "May reduce blood pressure lowering effects"
      }
    ],
    attachments: ["Lisinopril_Prescription.pdf"]
  },
  {
    id: "2",
    name: "Metformin",
    dosage: "500mg",
    schedule: "Twice daily",
    type: "Prescription",
    startDate: "04/15/2023",
    endDate: "04/15/2024",
    prescribedBy: "Dr. Smith",
    notes: "Take with meals to minimize gastrointestinal side effects",
    refills: 5,
    sideEffects: ["Nausea", "Diarrhea", "Stomach discomfort"],
    interactions: [
      {
        medication: "Contrast dyes",
        severity: "high",
        description: "Increased risk of kidney problems"
      }
    ],
    attachments: ["Metformin_Prescription.pdf"]
  },
  {
    id: "3",
    name: "Atorvastatin",
    dosage: "20mg",
    schedule: "Once daily at bedtime",
    type: "Prescription",
    startDate: "05/05/2023",
    endDate: "05/05/2024",
    prescribedBy: "Dr. Johnson",
    notes: "Take at night for better effectiveness",
    refills: 2,
    sideEffects: ["Muscle pain", "Liver problems", "Headache"],
    interactions: [
      {
        medication: "Grapefruit juice",
        severity: "medium",
        description: "May increase risk of side effects"
      }
    ]
  },
  {
    id: "4",
    name: "Multivitamin",
    dosage: "1 tablet",
    schedule: "Once daily",
    type: "OTC",
    startDate: "01/01/2023",
    notes: "General health supplement",
    sideEffects: ["Upset stomach if taken without food"]
  }
];

// Sample medication history
export const medicationHistory: MedicationHistoryItem[] = [
  {
    id: "1",
    medication: "Amoxicillin",
    dosage: "500mg",
    prescribedDate: "01/10/2023",
    endDate: "01/24/2023",
    prescribedBy: "Dr. Jones",
    reason: "Bacterial infection",
    status: "Completed"
  },
  {
    id: "2",
    medication: "Prednisone",
    dosage: "20mg tapering",
    prescribedDate: "03/05/2023",
    endDate: "03/15/2023",
    prescribedBy: "Dr. Williams",
    reason: "Inflammation",
    status: "Completed"
  },
  {
    id: "3",
    medication: "Simvastatin",
    dosage: "10mg",
    prescribedDate: "02/15/2022",
    endDate: "04/10/2023",
    prescribedBy: "Dr. Johnson",
    reason: "Replaced with Atorvastatin for better efficacy",
    status: "Replaced"
  }
];

// Sample medication interactions
export const medicationInteractions: MedicationInteraction[] = [
  {
    medications: ["Lisinopril", "Potassium supplements"],
    severity: "high",
    description: "Combining these medications can lead to dangerously high potassium levels (hyperkalemia).",
    recommendation: "Avoid combination or monitor potassium levels closely."
  },
  {
    medications: ["Lisinopril", "Ibuprofen"],
    severity: "medium",
    description: "NSAIDs like Ibuprofen may reduce the blood pressure-lowering effects of Lisinopril.",
    recommendation: "Consider acetaminophen instead of ibuprofen when possible."
  },
  {
    medications: ["Metformin", "Contrast dyes"],
    severity: "high",
    description: "Contrast dyes used in certain imaging procedures can increase the risk of kidney problems and lactic acidosis when taking Metformin.",
    recommendation: "Temporarily stop Metformin before and after imaging procedures with contrast."
  },
  {
    medications: ["Atorvastatin", "Grapefruit juice"],
    severity: "medium",
    description: "Grapefruit juice can increase the concentration of Atorvastatin in the bloodstream, potentially increasing side effects.",
    recommendation: "Avoid consuming grapefruit or its juice while taking Atorvastatin."
  }
];
