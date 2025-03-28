
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  registerServiceWorker, 
  checkForServiceWorkerUpdate, 
  updateServiceWorker 
} from "../../registerServiceWorker";
import { VERSION } from "@/version";

const ServiceWorkerManager: React.FC = () => {
  const { toast } = useToast();
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Log version information to console
    console.log(`App Version: ${VERSION.toString()}`);
    
    registerServiceWorker();
    checkForServiceWorkerUpdate(() => {
      setUpdateAvailable(true);
      toast({
        title: `Update available (v${VERSION.toString()})`,
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

  return (
    <div className="hidden">
      {/* Version information hidden but available for debugging */}
      <span data-app-version={VERSION.toString()}></span>
    </div>
  );
};

export default ServiceWorkerManager;
