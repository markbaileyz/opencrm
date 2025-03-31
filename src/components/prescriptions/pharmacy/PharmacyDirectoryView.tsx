
import React, { useState } from "react";
import { Search, MapPin, Phone, CheckCircle2, XCircle, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { pharmacies } from "@/data/pharmacyData";
import { Pharmacy, PharmacySortField } from "@/types/pharmacy";
import PharmacyDetailDialog from "./PharmacyDetailDialog";

const PharmacyDirectoryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<PharmacySortField>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const filteredPharmacies = pharmacies.filter(pharmacy => 
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.state.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedPharmacies = [...filteredPharmacies].sort((a, b) => {
    if (sortField === "isIntegrated") {
      return sortDirection === "asc" 
        ? (a.isIntegrated === b.isIntegrated ? 0 : a.isIntegrated ? -1 : 1)
        : (a.isIntegrated === b.isIntegrated ? 0 : a.isIntegrated ? 1 : -1);
    } else if (sortField === "preferredByPatients") {
      const aValue = a.preferredByPatients || 0;
      const bValue = b.preferredByPatients || 0;
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    const aValue = a[sortField]?.toString().toLowerCase() || "";
    const bValue = b[sortField]?.toString().toLowerCase() || "";
    return sortDirection === "asc" 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const handleSort = (field: PharmacySortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleViewDetails = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search pharmacies by name, city, or state..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] cursor-pointer" onClick={() => handleSort("name")}>
                Name {sortField === "name" && <ArrowUpDown className="h-4 w-4 inline ml-1" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("address")}>
                Address {sortField === "address" && <ArrowUpDown className="h-4 w-4 inline ml-1" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("city")}>
                City {sortField === "city" && <ArrowUpDown className="h-4 w-4 inline ml-1" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("isIntegrated")}>
                Status {sortField === "isIntegrated" && <ArrowUpDown className="h-4 w-4 inline ml-1" />}
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPharmacies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No pharmacies found.
                </TableCell>
              </TableRow>
            ) : (
              sortedPharmacies.map((pharmacy) => (
                <TableRow key={pharmacy.id}>
                  <TableCell className="font-medium">{pharmacy.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{pharmacy.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>{pharmacy.city}, {pharmacy.state} {pharmacy.zipCode}</TableCell>
                  <TableCell>
                    {pharmacy.isIntegrated ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Integrated
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        Not Integrated
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewDetails(pharmacy)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <PharmacyDetailDialog
        pharmacy={selectedPharmacy}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
};

export default PharmacyDirectoryView;
