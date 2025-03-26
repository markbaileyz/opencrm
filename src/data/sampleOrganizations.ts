
import { Organization, OrganizationType, OrganizationStatus } from "@/types/organization";
import { v4 as uuidv4 } from "uuid";

// Helper function to generate random dates within the last year
const getRandomDate = (months: number) => {
  const date = new Date();
  date.setMonth(date.getMonth() - Math.floor(Math.random() * months));
  return date.toISOString();
};

export const sampleOrganizations: Organization[] = [
  {
    id: uuidv4(),
    name: "City General Hospital",
    type: "Hospital",
    address: "123 Medical Center Blvd, New York, NY 10001",
    phone: "(212) 555-7890",
    email: "contact@citygeneral.org",
    website: "https://citygeneral.org",
    contactPersonName: "Dr. Sarah Johnson",
    contactPersonEmail: "sjohnson@citygeneral.org",
    contactPersonPhone: "(212) 555-7891",
    status: "Active",
    notes: "Major hospital in downtown area with 500+ beds",
    createdAt: getRandomDate(10),
    updatedAt: getRandomDate(2),
  },
  {
    id: uuidv4(),
    name: "Wellness Family Clinic",
    type: "Clinic",
    address: "456 Health Street, Boston, MA 02101",
    phone: "(617) 555-1234",
    email: "info@wellnessfamily.com",
    website: "https://wellnessfamily.com",
    contactPersonName: "Dr. Michael Chen",
    contactPersonEmail: "mchen@wellnessfamily.com",
    contactPersonPhone: "(617) 555-1235",
    status: "Active",
    notes: "Family practice with 5 physicians",
    createdAt: getRandomDate(8),
    updatedAt: getRandomDate(1),
  },
  {
    id: uuidv4(),
    name: "MediLab Diagnostics",
    type: "Laboratory",
    address: "789 Research Park, Chicago, IL 60601",
    phone: "(312) 555-9876",
    email: "labs@medilab.com",
    website: "https://medilab.com",
    contactPersonName: "Lisa Rodriguez",
    contactPersonEmail: "lrodriguez@medilab.com",
    contactPersonPhone: "(312) 555-9877",
    status: "Active",
    notes: "Full-service diagnostic laboratory",
    createdAt: getRandomDate(12),
    updatedAt: getRandomDate(3),
  },
  {
    id: uuidv4(),
    name: "PharmaCare Plus",
    type: "Pharmacy",
    address: "101 Prescription Lane, Seattle, WA 98101",
    phone: "(206) 555-5555",
    email: "care@pharmacareplus.com",
    website: "https://pharmacareplus.com",
    contactPersonName: "James Wilson",
    contactPersonEmail: "jwilson@pharmacareplus.com",
    contactPersonPhone: "(206) 555-5556",
    status: "Active",
    notes: "Chain pharmacy with 24-hour service",
    createdAt: getRandomDate(6),
    updatedAt: getRandomDate(1),
  },
  {
    id: uuidv4(),
    name: "Guardian Health Insurance",
    type: "Insurance",
    address: "202 Coverage Ave, Hartford, CT 06103",
    phone: "(860) 555-4321",
    email: "info@guardianhealth.com",
    website: "https://guardianhealth.com",
    contactPersonName: "Amanda Foster",
    contactPersonEmail: "afoster@guardianhealth.com",
    contactPersonPhone: "(860) 555-4322",
    status: "Active",
    notes: "Major insurance provider for the region",
    createdAt: getRandomDate(9),
    updatedAt: getRandomDate(2),
  },
  {
    id: uuidv4(),
    name: "Metro Urgent Care",
    type: "Clinic",
    address: "303 Emergency Road, Miami, FL 33101",
    phone: "(305) 555-8765",
    email: "contact@metrourg.com",
    website: "https://metrourg.com",
    contactPersonName: "Dr. Robert Taylor",
    contactPersonEmail: "rtaylor@metrourg.com",
    contactPersonPhone: "(305) 555-8766",
    status: "Active",
    notes: "Walk-in clinic with 3 locations",
    createdAt: getRandomDate(7),
    updatedAt: getRandomDate(1),
  },
  {
    id: uuidv4(),
    name: "Highland Medical Center",
    type: "Hospital",
    address: "404 Highland Dr, Denver, CO 80202",
    phone: "(303) 555-6543",
    email: "info@highlandmed.org",
    website: "https://highlandmed.org",
    contactPersonName: "Dr. Emily Patel",
    contactPersonEmail: "epatel@highlandmed.org",
    contactPersonPhone: "(303) 555-6544",
    status: "Active",
    notes: "Specialized in cardiac care",
    createdAt: getRandomDate(11),
    updatedAt: getRandomDate(4),
  },
  {
    id: uuidv4(),
    name: "Valley Health Systems",
    type: "Hospital",
    address: "505 Valley View, Phoenix, AZ 85001",
    phone: "(602) 555-2109",
    email: "contact@valleyhealth.org",
    website: "https://valleyhealth.org",
    contactPersonName: "Dr. Thomas Wilson",
    contactPersonEmail: "twilson@valleyhealth.org",
    contactPersonPhone: "(602) 555-2110",
    status: "Inactive",
    notes: "Currently undergoing renovation",
    createdAt: getRandomDate(14),
    updatedAt: getRandomDate(2),
  },
  {
    id: uuidv4(),
    name: "LifeWell Pharmacy",
    type: "Pharmacy",
    address: "606 Health Blvd, Austin, TX 78701",
    phone: "(512) 555-3698",
    email: "contact@lifewellrx.com",
    website: "https://lifewellrx.com",
    contactPersonName: "Maria Sanchez",
    contactPersonEmail: "msanchez@lifewellrx.com",
    contactPersonPhone: "(512) 555-3699",
    status: "Active",
    notes: "Specializes in compounding medications",
    createdAt: getRandomDate(5),
    updatedAt: getRandomDate(1),
  },
  {
    id: uuidv4(),
    name: "Pacific Medical Group",
    type: "Clinic",
    address: "707 Pacific Highway, San Diego, CA 92101",
    phone: "(619) 555-7410",
    email: "info@pacificmedical.com",
    website: "https://pacificmedical.com",
    contactPersonName: "Dr. William Chang",
    contactPersonEmail: "wchang@pacificmedical.com",
    contactPersonPhone: "(619) 555-7411",
    status: "Pending",
    notes: "New partnership in discussion",
    createdAt: getRandomDate(3),
    updatedAt: getRandomDate(1),
  }
];
