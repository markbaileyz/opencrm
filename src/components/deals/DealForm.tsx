
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dealFormSchema, DealFormValues } from "./form/DealFormTypes";
import { Form } from "@/components/ui/form";
import DealBasicInfoFields from "./form/DealBasicInfoFields";
import DealRelationshipFields from "./form/DealRelationshipFields";
import DealValueFields from "./form/DealValueFields";
import DealDescriptionField from "./form/DealDescriptionField";
import DealFormActions from "./form/DealFormActions";

interface DealFormProps {
  onSubmit: (data: DealFormValues) => void;
  initialData?: any;
  onCancel: () => void;
}

const DealForm: React.FC<DealFormProps> = ({
  onSubmit,
  initialData,
  onCancel
}) => {
  const isEditMode = !!initialData;

  // Set default values based on initial data or defaults
  const defaultValues: Partial<DealFormValues> = {
    name: initialData?.name || "",
    stage: initialData?.stage || "lead",
    organization: initialData?.organization || "",
    contact: initialData?.contact || "",
    value: initialData?.value ? String(initialData.value) : "",
    closeDate: initialData?.closeDate ? new Date(initialData.closeDate) : new Date(),
    probability: initialData?.probability ? String(initialData.probability) : "50",
    description: initialData?.description || "",
  };

  const form = useForm<DealFormValues>({
    resolver: zodResolver(dealFormSchema),
    defaultValues,
  });

  const handleSubmit = (data: DealFormValues) => {
    // Convert string values to numbers where appropriate
    const formattedData = {
      ...data,
      value: parseFloat(data.value),
      probability: parseInt(data.probability),
    };
    
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <DealBasicInfoFields form={form} />
          <DealRelationshipFields form={form} />
          <DealValueFields form={form} />
          <DealDescriptionField form={form} />
        </div>
        
        <DealFormActions isEditMode={isEditMode} onCancel={onCancel} />
      </form>
    </Form>
  );
};

export default DealForm;
