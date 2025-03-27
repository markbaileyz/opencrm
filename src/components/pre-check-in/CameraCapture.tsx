
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { X, Camera } from "lucide-react";

interface CameraCaptureProps {
  activeCamera: string | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  stopCamera: () => void;
  capturePhoto: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  activeCamera,
  videoRef,
  canvasRef,
  stopCamera,
  capturePhoto
}) => {
  if (!activeCamera) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col justify-center items-center p-4">
      <div className="bg-background rounded-lg w-full max-w-md overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="font-semibold">Take Photo</h3>
          <Button variant="ghost" size="sm" onClick={stopCamera}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-auto" 
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        <div className="p-4 flex justify-between">
          <Button variant="outline" onClick={stopCamera}>Cancel</Button>
          <Button onClick={capturePhoto}>
            <Camera className="mr-2 h-4 w-4" />
            Capture
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
