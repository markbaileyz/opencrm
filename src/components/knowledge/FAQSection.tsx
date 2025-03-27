
import React from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQCategory } from "@/data/knowledgeBaseData";

interface FAQSectionProps {
  filteredFAQs: FAQCategory[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  filteredFAQs,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <>
      {filteredFAQs.length > 0 ? (
        filteredFAQs.map((category, index) => (
          <div key={category.category} className={index > 0 ? "mt-8" : ""}>
            <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-2 text-muted-foreground">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No FAQ items match your search criteria.</p>
          {searchQuery && (
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default FAQSection;
