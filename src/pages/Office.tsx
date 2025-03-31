
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import OfficeDashboard from "@/components/office/overview/OfficeDashboard";

const Office = () => {
  // Mock data for demonstration
  const overdueTasks = [
    { id: 1, title: "Order supplies", dueDate: "2023-11-01" },
    { id: 2, title: "Schedule maintenance", dueDate: "2023-10-28" }
  ];
  
  const lowStockSupplies = [
    { id: 1, name: "Gloves", currentStock: 20, threshold: 50 },
    { id: 2, name: "Masks", currentStock: 15, threshold: 100 }
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Office Management</h1>
        <OfficeDashboard 
          overdueTasks={overdueTasks}
          lowStockSupplies={lowStockSupplies}
        />
      </div>
    </DashboardLayout>
  );
};

export default Office;
