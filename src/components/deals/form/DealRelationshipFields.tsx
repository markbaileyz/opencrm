
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { DealFormValues } from "./DealFormTypes";
import DealOrganizationSelector from "../DealOrganizationSelector";
import DealContactSelector from "../DealContactSelector";

interface DealRelationshipFieldsProps {
  form: UseFormReturn<DealFormValues>;
}

const DealRelationshipFields: React.FC<DealRelationshipFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="organization"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organization</FormLabel>
            <FormControl>
              <DealOrganizationSelector 
                value={field.value} 
                onChange={field.onChange} 
              />
            </FormControl>
            <FormDescription>
              Select the organization this deal is associated with.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contact"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Contact</FormLabel>
            <FormControl>
              <DealContactSelector 
                value={field.value} 
                onChange={field.onChange} 
              />
            </FormControl>
            <FormDescription>
              Select the primary contact for this deal.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DealRelationshipFields;
