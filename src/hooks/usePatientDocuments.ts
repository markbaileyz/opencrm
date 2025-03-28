
import { useState, useEffect } from "react";

interface Document {
  id: string;
  name: string;
  date: string;
  category: string;
  type: string;
  size: string;
  uploadedBy: string;
  url?: string;
}

export const usePatientDocuments = (patientId: string) => {
  const [documents, setDocuments] = useState<Document[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Demo data
        const mockDocuments: Document[] = [
          {
            id: "1",
            name: "Lab Results - Blood Work.pdf",
            date: "2024-04-10",
            category: "lab",
            type: "application/pdf",
            size: "1.2 MB",
            uploadedBy: "Dr. Michael Johnson",
            url: "#"
          },
          {
            id: "2",
            name: "Chest X-Ray Results.jpg",
            date: "2024-03-28",
            category: "imaging",
            type: "image/jpeg",
            size: "3.7 MB",
            uploadedBy: "Radiology Dept",
            url: "#"
          },
          {
            id: "3",
            name: "Medical History Form.pdf",
            date: "2024-03-15",
            category: "forms",
            type: "application/pdf",
            size: "856 KB",
            uploadedBy: "Patient",
            url: "#"
          },
          {
            id: "4",
            name: "Insurance Card - Front and Back.png",
            date: "2024-02-05",
            category: "administrative",
            type: "image/png",
            size: "452 KB",
            uploadedBy: "Front Desk",
            url: "#"
          },
          {
            id: "5",
            name: "Specialist Referral Letter.pdf",
            date: "2024-01-22",
            category: "referral",
            type: "application/pdf",
            size: "524 KB",
            uploadedBy: "Dr. Sarah Thompson",
            url: "#"
          }
        ];
        
        setDocuments(mockDocuments);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching patient documents:", err);
        setError("Failed to load patient documents");
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [patientId]);

  return { documents, isLoading, error };
};
