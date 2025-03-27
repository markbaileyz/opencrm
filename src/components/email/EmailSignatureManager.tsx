
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Plus, Edit, Trash2, CheckCircle, ArrowRight } from "lucide-react";
import { useEmailSignature } from "@/hooks/useEmailSignature";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface EmailSignatureManagerProps {
  onSelectSignature?: (signature: any) => void;
}

const EmailSignatureManager: React.FC<EmailSignatureManagerProps> = ({ 
  onSelectSignature 
}) => {
  const { signatures, addSignature, updateSignature, deleteSignature, setDefaultSignature } = useEmailSignature();
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editSignatureId, setEditSignatureId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  
  const resetForm = () => {
    setName("");
    setContent("");
    setEditSignatureId(null);
  };
  
  const handleAddSignature = () => {
    if (!name.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please provide both a name and content for your signature",
        variant: "destructive"
      });
      return;
    }
    
    addSignature({ name, content });
    toast({
      title: "Signature created",
      description: "Your email signature has been saved",
      variant: "success"
    });
    resetForm();
    setShowAddDialog(false);
  };
  
  const handleEditSignature = () => {
    if (!editSignatureId || !name.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please provide both a name and content for your signature",
        variant: "destructive"
      });
      return;
    }
    
    updateSignature(editSignatureId, { name, content });
    toast({
      title: "Signature updated",
      description: "Your email signature has been updated",
      variant: "success"
    });
    resetForm();
    setShowAddDialog(false);
  };
  
  const handleDeleteSignature = (id: string) => {
    deleteSignature(id);
    toast({
      title: "Signature deleted",
      description: "Your email signature has been removed",
      variant: "default"
    });
  };
  
  const handleSetDefault = (id: string) => {
    setDefaultSignature(id);
    toast({
      title: "Default signature set",
      description: "This signature will be used for all new emails",
      variant: "success"
    });
  };
  
  const handleSelectForEdit = (signature: any) => {
    setEditSignatureId(signature.id);
    setName(signature.name);
    setContent(signature.content);
    setShowAddDialog(true);
  };
  
  const handleSelect = (signature: any) => {
    if (onSelectSignature) {
      onSelectSignature(signature);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Email Signatures</h3>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetForm}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Signature
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editSignatureId ? "Edit Signature" : "Add New Signature"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="signature-name">Signature Name</Label>
                <Input
                  id="signature-name"
                  placeholder="e.g., Professional, Casual"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signature-content">Signature Content</Label>
                <Textarea
                  id="signature-content"
                  placeholder="Your signature content with HTML formatting"
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  You can use HTML tags for formatting
                </p>
              </div>
              <div className="border p-3 rounded">
                <h4 className="text-xs font-medium mb-2">Preview:</h4>
                <div 
                  className="p-2 border rounded bg-muted/10 text-sm"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={editSignatureId ? handleEditSignature : handleAddSignature}
              >
                {editSignatureId ? "Update" : "Save"} Signature
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-3">
        {signatures.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">No signatures created yet</p>
            <p className="text-xs">Create a signature to add to your emails</p>
          </div>
        ) : (
          signatures.map((signature) => (
            <Card key={signature.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{signature.name}</CardTitle>
                    {signature.isDefault && (
                      <Badge variant="outline" className="mt-1">Default</Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleSelectForEdit(signature)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleDeleteSignature(signature.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm pb-2">
                <div 
                  className="border rounded p-2 bg-muted/10 text-xs max-h-24 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: signature.content }}
                />
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                {!signature.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(signature.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Set as Default
                  </Button>
                )}
                {onSelectSignature && (
                  <Button
                    size="sm"
                    onClick={() => handleSelect(signature)}
                  >
                    Use This
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default EmailSignatureManager;
