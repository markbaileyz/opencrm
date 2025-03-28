
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoTutorial } from "@/types/video-tutorial";
import { Clock, DownloadCloud, Share2, ThumbsUp, X } from "lucide-react";

interface VideoPlayerProps {
  tutorial: VideoTutorial;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ tutorial, onClose }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{tutorial.title}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>{tutorial.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {/* Video player placeholder - in a real app, this would be a real video player */}
        <div className="relative bg-black aspect-video rounded-md overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <p className="mb-2">Video player would be implemented here</p>
              <p className="text-sm opacity-70">Using an embedded player or custom implementation</p>
            </div>
          </div>
          <img 
            src={tutorial.thumbnailUrl} 
            alt={tutorial.title} 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex-col items-start">
        <div className="flex items-center gap-4 w-full mb-3">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{tutorial.duration}</span>
          </div>
          <Badge variant="outline">{tutorial.category}</Badge>
          <div className="flex-1"></div>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>Helpful</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <DownloadCloud className="h-4 w-4" />
            <span>Download</span>
          </Button>
        </div>
        <div className="flex flex-wrap gap-1">
          {tutorial.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default VideoPlayer;
