
import { useEmailSignature, type EmailSignature } from "@/hooks/useEmailSignature";

export function useEmailSignatureActions() {
  const { getDefaultSignature } = useEmailSignature();

  const appendSignature = (message: string, signature?: EmailSignature) => {
    // Use provided signature or default
    const sigToUse = signature || getDefaultSignature();
    
    if (!sigToUse) {
      return message;
    }
    
    // Check if message already ends with the signature
    if (message.trim().endsWith(sigToUse.content.trim())) {
      return message;
    }
    
    // Add two newlines before signature if message is not empty
    const separator = message.trim() ? '\n\n' : '';
    return `${message}${separator}${sigToUse.content}`;
  };

  return {
    appendSignature
  };
}
