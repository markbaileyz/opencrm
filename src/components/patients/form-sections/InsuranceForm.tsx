
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PatientFormValues } from "../PatientFormTypes";

interface InsuranceFormProps {
  form: UseFormReturn<PatientFormValues>;
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="insuranceProvider"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Insurance Provider</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="policyNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Policy Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="groupNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Number (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="coverageType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Coverage Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select coverage type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="HMO">HMO</SelectItem>
                <SelectItem value="PPO">PPO</SelectItem>
                <SelectItem value="EPO">EPO</SelectItem>
                <SelectItem value="POS">POS</SelectItem>
                <SelectItem value="HDHP">HDHP</SelectItem>
                <SelectItem value="Medicare">Medicare</SelectItem>
                <SelectItem value="Medicaid">Medicaid</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default InsuranceForm;
