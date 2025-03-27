
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { Resource } from "@/data/knowledgeBaseData";

interface ResourcesSectionProps {
  filteredResources: Resource[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  filteredResources,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <>
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{resource.count} {resource.count === 1 ? 'item' : 'items'}</Badge>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Access <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No resources match your search criteria.</p>
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

export default ResourcesSection;
