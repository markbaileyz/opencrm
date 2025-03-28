
import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoTutorial } from "@/types/video-tutorial";
import { Clock, DownloadCloud, Share2, ThumbsUp, X, Volume2, VolumeX, Pause, Play } from "lucide-react";

interface VideoPlayerProps {
  tutorial: VideoTutorial;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ tutorial, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setProgress(100);
  };

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
        <div className="relative bg-black aspect-video rounded-md overflow-hidden">
          <video
            ref={videoRef}
            poster={tutorial.thumbnailUrl}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
          >
            <source src={tutorial.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video controls overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={togglePlay} className="h-8 w-8 text-white hover:text-white hover:bg-white/20">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <div className="relative flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-primary" 
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8 text-white hover:text-white hover:bg-white/20">
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Play button overlay (shown when video is paused) */}
          {!isPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={togglePlay}
            >
              <div className="bg-black/40 p-5 rounded-full hover:bg-black/60 transition-colors">
                <Play className="h-8 w-8 text-white" />
              </div>
            </div>
          )}
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
