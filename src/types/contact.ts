
export type ContactStatus = "lead" | "prospect" | "customer" | "inactive";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  lastContact: string;
  status: ContactStatus;
  notes: string;
  profileImage?: string;
  tags?: string[];
}
