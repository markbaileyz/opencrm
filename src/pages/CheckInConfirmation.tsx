
import React from "react";
import { useLocation } from "react-router-dom";
import NoInfoCard from "@/components/check-in-confirmation/NoInfoCard";
import SuccessCard from "@/components/check-in-confirmation/SuccessCard";

const CheckInConfirmation = () => {
  const location = useLocation();
  const { isOffline, data } = location.state || { isOffline: false, data: null };
  
  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {data ? (
        <SuccessCard isOffline={isOffline} data={data} />
      ) : (
        <NoInfoCard />
      )}
    </div>
  );
};

export default CheckInConfirmation;
