
export interface CallRecord {
  id: string;
  name: string;
  phone: string;
  date: string;
  duration: number;
  notes: string;
  type: "incoming" | "outgoing" | "missed";
}
