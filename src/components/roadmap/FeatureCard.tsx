
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Feature } from "@/data/featuresList";
import { Check, Clock, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const [votes, setVotes] = useState(feature.votes || 0);
  const [userVoted, setUserVoted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleVote = (isUpvote: boolean) => {
    if (userVoted) {
      toast({
        title: "Already voted",
        description: "You've already voted on this feature",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would send the vote to a backend
    const newVotes = isUpvote ? votes + 1 : votes - 1;
    setVotes(newVotes);
    setUserVoted(true);
    
    toast({
      title: `Vote recorded: ${isUpvote ? "Upvote" : "Downvote"}`,
      description: `Thanks for your feedback on "${feature.name}"`,
    });
  };

  return (
    <Card className="transition-all hover:shadow-md hover:scale-[1.02] duration-200 animate-scale-in flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{feature.name}</CardTitle>
          {feature.implemented && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
              <Check className="h-3 w-3" />
              Implemented
            </span>
          )}
          {feature.comingSoon && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Coming Soon
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{feature.description}</p>
        
        {feature.technicalDetails && (
          <Collapsible 
            open={isOpen} 
            onOpenChange={setIsOpen} 
            className="mt-3 border-t pt-2"
          >
            <div className="flex items-center">
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-6 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  {isOpen ? (
                    <>
                      <ChevronUp className="h-3 w-3" />
                      Hide Technical Details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3" />
                      View Technical Details
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="pt-2">
              <div className="text-sm bg-muted/50 p-2 rounded-md">
                <p className="text-muted-foreground">{feature.technicalDetails}</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm font-medium">{votes} votes</div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 px-2" 
            onClick={() => handleVote(true)}
            disabled={userVoted || feature.implemented}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            Upvote
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 px-2" 
            onClick={() => handleVote(false)}
            disabled={userVoted || feature.implemented}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            Downvote
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
