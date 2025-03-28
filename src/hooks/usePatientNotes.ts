
import { useState, useEffect } from "react";

interface Note {
  id: string;
  date: string;
  author: string;
  content: string;
  type: string;
}

export const usePatientNotes = (patientId: string) => {
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Demo data
        const mockNotes: Note[] = [
          {
            id: "1",
            date: "2024-04-10",
            author: "Dr. Michael Johnson",
            content: "Patient reports feeling much better since starting new medication. Blood pressure is now well controlled at 120/80. Will continue current treatment plan and follow up in 3 months.",
            type: "Progress Note"
          },
          {
            id: "2",
            date: "2024-03-15",
            author: "Nurse Williams",
            content: "Patient came in for routine blood work. All samples collected successfully. Reminded patient about upcoming appointment with endocrinologist.",
            type: "Nursing Note"
          },
          {
            id: "3",
            date: "2024-02-18",
            author: "Dr. Sarah Thompson",
            content: "Discussed diabetes management plan with patient. A1C levels have improved to 6.5%. Patient is adhering well to medication regimen and reports consistent daily glucose monitoring. Encouraged continued dietary compliance and regular exercise.",
            type: "Consultation Note"
          },
          {
            id: "4",
            date: "2024-01-22",
            author: "Dr. Michael Johnson",
            content: "Annual physical examination completed. All vitals within normal range. Recommended pneumonia vaccine, which patient received today. Updated preventive care schedule in chart.",
            type: "Physical Exam"
          }
        ];
        
        setNotes(mockNotes);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching patient notes:", err);
        setError("Failed to load patient notes");
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [patientId]);

  const addNote = (content: string) => {
    if (!notes) return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      author: "Current User",
      content,
      type: "Progress Note"
    };
    
    setNotes([newNote, ...notes]);
  };

  return { notes, isLoading, error, addNote };
};
