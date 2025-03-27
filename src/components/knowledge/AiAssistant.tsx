
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

interface AiAssistantProps {
  showAiHelper: boolean;
  setShowAiHelper: (show: boolean) => void;
  searchQuery: string;
  aiResponse: string;
  isFetchingAi: boolean;
}

const AiAssistant: React.FC<AiAssistantProps> = ({
  showAiHelper,
  setShowAiHelper,
  searchQuery,
  aiResponse,
  isFetchingAi,
}) => {
  if (!showAiHelper) return null;

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            AI Assistant
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowAiHelper(false)}
            className="h-8 w-8 p-0"
          >
            ✕
          </Button>
        </div>
        <CardDescription>
          Answering your question: "{searchQuery}"
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isFetchingAi ? (
          <div className="flex items-center justify-center h-20">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 h-10 w-10"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 text-muted-foreground">
            {aiResponse}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiAssistant;
