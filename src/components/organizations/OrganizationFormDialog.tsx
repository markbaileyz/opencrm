
import React from "react";
import { Organization, OrganizationType, OrganizationStatus, OrganizationSize } from "@/types/organization";
import { useOrganizations } from "@/context/OrganizationsContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const HEALTHCARE_SPECIALTIES = [
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "Oncology",
  "Pediatrics",
  "Dermatology",
  "Ophthalmology",
  "Psychiatry",
  "Radiology",
  "Emergency Medicine",
  "General Surgery",
  "Family Medicine",
  "Internal Medicine",
  "Obstetrics & Gynecology",
  "Urology",
  "Gastroenterology",
  "Endocrinology",
  "Pulmonology",
  "Rheumatology",
];

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.enum([
    "Hospital", "Clinic", "Laboratory", "Pharmacy", "Insurance", 
    "SpecialtyCare", "RehabCenter", "NursingHome", "HomeHealthcare", "Other"
  ]),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(6, "Phone must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  contactPersonName: z.string().optional().or(z.literal("")),
  contactPersonEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  contactPersonPhone: z.string().optional().or(z.literal("")),
  status: z.enum(["Active", "Inactive", "Pending", "Archived"]),
  notes: z.string().optional().or(z.literal("")),
  specialties: z.array(z.string()).optional(),
  size: z.enum(["Small", "Medium", "Large", "Enterprise"]).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface OrganizationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization?: Organization;
}

const OrganizationFormDialog: React.FC<OrganizationFormDialogProps> = ({
  open,
  onOpenChange,
  organization,
}) => {
  const { addOrganization, updateOrganization } = useOrganizations();
  const isEditMode = !!organization;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditMode
      ? {
          name: organization.name,
          type: organization.type,
          address: organization.address,
          phone: organization.phone,
          email: organization.email,
          website: organization.website || "",
          contactPersonName: organization.contactPersonName || "",
          contactPersonEmail: organization.contactPersonEmail || "",
          contactPersonPhone: organization.contactPersonPhone || "",
          status: organization.status,
          notes: organization.notes || "",
          specialties: organization.specialties || [],
          size: organization.size || "Small",
        }
      : {
          name: "",
          type: "Hospital" as OrganizationType,
          address: "",
          phone: "",
          email: "",
          website: "",
          contactPersonName: "",
          contactPersonEmail: "",
          contactPersonPhone: "",
          status: "Active" as OrganizationStatus,
          notes: "",
          specialties: [],
          size: "Small" as OrganizationSize,
        },
  });

  const onSubmit = (data: FormValues) => {
    if (isEditMode) {
      updateOrganization({
        ...organization,
        ...data,
      });
    } else {
      const newOrgData = {
        name: data.name,
        type: data.type,
        address: data.address,
        phone: data.phone,
        email: data.email,
        status: data.status,
        website: data.website || undefined,
        contactPersonName: data.contactPersonName || undefined,
        contactPersonEmail: data.contactPersonEmail || undefined,
        contactPersonPhone: data.contactPersonPhone || undefined,
        notes: data.notes || undefined,
        specialties: data.specialties,
        size: data.size,
      };
      
      addOrganization(newOrgData);
    }
    onOpenChange(false);
  };

  const selectedSpecialties = form.watch("specialties") || [];

  const toggleSpecialty = (specialty: string) => {
    const current = selectedSpecialties;
    const updated = current.includes(specialty)
      ? current.filter(item => item !== specialty)
      : [...current, specialty];
    
    form.setValue("specialties", updated, { shouldValidate: true });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Organization" : "Add New Organization"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the details of an existing organization"
              : "Fill out the form below to add a new healthcare organization"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Hospital">Hospital</SelectItem>
                        <SelectItem value="Clinic">Clinic</SelectItem>
                        <SelectItem value="Laboratory">Laboratory</SelectItem>
                        <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                        <SelectItem value="SpecialtyCare">Specialty Care</SelectItem>
                        <SelectItem value="RehabCenter">Rehab Center</SelectItem>
                        <SelectItem value="NursingHome">Nursing Home</SelectItem>
                        <SelectItem value="HomeHealthcare">Home Healthcare</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Small">Small</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Large">Large</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
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
                    <FormLabel>Phone*</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Address*</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="sm:col-span-2">
                <h3 className="text-sm font-medium mb-3">Specialties</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {HEALTHCARE_SPECIALTIES.map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`specialty-${specialty}`}
                        checked={selectedSpecialties.includes(specialty)}
                        onCheckedChange={() => toggleSpecialty(specialty)}
                      />
                      <label htmlFor={`specialty-${specialty}`} className="text-sm cursor-pointer">
                        {specialty}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <h3 className="text-sm font-medium mb-3">Contact Person Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="contactPersonName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact person name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPersonEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPersonPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Additional information" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">{isEditMode ? "Save Changes" : "Add Organization"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationFormDialog;

