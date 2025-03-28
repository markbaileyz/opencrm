
import { useState, useEffect } from "react";
import { StaffMember } from "@/types/office";

// Sample initial staff data
const initialStaff: StaffMember[] = [
  {
    id: "staff-1",
    name: "Dr. Jane Smith",
    role: "doctor",
    department: "primary-care",
    status: "active",
    availability: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "Off",
      sunday: "Off"
    },
    contact: {
      email: "jane.smith@example.com",
      phone: "123-456-7890"
    },
    specialty: "Family Medicine"
  },
  {
    id: "staff-2",
    name: "Nurse Robert Johnson",
    role: "nurse",
    department: "pediatrics",
    status: "active",
    availability: {
      monday: "8:00 AM - 4:00 PM",
      tuesday: "8:00 AM - 4:00 PM",
      wednesday: "8:00 AM - 4:00 PM",
      thursday: "Off",
      friday: "8:00 AM - 4:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Off"
    },
    contact: {
      email: "robert.johnson@example.com",
      phone: "123-456-7891"
    }
  },
  {
    id: "staff-3",
    name: "Sarah Williams",
    role: "receptionist",
    department: "front-desk",
    status: "active",
    availability: {
      monday: "8:00 AM - 4:00 PM",
      tuesday: "8:00 AM - 4:00 PM",
      wednesday: "8:00 AM - 4:00 PM",
      thursday: "8:00 AM - 4:00 PM",
      friday: "8:00 AM - 4:00 PM",
      saturday: "Off",
      sunday: "Off"
    },
    contact: {
      email: "sarah.williams@example.com",
      phone: "123-456-7892"
    }
  },
  {
    id: "staff-4",
    name: "Dr. Michael Brown",
    role: "doctor",
    department: "cardiology",
    status: "on-leave",
    availability: {
      monday: "10:00 AM - 6:00 PM",
      tuesday: "10:00 AM - 6:00 PM",
      wednesday: "Off",
      thursday: "10:00 AM - 6:00 PM",
      friday: "10:00 AM - 6:00 PM",
      saturday: "Off",
      sunday: "Off"
    },
    contact: {
      email: "michael.brown@example.com",
      phone: "123-456-7893"
    },
    specialty: "Cardiology"
  }
];

export const useStaffManagement = () => {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [newStaff, setNewStaff] = useState<Partial<StaffMember>>({
    name: "",
    role: "receptionist",
    department: "front-desk",
    status: "active",
    availability: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "Off",
      sunday: "Off"
    },
    contact: {
      email: "",
      phone: ""
    }
  });

  // Filter staff based on search query
  const filteredStaff = staff.filter((member) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.department.toLowerCase().includes(query) ||
      (member.specialty && member.specialty.toLowerCase().includes(query))
    );
  });

  // Handle adding a new staff member
  const handleAddStaff = () => {
    const staffMember: StaffMember = {
      id: `staff-${Date.now()}`,
      name: newStaff.name || "New Staff Member",
      role: newStaff.role || "receptionist",
      department: newStaff.department || "front-desk",
      status: newStaff.status || "active",
      availability: newStaff.availability || {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "Off",
        sunday: "Off"
      },
      contact: {
        email: newStaff.contact?.email || "",
        phone: newStaff.contact?.phone || ""
      },
      specialty: newStaff.specialty
    };
    
    setStaff([...staff, staffMember]);
    setIsAddStaffOpen(false);
    setNewStaff({
      name: "",
      role: "receptionist",
      department: "front-desk",
      status: "active",
      availability: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "Off",
        sunday: "Off"
      },
      contact: {
        email: "",
        phone: ""
      }
    });
  };

  return {
    staff,
    filteredStaff,
    searchQuery,
    setSearchQuery,
    isAddStaffOpen,
    setIsAddStaffOpen,
    handleAddStaff,
    newStaff,
    setNewStaff
  };
};
