
import { z } from "zod";

// Define the schema for deal form validation
export const dealFormSchema = z.object({
  name: z.string().min(2, { message: "Deal name must be at least 2 characters." }),
  stage: z.string({ required_error: "Please select a stage." }),
  organization: z.string().optional(),
  contact: z.string().optional(),
  value: z.string().min(1, { message: "Please enter a value." }),
  closeDate: z.date({ required_error: "Please select a close date." }),
  probability: z.string().min(1, { message: "Please enter a probability." }),
  description: z.string().optional(),
});

// The form values type derived from the schema
export type DealFormValues = z.infer<typeof dealFormSchema>;

// The type for processed deal data after form submission
export interface ProcessedDealData extends Omit<DealFormValues, 'value' | 'probability'> {
  value: number;
  probability: number;
}
