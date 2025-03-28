
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  registerServiceWorker, 
  checkForServiceWorkerUpdate, 
  updateServiceWorker 
} from "../../registerServiceWorker";

const ServiceWorkerManager: React.FC = () => {
  const { toast } = useToast();
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    registerServiceWorker();
    checkForServiceWorkerUpdate(() => {
      setUpdateAvailable(true);
      toast({
        title: "Update available",
        description: "A new version of the app is available. Refresh to update.",
        duration: 10000,
        action: (
          <button 
            className="bg-primary text-white px-3 py-1 rounded text-xs font-medium"
            onClick={() => {
              updateServiceWorker();
              window.location.reload();
            }}
          >
            Update now
          </button>
        )
      });
    });
  }, [toast]);

  return null; // This component doesn't render anything
};

export default ServiceWorkerManager;
