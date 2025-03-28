
import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading patient information...</p>
      </div>
    </div>
  );
};

export default LoadingState;
