
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Edit, Plus, Save, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useEmailSignature, type EmailSignature } from "@/hooks/useEmailSignature";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SignatureFormProps {
  initialData?: EmailSignature;
  onSave: (data: Omit<EmailSignature, 'id'>) => void;
  onCancel: () => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({
  initialData,
  onSave,
  onCancel
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [isDefault, setIsDefault] = useState(initialData?.isDefault || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      content,
      isDefault
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signature-name">Signature Name</Label>
        <Input
          id="signature-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Professional, Personal"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signature-content">Signature Content</Label>
        <Textarea
          id="signature-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your signature content here..."
          className="min-h-[150px]"
          required
        />
        <p className="text-xs text-muted-foreground">
          Tip: Include your name, title, contact information, and any legal disclaimers.
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="make-default"
          checked={isDefault}
          onCheckedChange={setIsDefault}
        />
        <Label htmlFor="make-default">Make this my default signature</Label>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Signature</Button>
      </DialogFooter>
    </form>
  );
};

interface EmailSignatureManagerProps {
  onSelectSignature?: (signature: EmailSignature) => void;
}

const EmailSignatureManager: React.FC<EmailSignatureManagerProps> = ({
  onSelectSignature
}) => {
  const {
    signatures,
    isLoading,
    addSignature,
    updateSignature,
    deleteSignature
  } = useEmailSignature();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSignature, setEditingSignature] = useState<EmailSignature | null>(null);
  
  const handleAddSignature = (data: Omit<EmailSignature, 'id'>) => {
    addSignature(data);
    setIsAddDialogOpen(false);
  };
  
  const handleUpdateSignature = (data: Omit<EmailSignature, 'id'>) => {
    if (editingSignature) {
      updateSignature(editingSignature.id, data);
      setEditingSignature(null);
    }
  };
  
  const handleDeleteSignature = (id: string) => {
    if (window.confirm("Are you sure you want to delete this signature?")) {
      deleteSignature(id);
    }
  };
  
  if (isLoading) {
    return <div>Loading signatures...</div>;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Email Signatures</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              <span>Add Signature</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Signature</DialogTitle>
              <DialogDescription>
                Add a new email signature that will be available when composing emails.
              </DialogDescription>
            </DialogHeader>
            <SignatureForm
              onSave={handleAddSignature}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <ScrollArea className="h-[400px]">
        <div className="space-y-4 pr-4">
          {signatures.map((signature) => (
            <Card key={signature.id} className="relative">
              {signature.isDefault && (
                <div className="absolute top-2 right-2 text-primary flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-xs">Default</span>
                </div>
              )}
              <CardHeader>
                <CardTitle>{signature.name}</CardTitle>
                <CardDescription>
                  Last updated: {new Date().toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border p-3 rounded-md bg-muted/50">
                  <pre className="whitespace-pre-wrap text-sm font-sans">
                    {signature.content}
                  </pre>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingSignature(signature)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Signature</DialogTitle>
                      </DialogHeader>
                      {editingSignature && (
                        <SignatureForm
                          initialData={editingSignature}
                          onSave={handleUpdateSignature}
                          onCancel={() => setEditingSignature(null)}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteSignature(signature.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
                
                {onSelectSignature && (
                  <Button
                    onClick={() => onSelectSignature(signature)}
                    size="sm"
                  >
                    Use This Signature
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EmailSignatureManager;
