
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface EmailSignature {
  id: string;
  name: string;
  content: string;
  isDefault: boolean;
}

export function useEmailSignature() {
  const [signatures, setSignatures] = useState<EmailSignature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load signatures from localStorage
  useEffect(() => {
    try {
      const savedSignatures = localStorage.getItem('emailSignatures');
      
      if (savedSignatures) {
        setSignatures(JSON.parse(savedSignatures));
      } else {
        // Initialize with default signature if none exist
        const defaultSignature: EmailSignature = {
          id: `signature-${Date.now()}`,
          name: 'Default Signature',
          content: `
Best regards,
[Your Name]
[Your Title]
[Your Company]
[Your Phone]
          `,
          isDefault: true
        };
        
        setSignatures([defaultSignature]);
        localStorage.setItem('emailSignatures', JSON.stringify([defaultSignature]));
      }
    } catch (error) {
      console.error("Error loading signatures:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save signatures to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('emailSignatures', JSON.stringify(signatures));
    }
  }, [signatures, isLoading]);

  // Get default signature
  const getDefaultSignature = (): EmailSignature | undefined => {
    return signatures.find(sig => sig.isDefault);
  };

  // Add new signature
  const addSignature = (signature: Omit<EmailSignature, 'id'>) => {
    const newSignature: EmailSignature = {
      ...signature,
      id: `signature-${Date.now()}`
    };
    
    // If this is marked as default, remove default from others
    let updatedSignatures = signatures;
    if (newSignature.isDefault) {
      updatedSignatures = signatures.map(sig => ({
        ...sig,
        isDefault: false
      }));
    }
    
    setSignatures([...updatedSignatures, newSignature]);
    
    toast({
      title: "Signature created",
      description: `Signature "${newSignature.name}" has been created`,
      variant: "default",
    });
    
    return newSignature;
  };

  // Update existing signature
  const updateSignature = (id: string, updates: Partial<Omit<EmailSignature, 'id'>>) => {
    let updatedSignatures = [...signatures];
    
    // If this signature is being set as default, remove default from others
    if (updates.isDefault) {
      updatedSignatures = updatedSignatures.map(sig => ({
        ...sig,
        isDefault: false
      }));
    }
    
    // Update the specified signature
    updatedSignatures = updatedSignatures.map(sig => {
      if (sig.id === id) {
        return { ...sig, ...updates };
      }
      return sig;
    });
    
    setSignatures(updatedSignatures);
    
    toast({
      title: "Signature updated",
      description: "Your signature has been updated",
      variant: "default",
    });
  };

  // Delete signature
  const deleteSignature = (id: string) => {
    const signatureToDelete = signatures.find(sig => sig.id === id);
    
    if (!signatureToDelete) {
      return false;
    }
    
    // Don't allow deleting the last signature
    if (signatures.length <= 1) {
      toast({
        title: "Cannot delete signature",
        description: "You must have at least one signature",
        variant: "destructive",
      });
      return false;
    }
    
    // If deleting the default signature, make another one default
    let updatedSignatures = signatures.filter(sig => sig.id !== id);
    
    if (signatureToDelete.isDefault && updatedSignatures.length > 0) {
      updatedSignatures[0].isDefault = true;
    }
    
    setSignatures(updatedSignatures);
    
    toast({
      title: "Signature deleted",
      description: `Signature "${signatureToDelete.name}" has been deleted`,
      variant: "default",
    });
    
    return true;
  };

  // Set default signature
  const setDefaultSignature = (id: string) => {
    const updatedSignatures = signatures.map(sig => ({
      ...sig,
      isDefault: sig.id === id
    }));
    
    setSignatures(updatedSignatures);
    
    toast({
      title: "Default signature set",
      description: "This signature will be used for all new emails",
      variant: "default",
    });
  };

  return {
    signatures,
    isLoading,
    getDefaultSignature,
    addSignature,
    updateSignature,
    deleteSignature,
    setDefaultSignature
  };
}
