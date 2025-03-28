
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Video, Search, Clock, PlayCircle } from "lucide-react";
import { useVideoTutorials } from '@/hooks/useVideoTutorials';

const VideoTutorials: React.FC = () => {
  const { tutorials, categories } = useVideoTutorials();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeTab === 'all' || tutorial.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center">
            <Video className="mr-2 h-6 w-6" /> 
            Video Tutorials
          </h2>
          <p className="text-muted-foreground mt-1">
            Learn by watching comprehensive video walkthroughs
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tutorials..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 overflow-auto flex pb-1">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredTutorials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="relative">
                    <img 
                      src={tutorial.thumbnail} 
                      alt={tutorial.title} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors">
                      <PlayCircle className="h-12 w-12 text-white" />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                      <Clock className="h-3 w-3 mr-1" /> {tutorial.duration}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{new Date(tutorial.publishedAt).toLocaleDateString()}</span>
                      <Badge variant="outline">{tutorial.category}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-md bg-muted/20">
              <Video className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No tutorials found</h3>
              <p className="text-muted-foreground mt-2">
                No video tutorials match your current search. Try different keywords.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VideoTutorials;
