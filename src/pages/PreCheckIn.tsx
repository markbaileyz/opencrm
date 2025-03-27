
import React, { useState } from "react";
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
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useOfflineState } from "@/hooks/use-offline-state";
import { Badge } from "@/components/ui/badge";

const checkInSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  insuranceProvider: z.string().min(1, { message: "Insurance provider is required" }),
  policyNumber: z.string().min(1, { message: "Policy number is required" }),
  reasonForVisit: z.string().min(1, { message: "Reason for visit is required" }),
  appointmentTime: z.string().optional(),
  preferredProvider: z.string().optional(),
  existingPatient: z.boolean().default(false),
  symptoms: z.string().optional(),
  medications: z.string().optional(),
  allergies: z.string().optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type CheckInFormValues = z.infer<typeof checkInSchema>;

const PreCheckIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOnline, queueAction } = useOfflineState();
  
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

  const nextStep = () => {
    if (step === 1) {
      const { firstName, lastName, dateOfBirth, email, phone } = form.getValues();
      if (!firstName || !lastName || !dateOfBirth || !email || !phone) {
        form.trigger(["firstName", "lastName", "dateOfBirth", "email", "phone"]);
        return;
      }
    } else if (step === 2) {
      const { address, insuranceProvider, policyNumber } = form.getValues();
      if (!address || !insuranceProvider || !policyNumber) {
        form.trigger(["address", "insuranceProvider", "policyNumber"]);
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
  
  const onSubmit = (data: CheckInFormValues) => {
    setIsSubmitting(true);
    
    // Store the check-in request offline if no connection is available
    const submitAction = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "Check-in submitted successfully",
            data: { id: Date.now().toString(), ...data }
          });
        }, 1500);
      });
    };
    
    if (!isOnline) {
      // Queue the action for when we're back online
      queueAction('patient-check-in', data);
      
      toast({
        title: "Check-in saved",
        description: "Your check-in has been saved and will be submitted when your device is back online.",
        duration: 5000,
      });
      
      setIsSubmitting(false);
      navigate("/check-in-confirmation", { 
        state: { 
          isOffline: true,
          data 
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
  
  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-50">
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
          <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Patient Info</span>
            <span>Additional Details</span>
            <span>Review & Submit</span>
          </div>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {step === 1 && (
                <div className="space-y-4" data-testid="step-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="existingPatient"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I am an existing patient</FormLabel>
                          <FormDescription>
                            Check this if you have visited us before
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-4" data-testid="step-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="insuranceProvider"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Insurance Provider</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Blue Cross" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="policyNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Policy Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. ABC123456789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="reasonForVisit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Visit</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="annual-checkup">Annual Check-up</SelectItem>
                              <SelectItem value="follow-up">Follow-up Appointment</SelectItem>
                              <SelectItem value="new-symptoms">New Symptoms</SelectItem>
                              <SelectItem value="medication-refill">Medication Refill</SelectItem>
                              <SelectItem value="consultation">Consultation</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="preferredProvider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Provider (Optional)</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a provider if you have a preference" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                              <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                              <SelectItem value="dr-williams">Dr. Williams</SelectItem>
                              <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                              <SelectItem value="no-preference">No Preference</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="appointmentTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Appointment Time (Optional)</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormDescription>
                          Leave blank if you have already scheduled an appointment
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-4" data-testid="step-3">
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="symptoms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Symptoms (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Please describe any symptoms you are currently experiencing" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="medications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Medications (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="List any medications you are currently taking" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="allergies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Allergies (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="List any known allergies" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Consent to Terms</FormLabel>
                          <FormDescription>
                            I agree to share my information with the healthcare provider and consent to being contacted regarding my care.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="p-4 border rounded-md bg-gray-50">
                    <h4 className="font-medium mb-2">Summary of Information</h4>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <dt className="font-medium">Name:</dt>
                        <dd>{form.getValues("firstName")} {form.getValues("lastName")}</dd>
                      </div>
                      <div>
                        <dt className="font-medium">Date of Birth:</dt>
                        <dd>{form.getValues("dateOfBirth")}</dd>
                      </div>
                      <div>
                        <dt className="font-medium">Email:</dt>
                        <dd>{form.getValues("email")}</dd>
                      </div>
                      <div>
                        <dt className="font-medium">Phone:</dt>
                        <dd>{form.getValues("phone")}</dd>
                      </div>
                      <div>
                        <dt className="font-medium">Insurance:</dt>
                        <dd>{form.getValues("insuranceProvider")}</dd>
                      </div>
                      <div>
                        <dt className="font-medium">Reason for Visit:</dt>
                        <dd>{form.getValues("reasonForVisit")}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}
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
          
          {step < 3 ? (
            <Button onClick={nextStep} disabled={isSubmitting}>
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
