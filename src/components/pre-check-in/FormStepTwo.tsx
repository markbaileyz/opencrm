
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { CheckInFormValues } from "@/types/checkIn";

interface FormStepTwoProps {
  form: UseFormReturn<CheckInFormValues>;
}

const FormStepTwo: React.FC<FormStepTwoProps> = ({ form }) => {
  return (
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
  );
};

export default FormStepTwo;
