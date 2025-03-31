
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const MedicationFooter: React.FC = () => {
  const [refillDialogOpen, setRefillDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      pharmacy: "",
      notes: ""
    }
  });
  
  const handleRefillRequest = (data: any) => {
    toast({
      title: "Refill request submitted",
      description: `Your refill request has been sent to ${data.pharmacy}.`,
    });
    
    setRefillDialogOpen(false);
    
    // In a real application, this would submit the request to a backend
  };

  return (
    <>
      <CardFooter className="flex gap-2 pt-4 justify-end">
        <Button 
          variant="outline" 
          onClick={() => setRefillDialogOpen(true)}
        >
          Refill Request
        </Button>
        <Button>Manage Medication</Button>
      </CardFooter>
      
      <Dialog open={refillDialogOpen} onOpenChange={setRefillDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Medication Refill</DialogTitle>
            <DialogDescription>
              Fill out this form to request a refill of your medication.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRefillRequest)} className="space-y-4">
              <FormField
                control={form.control}
                name="pharmacy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Pharmacy</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pharmacy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="walgreens">Walgreens</SelectItem>
                        <SelectItem value="cvs">CVS Pharmacy</SelectItem>
                        <SelectItem value="walmart">Walmart Pharmacy</SelectItem>
                        <SelectItem value="other">Other (specify in notes)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add any special instructions or notes for your healthcare provider"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setRefillDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MedicationFooter;
