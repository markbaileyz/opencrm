
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Deal } from "@/types/deal";
import { dealFormSchema, DealFormValues } from "./form/DealFormTypes";
import DealBasicInfoFields from "./form/DealBasicInfoFields";
import DealRelationshipFields from "./form/DealRelationshipFields";
import DealValueFields from "./form/DealValueFields";
import DealDescriptionField from "./form/DealDescriptionField";
import DealFormActions from "./form/DealFormActions";

interface DealFormProps {
  deal?: Deal;
  onSubmit: (data: Partial<Deal>) => void;
  onCancel: () => void;
}

const DealForm: React.FC<DealFormProps> = ({ deal, onSubmit, onCancel }) => {
  const isEditMode = !!deal;

  const defaultValues: Partial<DealFormValues> = {
    name: deal?.name || "",
    stage: deal?.stage || "prospecting",
    organization: deal?.organization || "",
    contact: deal?.contact || "",
    value: deal?.value ? String(deal.value) : "",
    closeDate: deal?.closeDate ? new Date(deal.closeDate) : new Date(),
    probability: deal?.probability ? String(deal.probability) : "50",
    description: deal?.description || "",
  };

  const form = useForm<DealFormValues>({
    resolver: zodResolver(dealFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: DealFormValues) => {
    const formattedData = {
      ...values,
      value: parseFloat(values.value),
      probability: parseInt(values.probability, 10),
    };
    
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <DealBasicInfoFields form={form} />
        <DealRelationshipFields form={form} />
        <DealValueFields form={form} />
        <DealDescriptionField form={form} />
        <DealFormActions isEditMode={isEditMode} onCancel={onCancel} />
      </form>
    </Form>
  );
};

export default DealForm;
