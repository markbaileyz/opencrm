
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { CheckInFormValues } from "@/types/checkIn";

interface FormStepFourProps {
  form: UseFormReturn<CheckInFormValues>;
  documents: {
    insuranceCardFront: string | null;
    insuranceCardBack: string | null;
    driversLicenseFront: string | null;
    driversLicenseBack: string | null;
  };
}

const FormStepFour: React.FC<FormStepFourProps> = ({ form, documents }) => {
  return (
    <div className="space-y-4" data-testid="step-4">
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
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium mb-1">Documents Uploaded:</h5>
            <ul className="text-sm text-muted-foreground">
              {documents.insuranceCardFront && <li>Insurance Card (Front)</li>}
              {documents.insuranceCardBack && <li>Insurance Card (Back)</li>}
              {documents.driversLicenseFront && <li>Driver's License (Front)</li>}
              {documents.driversLicenseBack && <li>Driver's License (Back)</li>}
              {!documents.insuranceCardFront && !documents.insuranceCardBack && 
               !documents.driversLicenseFront && !documents.driversLicenseBack && 
               <li>No documents uploaded</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormStepFour;
