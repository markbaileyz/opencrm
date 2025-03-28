
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CallRecord } from "@/types/call";
import { 
  Mic, 
  Play, 
  Pause, 
  DownloadCloud, 
  Share2, 
  Trash2,
  UploadCloud,
  X
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CallRecordingControlsProps {
  call: CallRecord;
  onUpdate: (callId: string, updates: Partial<CallRecord>) => void;
}

const CallRecordingControls: React.FC<CallRecordingControlsProps> = ({
  call,
  onUpdate
}) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [autoTranscribe, setAutoTranscribe] = useState(true);

  // Check if call has a recording
  const hasRecording = !!call.recordingUrl;

  const handlePlayPause = () => {
    if (!hasRecording) return;
    
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Simulate playback with progress updates
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 1;
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
        }
      }, 300); // Update every 300ms for simulation
      
      // Cleanup on unmount
      return () => clearInterval(interval);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
  };

  const handleUpload = () => {
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      const mockRecordingUrl = `https://storage.example.com/calls/${call.id}.mp3`;
      
      onUpdate(call.id, { 
        recordingUrl: mockRecordingUrl
      });
      
      setIsUploading(false);
      setIsDialogOpen(false);
      
      if (autoTranscribe) {
        handleTranscribe(mockRecordingUrl);
      }
      
      toast({
        title: "Recording uploaded",
        description: "Call recording has been uploaded successfully.",
      });
    }, 2000);
  };

  const handleTranscribe = (recordingUrl: string) => {
    setIsTranscribing(true);
    
    // Simulate transcription
    setTimeout(() => {
      onUpdate(call.id, {
        notes: call.notes ? 
          `${call.notes}\n\n[AUTO-TRANSCRIPTION]\nThis is a simulated transcription of the call recording. In a real implementation, this would contain the actual text from the audio file.\n\nPatient mentioned concerns about medication side effects. Dr. Johnson recommended follow-up appointment next week.` :
          `[AUTO-TRANSCRIPTION]\nThis is a simulated transcription of the call recording. In a real implementation, this would contain the actual text from the audio file.\n\nPatient mentioned concerns about medication side effects. Dr. Johnson recommended follow-up appointment next week.`
      });
      
      setIsTranscribing(false);
      
      toast({
        title: "Transcription complete",
        description: "Call has been transcribed and added to notes.",
      });
    }, 3000);
  };

  const handleDelete = () => {
    onUpdate(call.id, { recordingUrl: undefined });
    setProgress(0);
    setIsPlaying(false);
    
    toast({
      title: "Recording deleted",
      description: "Call recording has been removed.",
    });
  };

  const formatTime = (progressPercent: number) => {
    // Assuming a 5-minute call for demonstration
    const totalSeconds = 300; // 5 minutes in seconds
    const currentSeconds = Math.floor((progressPercent / 100) * totalSeconds);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Mic className="h-5 w-5 mr-2" />
          Call Recording
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasRecording ? (
          <div className="space-y-4">
            {/* Playback controls */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 flex items-center justify-center"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <div className="flex-1">
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="text-xs text-muted-foreground min-w-[40px] text-right">
                  {formatTime(progress)}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="h-1.5"
                  />
                </div>
                <div className="text-xs text-muted-foreground min-w-[25px] text-right">
                  {volume}%
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <DownloadCloud className="h-3.5 w-3.5" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Share2 className="h-3.5 w-3.5" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1.5 ml-auto text-destructive hover:bg-destructive/10"
                onClick={handleDelete}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full gap-2">
                <UploadCloud className="h-4 w-4" />
                Upload Recording
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Call Recording</DialogTitle>
                <DialogDescription>
                  Upload an audio recording for this call. Supported formats: MP3, WAV, M4A.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center bg-muted/20">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <UploadCloud className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your audio file here, or click to select a file
                    </p>
                    <Button variant="outline" size="sm">
                      Select File
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-transcribe"
                    checked={autoTranscribe}
                    onCheckedChange={setAutoTranscribe}
                  />
                  <Label htmlFor="auto-transcribe">
                    Automatically transcribe recording
                  </Label>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleUpload} 
                    disabled={isUploading}
                    className="gap-2"
                  >
                    {isUploading ? "Uploading..." : "Upload Recording"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        
        {isTranscribing && (
          <div className="mt-4 p-3 bg-muted/40 rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="animate-pulse h-2 w-2 rounded-full bg-primary"></div>
              Transcribing recording...
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CallRecordingControls;
