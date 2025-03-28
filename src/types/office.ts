
export interface Room {
  id: string;
  name: string;
  type: "waiting" | "appointment" | "office" | "restroom" | "break" | "other";
  capacity: number;
  status: "available" | "occupied" | "maintenance" | "reserved";
  equipment?: string[];
}

export interface SupplyItem {
  id: string;
  name: string;
  category: "medical" | "office" | "kitchen" | "cleaning" | "other";
  currentStock: number;
  minStock: number;
  unit: string;
  lastOrdered?: string;
  supplier?: string;
  reorderAmount?: number;
  location?: string;
}

export interface ScheduledTask {
  id: string;
  title: string;
  description: string;
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "custom";
  assignedTo?: string;
  lastCompleted?: string;
  nextDue: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed" | "overdue";
  category: "cleaning" | "maintenance" | "ordering" | "administrative" | "other";
}

export interface StaffMember {
  id: string;
  name: string;
  role: "doctor" | "nurse" | "receptionist" | "admin" | "technician" | "other";
  department: "primary-care" | "pediatrics" | "cardiology" | "neurology" | "front-desk" | "administration" | "other";
  status: "active" | "on-leave" | "part-time" | "inactive";
  availability: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  specialty?: string;
}

export interface OfficeSettings {
  businessName: string;
  address: string;
  phone: string;
  email: string;
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  rooms: Room[];
  supplies: SupplyItem[];
  scheduledTasks: ScheduledTask[];
  staff: StaffMember[];
}
