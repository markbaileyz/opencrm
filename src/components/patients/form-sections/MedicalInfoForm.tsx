
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { PatientFormValues } from "../PatientFormTypes";

interface MedicalInfoFormProps {
  form: UseFormReturn<PatientFormValues>;
}

const MedicalInfoForm: React.FC<MedicalInfoFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="primaryCarePhysician"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Care Physician</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="medicalConditions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Medical Conditions (comma separated)</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value?.join(", ") || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value.split(",").map(item => item.trim()).filter(Boolean)
                  );
                }}
              />
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
            <FormLabel>Allergies (comma separated)</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value?.join(", ") || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value.split(",").map(item => item.trim()).filter(Boolean)
                  );
                }}
              />
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
            <FormLabel>Medications (comma separated)</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value?.join(", ") || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value.split(",").map(item => item.trim()).filter(Boolean)
                  );
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MedicalInfoForm;
