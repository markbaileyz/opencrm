
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useOfflineState } from "@/hooks/use-offline-state";
import { knowledgeBaseData, FAQCategory, Guide, Resource } from "@/data/knowledgeBaseData";

export const useKnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("faq");
  const [showAiHelper, setShowAiHelper] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isFetchingAi, setIsFetchingAi] = useState(false);
  
  const { user } = useAuth();
  const { isOnline, storeOfflineData } = useOfflineState();
  
  const userRole = user?.role || "guest";
  
  // Save data for offline use
  useEffect(() => {
    if (isOnline) {
      storeOfflineData('knowledgeBaseData', knowledgeBaseData);
    }
  }, [isOnline, storeOfflineData]);

  // Filter content based on user role
  const roleFilteredFAQs = useMemo(() => 
    knowledgeBaseData.faq.filter(
      category => category.visibleTo.includes(userRole)
    ), [userRole]
  );
  
  const roleFilteredGuides = useMemo(() => 
    knowledgeBaseData.guides.filter(
      guide => guide.visibleTo.includes(userRole)
    ), [userRole]
  );
  
  const roleFilteredResources = useMemo(() => 
    knowledgeBaseData.resources.filter(
      resource => resource.visibleTo.includes(userRole)
    ), [userRole]
  );
  
  // Filter based on search query
  const filteredFAQs = useMemo(() => 
    roleFilteredFAQs.map(category => ({
      ...category,
      questions: category.questions.filter(
        q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
             q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.questions.length > 0), 
    [roleFilteredFAQs, searchQuery]
  );
  
  const filteredGuides = useMemo(() => 
    roleFilteredGuides.filter(
      guide => guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
               guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    ), [roleFilteredGuides, searchQuery]
  );
  
  const filteredResources = useMemo(() => 
    roleFilteredResources.filter(
      resource => resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    ), [roleFilteredResources, searchQuery]
  );
  
  // Check if any results match the search query
  const hasResults = useMemo(() => 
    filteredFAQs.length > 0 || 
    filteredGuides.length > 0 || 
    filteredResources.length > 0, 
    [filteredFAQs, filteredGuides, filteredResources]
  );

  // Handle AI assistant search
  const handleAiSearch = () => {
    if (!searchQuery.trim()) return;
    
    setShowAiHelper(true);
    setIsFetchingAi(true);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      // Generate a contextual response based on the search query
      const lowerQuery = searchQuery.toLowerCase();
      let response = "I couldn't find a specific answer to your question. Please try refining your search or browse the categories for related information.";
      
      // Simple pattern matching for demo purposes
      if (lowerQuery.includes("appointment") || lowerQuery.includes("schedule")) {
        response = "To schedule an appointment, use the 'Schedule' button on the Front Desk page or Calendar page. You can select the provider, date, time, and appointment type. For existing patients, you can quickly find them in the system. New patients will need to provide their information first.";
      } else if (lowerQuery.includes("patient") && lowerQuery.includes("record")) {
        response = "Patient records can be accessed from the Patients section. You can search by name or ID, then click on a patient card to view their complete profile including medical history, appointments, and insurance information.";
      } else if (lowerQuery.includes("insurance") || lowerQuery.includes("coverage")) {
        response = "For insurance information, check the patient's profile under the 'Insurance' tab. You can verify coverage, update policy details, and run eligibility checks through our integrated verification system.";
      }
      
      setAiResponse(response);
      setIsFetchingAi(false);
    }, 1500);
  };

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    showAiHelper,
    setShowAiHelper,
    aiResponse,
    isFetchingAi,
    userRole,
    filteredFAQs,
    filteredGuides,
    filteredResources,
    hasResults,
    handleAiSearch
  };
};
