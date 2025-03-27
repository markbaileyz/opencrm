
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const NoInfoCard = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="max-w-md w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">No Information Found</CardTitle>
        <CardDescription>We couldn't find any check-in information</CardDescription>
      </CardHeader>
      <CardContent className="text-center pb-6">
        <Info className="h-16 w-16 text-amber-500 mx-auto mb-4" />
        <p>There was an issue accessing your check-in information. Please try completing the check-in process again.</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={() => navigate('/pre-check-in')}>
          Return to Check-In Form
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoInfoCard;
