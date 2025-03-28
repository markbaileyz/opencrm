
import React from "react";
import { Routes as RouterRoutes } from "react-router-dom";
import { PublicRoutes } from "./route-groups/PublicRoutes";
import { CommonRoutes } from "./route-groups/CommonRoutes";
import { PatientRoutes } from "./route-groups/PatientRoutes";
import { DoctorRoutes } from "./route-groups/DoctorRoutes";
import { NurseRoutes } from "./route-groups/NurseRoutes";
import { CommunicationRoutes } from "./route-groups/CommunicationRoutes";
import { FrontDeskRoutes } from "./route-groups/FrontDeskRoutes";
import { AdminRoutes } from "./route-groups/AdminRoutes";

const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      {PublicRoutes}
      {CommonRoutes}
      {PatientRoutes}
      {DoctorRoutes}
      {NurseRoutes}
      {CommunicationRoutes}
      {FrontDeskRoutes}
      {AdminRoutes}
    </RouterRoutes>
  );
};

export default Routes;
