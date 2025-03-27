
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DangerZoneSectionProps {
  onDeleteAccount: () => void;
}

const DangerZoneSection: React.FC<DangerZoneSectionProps> = ({ onDeleteAccount }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <div className="p-4 border border-destructive/20 rounded-md bg-destructive/5">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium flex items-center">
            <Trash className="h-4 w-4 mr-2 text-destructive" />
            Delete Your Account
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
        </div>
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center text-destructive">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Delete Account
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-destructive/10 p-3 rounded-md text-sm border border-destructive/20">
              <p className="font-medium">What will happen when you delete your account:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>All your personal information will be deleted</li>
                <li>All your contacts and organizations will be removed</li>
                <li>All your deals and communications history will be erased</li>
                <li>You will lose access to all data immediately</li>
              </ul>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  onDeleteAccount();
                  setIsDeleteDialogOpen(false);
                }}
              >
                Yes, Delete My Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DangerZoneSection;
