
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Calendar, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CheckInConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOffline, data } = location.state || { isOffline: false, data: null };
  
  if (!data) {
    return (
      <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
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
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Check-In {isOffline ? "Saved" : "Complete"}</CardTitle>
            {isOffline && (
              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300">
                Offline Mode
              </Badge>
            )}
          </div>
          <CardDescription>
            {isOffline 
              ? "Your information has been saved and will be submitted when you're back online" 
              : "Your information has been successfully submitted"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center pb-6">
          {isOffline ? (
            <Clock className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          ) : (
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          )}
          
          <h3 className="text-lg font-medium mb-2">
            Thank you, {data.firstName} {data.lastName}!
          </h3>
          
          {isOffline ? (
            <p className="mb-4">
              Your pre-check-in information has been saved locally on your device. It will be automatically submitted when your internet connection is restored.
            </p>
          ) : (
            <p className="mb-4">
              Your pre-check-in information has been successfully received. A confirmation email has been sent to {data.email}.
            </p>
          )}
          
          {data.appointmentTime ? (
            <div className="mt-6 p-4 bg-gray-100 rounded-md inline-block mx-auto">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">Appointment Details</span>
              </div>
              <p>
                Your preferred appointment time: <br />
                <span className="font-medium">{new Date(data.appointmentTime).toLocaleString()}</span>
              </p>
            </div>
          ) : (
            <div className="mt-6 p-4 bg-gray-100 rounded-md inline-block mx-auto">
              <p>
                {isOffline 
                  ? "Once your information is submitted, our staff will contact you to confirm your appointment." 
                  : "Our staff will contact you shortly to confirm your appointment details."}
              </p>
            </div>
          )}
          
          {!isOffline && (
            <div className="mt-6 bg-blue-50 p-4 rounded-md text-blue-800">
              <p className="font-medium">What's Next?</p>
              <ul className="text-left list-disc list-inside mt-2">
                <li>Please arrive 10 minutes before your appointment</li>
                <li>Bring your insurance card and ID</li>
                <li>Wear a mask if you have respiratory symptoms</li>
              </ul>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckInConfirmation;
