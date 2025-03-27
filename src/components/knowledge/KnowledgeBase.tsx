
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KnowledgeHeader from "./KnowledgeHeader";
import AiAssistant from "./AiAssistant";
import FAQSection from "./FAQSection";
import GuidesSection from "./GuidesSection";
import ResourcesSection from "./ResourcesSection";
import ContactSupport from "./ContactSupport";
import { useKnowledgeBase } from "@/hooks/useKnowledgeBase";

const KnowledgeBase: React.FC = () => {
  const {
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
  } = useKnowledgeBase();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <KnowledgeHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleAiSearch={handleAiSearch}
          isFetchingAi={isFetchingAi}
        />
        
        {searchQuery && (
          <div className="text-sm text-muted-foreground text-center">
            {hasResults ? 
              `Showing results for "${searchQuery}"` : 
              `No results found for "${searchQuery}"`
            }
          </div>
        )}
        
        <AiAssistant
          showAiHelper={showAiHelper}
          setShowAiHelper={setShowAiHelper}
          searchQuery={searchQuery}
          aiResponse={aiResponse}
          isFetchingAi={isFetchingAi}
        />
        
        <Tabs defaultValue="faq" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">
              Frequently Asked Questions
            </TabsTrigger>
            <TabsTrigger value="guides">
              Guides
            </TabsTrigger>
            <TabsTrigger value="resources">
              Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="mt-6">
            <FAQSection
              filteredFAQs={filteredFAQs}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </TabsContent>
          
          <TabsContent value="guides" className="mt-6">
            <GuidesSection
              filteredGuides={filteredGuides}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </TabsContent>
          
          <TabsContent value="resources" className="mt-6">
            <ResourcesSection
              filteredResources={filteredResources}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </TabsContent>
        </Tabs>
        
        <ContactSupport />
      </div>
    </div>
  );
};

export default KnowledgeBase;
