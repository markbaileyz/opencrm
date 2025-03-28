
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import ServiceWorkerManager from "@/components/service-worker/ServiceWorkerManager";
import OfflineBannerContainer from "@/components/offline/OfflineBannerContainer";
import Routes from "@/components/routing/Routes";

function App() {
  return (
    <div className="relative">
      <ServiceWorkerManager />
      <OfflineBannerContainer />
      <Routes />
      <Toaster />
    </div>
  );
}

export default App;
