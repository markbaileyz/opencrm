
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { usePreCheckIn } from "@/hooks/usePreCheckIn";
import { checkInSchema, CheckInFormValues } from "@/types/checkIn";
import FormStepOne from "@/components/pre-check-in/FormStepOne";
import FormStepTwo from "@/components/pre-check-in/FormStepTwo";
import DocumentUploadSection from "@/components/pre-check-in/DocumentUploadSection";
import FormStepFour from "@/components/pre-check-in/FormStepFour";
import CameraCapture from "@/components/pre-check-in/CameraCapture";
import CheckInProgress from "@/components/pre-check-in/CheckInProgress";

const PreCheckIn = () => {
  const navigate = useNavigate();
  const {
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
  } = usePreCheckIn();
  
  const form = useForm<CheckInFormValues>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      address: "",
      insuranceProvider: "",
      policyNumber: "",
      reasonForVisit: "",
      appointmentTime: "",
      preferredProvider: "",
      existingPatient: false,
      symptoms: "",
      medications: "",
      allergies: "",
      consent: false,
    },
  });

  const onSubmit = (data: CheckInFormValues) => {
    handleSubmit(data);
  };
  
  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-50">
      {/* Camera component */}
      <CameraCapture 
        activeCamera={activeCamera}
        videoRef={videoRef}
        canvasRef={canvasRef}
        stopCamera={stopCamera}
        capturePhoto={capturePhoto}
      />
      
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Patient Pre-Check-In</CardTitle>
            {!isOnline && (
              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300">
                Offline Mode
              </Badge>
            )}
          </div>
          <CardDescription>
            Complete this form to check in before your appointment
          </CardDescription>
          <CheckInProgress step={step} />
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {step === 1 && <FormStepOne form={form} />}
              {step === 2 && <FormStepTwo form={form} />}
              {step === 3 && (
                <DocumentUploadSection 
                  documents={documents}
                  handleFileUpload={handleFileUpload}
                  removeDocument={removeDocument}
                  startCamera={startCamera}
                />
              )}
              {step === 4 && <FormStepFour form={form} documents={documents} />}
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
              Previous
            </Button>
          ) : (
            <Button variant="outline" onClick={() => navigate('/')} disabled={isSubmitting}>
              Cancel
            </Button>
          )}
          
          {step < 4 ? (
            <Button 
              onClick={() => nextStep(form.getValues, form.trigger)} 
              disabled={isSubmitting}
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting || !form.getValues("consent")}
            >
              {isSubmitting ? "Submitting..." : "Complete Check-In"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PreCheckIn;
