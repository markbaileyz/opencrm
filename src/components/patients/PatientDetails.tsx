
import React from "react";
import { Patient } from "@/types/patient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Calendar, 
  CreditCard, 
  FileText, 
  ClipboardList, 
  AlertCircle, 
  Pill, 
  Phone, 
  Building, 
  Pencil, 
  Trash 
} from "lucide-react";

interface PatientDetailsProps {
  patient: Patient;
  onEdit: () => void;
  onDelete: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({
  patient,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">
              {patient.firstName} {patient.lastName}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                {patient.status === "active" ? "Active" : "Inactive"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
              </span>
              <span className="text-sm text-muted-foreground capitalize">
                {patient.gender}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={onDelete}>
              <Trash className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="info">
          <TabsList className="mb-4">
            <TabsTrigger value="info" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Basic Info</span>
            </TabsTrigger>
            <TabsTrigger value="insurance" className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              <span>Insurance</span>
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              <span>Medical</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Appointments</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  Contact Information
                </h3>
                <div className="pl-5 space-y-1">
                  <div>
                    <span className="text-muted-foreground">Email:</span> {patient.email}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span> {patient.phone}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Address:</span> {patient.address}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Emergency Contact
                </h3>
                {patient.emergencyContact ? (
                  <div className="pl-5 space-y-1">
                    <div>
                      <span className="text-muted-foreground">Name:</span> {patient.emergencyContact.name}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Relationship:</span> {patient.emergencyContact.relationship}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span> {patient.emergencyContact.phone}
                    </div>
                  </div>
                ) : (
                  <div className="pl-5 text-muted-foreground">No emergency contact information</div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-1">
                <Building className="h-4 w-4" />
                Care Network
              </h3>
              <div className="pl-5 space-y-1">
                <div>
                  <span className="text-muted-foreground">Primary Care Physician:</span> {patient.primaryCarePhysician || "Not specified"}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Notes</h3>
              <p className="pl-5">{patient.notes || "No notes available"}</p>
            </div>
          </TabsContent>

          <TabsContent value="insurance">
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Current Insurance</h3>
                <div className="space-y-1">
                  <div>
                    <span className="text-muted-foreground">Provider:</span> {patient.insuranceProvider}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Policy Number:</span> {patient.policyNumber}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Group Number:</span> {patient.groupNumber || "N/A"}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Coverage Type:</span> {patient.coverageType}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Insurance History</h3>
                {patient.insuranceHistory && patient.insuranceHistory.length > 0 ? (
                  <div className="space-y-3">
                    {patient.insuranceHistory.map((insurance, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="font-medium">{insurance.provider}</div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Policy:</span> {insurance.policyNumber}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Coverage:</span> {insurance.coverageType}
                        </div>
                        {insurance.startDate && insurance.endDate && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Coverage Period:</span> 
                            {new Date(insurance.startDate).toLocaleDateString()} - 
                            {new Date(insurance.endDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground">No insurance history</div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="medical" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-md space-y-2">
                <h3 className="font-medium flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Medical Conditions
                </h3>
                {patient.medicalConditions && patient.medicalConditions.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {patient.medicalConditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted-foreground">No medical conditions</div>
                )}
              </div>

              <div className="bg-muted p-4 rounded-md space-y-2">
                <h3 className="font-medium flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Allergies
                </h3>
                {patient.allergies && patient.allergies.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {patient.allergies.map((allergy, index) => (
                      <li key={index}>{allergy}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted-foreground">No known allergies</div>
                )}
              </div>
            </div>

            <div className="bg-muted p-4 rounded-md space-y-2">
              <h3 className="font-medium flex items-center gap-1">
                <Pill className="h-4 w-4" />
                Medications
              </h3>
              {patient.medications && patient.medications.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {patient.medications.map((medication, index) => (
                    <li key={index}>{medication}</li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted-foreground">No current medications</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documents">
            {patient.documents && patient.documents.length > 0 ? (
              <div className="space-y-3">
                {patient.documents.map((document) => (
                  <div key={document.id} className="flex items-center justify-between border rounded-md p-3">
                    <div>
                      <div className="font-medium">{document.name}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        Type: {document.type}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-40">
                <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No documents uploaded</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Upload Document
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="appointments">
            {patient.appointments && patient.appointments.length > 0 ? (
              <div className="space-y-3">
                {patient.appointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{appointment.reason}</div>
                        <div className="text-sm">
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          With: {appointment.provider} (Duration: {appointment.duration} min)
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Location: {appointment.location}
                        </div>
                      </div>
                      <Badge variant={
                        appointment.status === "scheduled" ? "default" :
                        appointment.status === "completed" ? "success" :
                        appointment.status === "cancelled" ? "destructive" : "outline"
                      }>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-40">
                <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No appointments scheduled</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Schedule Appointment
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PatientDetails;
