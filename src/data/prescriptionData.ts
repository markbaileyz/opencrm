
export interface Prescription {
  id: number;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface PrescriptionHistory {
  id: number;
  patientName: string;
  medication: string;
  prescriber: string;
  datePrescribed: string;
  endDate: string;
  status: string;
}

export interface PrescriptionTemplate {
  id: number;
  name: string;
  category: string;
  defaultDosage: string;
  defaultDuration: string;
  commonUsage: string;
}

export const prescriptionsData: Prescription[] = [
  {
    id: 1,
    patientName: "John Doe",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: "05/10/2023",
    endDate: "05/10/2024",
    status: "Active"
  },
  {
    id: 2,
    patientName: "Emma Wilson",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    startDate: "04/15/2023",
    endDate: "04/15/2024",
    status: "Active"
  },
  {
    id: 3,
    patientName: "Sophia Davis",
    medication: "Levothyroxine",
    dosage: "75mcg",
    frequency: "Once daily",
    startDate: "06/22/2023",
    endDate: "06/22/2024",
    status: "Active"
  },
  {
    id: 4,
    patientName: "Michael Brown",
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    startDate: "05/05/2023",
    endDate: "05/15/2023",
    status: "Expiring Soon"
  },
  {
    id: 5,
    patientName: "James Wilson",
    medication: "Amlodipine",
    dosage: "5mg",
    frequency: "Once daily",
    startDate: "03/10/2023",
    endDate: "03/10/2024",
    status: "Active"
  }
];

export const prescriptionHistoryData: PrescriptionHistory[] = [
  {
    id: 1,
    patientName: "Sophia Davis",
    medication: "Amoxicillin",
    prescriber: "Dr. Smith",
    datePrescribed: "02/15/2023",
    endDate: "02/28/2023",
    status: "Completed"
  },
  {
    id: 2,
    patientName: "John Doe",
    medication: "Ibuprofen",
    prescriber: "Dr. Jones",
    datePrescribed: "01/10/2023",
    endDate: "01/24/2023",
    status: "Completed"
  },
  {
    id: 3,
    patientName: "Emma Wilson",
    medication: "Prednisone",
    prescriber: "Dr. Williams",
    datePrescribed: "03/05/2023",
    endDate: "03/15/2023",
    status: "Discontinued"
  },
  {
    id: 4,
    patientName: "Michael Brown",
    medication: "Ciprofloxacin",
    prescriber: "Dr. Johnson",
    datePrescribed: "04/12/2023",
    endDate: "04/22/2023",
    status: "Completed"
  },
  {
    id: 5,
    patientName: "James Wilson",
    medication: "Fluoxetine",
    prescriber: "Dr. Miller",
    datePrescribed: "12/05/2022",
    endDate: "03/05/2023",
    status: "Completed"
  }
];

export const prescriptionTemplates: PrescriptionTemplate[] = [
  {
    id: 1,
    name: "Standard Antibiotic",
    category: "Antibiotic",
    defaultDosage: "500mg",
    defaultDuration: "7-10 days",
    commonUsage: "Bacterial infections"
  },
  {
    id: 2,
    name: "Blood Pressure Control",
    category: "Antihypertensive",
    defaultDosage: "10mg",
    defaultDuration: "30 days with refills",
    commonUsage: "Hypertension"
  },
  {
    id: 3,
    name: "Pain Management",
    category: "Analgesic",
    defaultDosage: "500-1000mg every 6 hours",
    defaultDuration: "As needed, 7 days",
    commonUsage: "Mild to moderate pain"
  },
  {
    id: 4,
    name: "Diabetes Control",
    category: "Antidiabetic",
    defaultDosage: "500mg twice daily",
    defaultDuration: "30 days with refills",
    commonUsage: "Type 2 diabetes"
  },
  {
    id: 5,
    name: "Allergy Relief",
    category: "Antihistamine",
    defaultDosage: "10mg once daily",
    defaultDuration: "30 days seasonal",
    commonUsage: "Seasonal allergies"
  },
  {
    id: 6,
    name: "Thyroid Replacement",
    category: "Hormone Replacement",
    defaultDosage: "50-100mcg daily",
    defaultDuration: "30 days with refills",
    commonUsage: "Hypothyroidism"
  }
];
