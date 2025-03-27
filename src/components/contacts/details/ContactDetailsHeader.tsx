
import React from "react";
import { Contact } from "@/types/contact";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Save, X } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CardTitle } from "@/components/ui/card";

interface ContactDetailsHeaderProps {
  contact: Contact;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (e: React.FormEvent) => void;
  onDelete: (id: string) => void;
}

const ContactDetailsHeader: React.FC<ContactDetailsHeaderProps> = ({
  contact,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onDelete
}) => {
  return (
    <>
      <CardTitle className="text-xl">
        {isEditing ? "Edit Contact" : contact.name}
      </CardTitle>
      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <Button variant="outline" size="sm" onClick={onCancel}>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button size="sm" onClick={onSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {contact.name}? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(contact.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </>
  );
};

export default ContactDetailsHeader;
