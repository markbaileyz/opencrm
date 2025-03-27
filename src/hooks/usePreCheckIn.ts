
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useOfflineState } from "@/hooks/use-offline-state";

// File size limit (5MB)
export const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const usePreCheckIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOnline, queueAction } = useOfflineState();
  
  // Document preview states
  const [documents, setDocuments] = useState({
    insuranceCardFront: null as string | null,
    insuranceCardBack: null as string | null,
    driversLicenseFront: null as string | null,
    driversLicenseBack: null as string | null
  });
  
  // Camera states
  const [activeCamera, setActiveCamera] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const nextStep = (formGetValues: Function, formTrigger: Function) => {
    if (step === 1) {
      const { firstName, lastName, dateOfBirth, email, phone } = formGetValues();
      if (!firstName || !lastName || !dateOfBirth || !email || !phone) {
        formTrigger(["firstName", "lastName", "dateOfBirth", "email", "phone"]);
        return;
      }
    } else if (step === 2) {
      const { address, insuranceProvider, policyNumber } = formGetValues();
      if (!address || !insuranceProvider || !policyNumber) {
        formTrigger(["address", "insuranceProvider", "policyNumber"]);
        return;
      }
    }
    
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  // Handle file uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, documentType: keyof typeof documents) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Validate file size
    if (file.size > FILE_SIZE_LIMIT) {
      toast({
        title: "File too large",
        description: "The file must be less than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid image file (JPEG, PNG, WEBP)",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setDocuments(prev => ({
        ...prev,
        [documentType]: dataUrl
      }));
    };
    reader.readAsDataURL(file);
  };
  
  // Camera functionality
  const startCamera = async (documentType: keyof typeof documents) => {
    setActiveCamera(documentType);
    
    if (videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing camera:", err);
        toast({
          title: "Camera Error",
          description: "Unable to access camera. Please check permissions.",
          variant: "destructive"
        });
      }
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setActiveCamera(null);
    }
  };
  
  const capturePhoto = () => {
    if (!activeCamera || !videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/jpeg');
      
      // Convert data URL to a Blob
      fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
          // Update documents state
          setDocuments(prev => ({
            ...prev,
            [activeCamera]: dataUrl
          }));
          
          // Stop camera
          stopCamera();
        });
    }
  };
  
  const removeDocument = (documentType: keyof typeof documents) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: null
    }));
  };
  
  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Store the check-in request offline if no connection is available
    const submitAction = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "Check-in submitted successfully",
            data: { 
              id: Date.now().toString(), 
              ...data,
              documentUploads: {
                insuranceCardFront: documents.insuranceCardFront,
                insuranceCardBack: documents.insuranceCardBack,
                driversLicenseFront: documents.driversLicenseFront,
                driversLicenseBack: documents.driversLicenseBack
              }
            }
          });
        }, 1500);
      });
    };
    
    if (!isOnline) {
      // Queue the action for when we're back online
      queueAction('patient-check-in', {
        ...data,
        documentUploads: documents
      });
      
      toast({
        title: "Check-in saved",
        description: "Your check-in has been saved and will be submitted when your device is back online.",
        duration: 5000,
      });
      
      setIsSubmitting(false);
      navigate("/check-in-confirmation", { 
        state: { 
          isOffline: true,
          data,
          documents
        } 
      });
      return;
    }
    
    // Process immediately if online
    submitAction().then((result: any) => {
      setIsSubmitting(false);
      
      if (result.success) {
        toast({
          title: "Check-in successful",
          description: "Your check-in information has been received. Please arrive 10 minutes before your appointment.",
          duration: 5000,
        });
        
        navigate("/check-in-confirmation", { 
          state: { 
            isOffline: false,
            data: result.data 
          } 
        });
      } else {
        toast({
          title: "Check-in failed",
          description: result.message || "There was an error processing your check-in. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      }
    });
  };

  return {
    step,
    isSubmitting,
    isOnline,
    documents,
    activeCamera,
    videoRef,
    canvasRef,
    nextStep,
    prevStep,
    handleFileUpload,
    startCamera,
    stopCamera,
    capturePhoto,
    removeDocument,
    handleSubmit
  };
};
