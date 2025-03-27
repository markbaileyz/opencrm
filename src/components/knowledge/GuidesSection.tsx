
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { Guide } from "@/data/knowledgeBaseData";

interface GuidesSectionProps {
  filteredGuides: Guide[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const GuidesSection: React.FC<GuidesSectionProps> = ({
  filteredGuides,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <>
      {filteredGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{guide.steps} steps</Badge>
                    <span className="text-sm text-muted-foreground">{guide.estimatedTime}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View Guide <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No guides match your search criteria.</p>
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

export default GuidesSection;
