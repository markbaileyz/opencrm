
import { MedicalRecord, MedicalRecordStats } from "@/types/medicalRecord";

export const sampleMedicalRecords: MedicalRecord[] = [
  {
    id: "rec-001",
    patientId: "patient-001",
    recordType: "visit",
    title: "Annual Physical Examination",
    date: "2023-12-10T09:30:00Z",
    provider: "Dr. Sarah Johnson",
    facility: "City General Hospital",
    description: "Patient presented for annual physical examination. Vitals were within normal limits. No significant health concerns were reported. Recommended continued healthy lifestyle and exercise.",
    attachments: ["physical_exam_report.pdf"],
    status: "final",
    tags: ["annual", "preventive", "routine"],
    createdAt: "2023-12-10T11:45:00Z",
    updatedAt: "2023-12-10T11:45:00Z"
  },
  {
    id: "rec-002",
    patientId: "patient-001",
    recordType: "lab",
    title: "Complete Blood Count",
    date: "2023-12-15T14:20:00Z",
    provider: "Dr. Michael Roberts",
    facility: "MedLab Diagnostics",
    description: "CBC results show all values within normal range. No indications of anemia, infection, or other blood disorders.",
    attachments: ["cbc_results.pdf", "lab_notes.pdf"],
    status: "final",
    tags: ["blood work", "routine"],
    createdAt: "2023-12-15T16:30:00Z",
    updatedAt: "2023-12-15T16:30:00Z"
  },
  {
    id: "rec-003",
    patientId: "patient-001",
    recordType: "imaging",
    title: "Chest X-Ray",
    date: "2024-01-05T10:15:00Z",
    provider: "Dr. Emily Chen",
    facility: "City General Hospital",
    description: "Chest X-Ray performed to rule out pneumonia. No signs of infiltrates or consolidation. Heart size normal. No effusions or pneumothorax identified.",
    attachments: ["chest_xray.dcm", "radiology_report.pdf"],
    status: "final",
    tags: ["respiratory", "diagnostic"],
    createdAt: "2024-01-05T11:20:00Z",
    updatedAt: "2024-01-05T11:20:00Z"
  },
  {
    id: "rec-004",
    patientId: "patient-001",
    recordType: "procedure",
    title: "Colonoscopy",
    date: "2024-01-20T08:00:00Z",
    provider: "Dr. James Wilson",
    facility: "Gastro Specialists Center",
    description: "Routine colonoscopy performed for preventive screening. No polyps or abnormalities found. Recommended follow-up in 10 years.",
    attachments: ["colonoscopy_report.pdf", "procedure_images.zip"],
    status: "final",
    tags: ["preventive", "screening"],
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-20T10:30:00Z"
  },
  {
    id: "rec-005",
    patientId: "patient-001",
    recordType: "vaccination",
    title: "Influenza Vaccine",
    date: "2024-02-05T15:45:00Z",
    provider: "Nurse Mary Johnson",
    facility: "Community Health Clinic",
    description: "Annual influenza vaccine administered. Patient tolerated well with no adverse reactions. Batch #: FL23-456.",
    status: "final",
    tags: ["preventive", "seasonal"],
    createdAt: "2024-02-05T16:00:00Z",
    updatedAt: "2024-02-05T16:00:00Z"
  },
  {
    id: "rec-006",
    patientId: "patient-001",
    recordType: "allergy",
    title: "New Allergy: Penicillin",
    date: "2024-02-15T11:30:00Z",
    provider: "Dr. Sarah Johnson",
    facility: "City General Hospital",
    description: "Patient developed rash and mild respiratory distress after taking amoxicillin for respiratory infection. Diagnosed with penicillin allergy. Added to patient's allergy list with alert flag.",
    status: "final",
    tags: ["medication", "adverse reaction"],
    createdAt: "2024-02-15T12:45:00Z",
    updatedAt: "2024-02-15T12:45:00Z"
  },
  {
    id: "rec-007",
    patientId: "patient-001",
    recordType: "diagnosis",
    title: "Hypertension Diagnosis",
    date: "2024-03-01T09:00:00Z",
    provider: "Dr. Sarah Johnson",
    facility: "City General Hospital",
    description: "After multiple elevated BP readings (consistently >140/90), patient diagnosed with Stage 1 Hypertension. Started on lifestyle modifications. Will consider medication if no improvement in 3 months.",
    status: "final",
    tags: ["cardiovascular", "chronic"],
    createdAt: "2024-03-01T10:15:00Z",
    updatedAt: "2024-03-01T10:15:00Z"
  },
  {
    id: "rec-008",
    patientId: "patient-001",
    recordType: "note",
    title: "Follow-up Visit Notes",
    date: "2024-04-10T14:00:00Z",
    provider: "Dr. Sarah Johnson",
    facility: "City General Hospital",
    description: "Patient reports compliance with lifestyle modifications for hypertension. BP today: 135/88, improved from previous readings. Continue current plan with follow-up in 3 months.",
    status: "final",
    tags: ["follow-up", "hypertension"],
    createdAt: "2024-04-10T14:45:00Z",
    updatedAt: "2024-04-10T14:45:00Z"
  },
  {
    id: "rec-009",
    patientId: "patient-001",
    recordType: "lab",
    title: "Lipid Panel",
    date: "2024-04-15T10:30:00Z",
    provider: "Dr. Michael Roberts",
    facility: "MedLab Diagnostics",
    description: "Lipid panel shows elevated LDL cholesterol (142 mg/dL) and normal HDL, triglycerides. Consistent with borderline hyperlipidemia. Recommended dietary changes and follow-up testing in 6 months.",
    attachments: ["lipid_panel_results.pdf"],
    status: "final",
    tags: ["cardiovascular", "preventive"],
    createdAt: "2024-04-15T12:00:00Z",
    updatedAt: "2024-04-15T12:00:00Z"
  },
  {
    id: "rec-010",
    patientId: "patient-001",
    recordType: "visit",
    title: "Telehealth Consultation",
    date: "2024-05-20T15:00:00Z",
    provider: "Dr. Sarah Johnson",
    description: "Virtual follow-up for hypertension and hyperlipidemia. Patient reports adherence to diet and exercise recommendations. Reports feeling well with no new concerns.",
    status: "draft",
    tags: ["telehealth", "follow-up"],
    createdAt: "2024-05-20T15:30:00Z",
    updatedAt: "2024-05-20T15:30:00Z"
  }
];

export const getMedicalRecordStats = (): MedicalRecordStats => {
  // Count records by type
  const typeMap = new Map<string, number>();
  sampleMedicalRecords.forEach(record => {
    const currentCount = typeMap.get(record.recordType) || 0;
    typeMap.set(record.recordType, currentCount + 1);
  });
  
  const recordsByType = Array.from(typeMap.entries()).map(([type, count]) => {
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
    return { type: typeLabel, count };
  });

  // Generate recent activity data (last 6 months)
  const recentActivity = [];
  const today = new Date();
  for (let i = 5; i >= 0; i--) {
    const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthStr = month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    // Count records in this month
    const count = sampleMedicalRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === month.getMonth() && 
             recordDate.getFullYear() === month.getFullYear();
    }).length;
    
    recentActivity.push({ date: monthStr, count });
  }

  return {
    totalRecords: sampleMedicalRecords.length,
    recordsByType,
    recentActivity
  };
};
