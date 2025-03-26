
import React from "react";
import { Organization } from "@/types/organization";
import { useOrganizations } from "@/context/OrganizationsContext";
import { Button } from "@/components/ui/button";
import { formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, ExternalLink } from "lucide-react";

interface OrganizationsTableProps {
  onEdit: (organization: Organization) => void;
}

const OrganizationsTable: React.FC<OrganizationsTableProps> = ({ onEdit }) => {
  const { filteredOrganizations, deleteOrganization } = useOrganizations();

  const handleDelete = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this organization?")) {
      deleteOrganization(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Inactive":
        return "bg-gray-500";
      case "Pending":
        return "bg-yellow-500";
      case "Archived":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden lg:table-cell">Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:table-cell">Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrganizations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No organizations found
              </TableCell>
            </TableRow>
          ) : (
            filteredOrganizations.map((organization) => (
              <TableRow
                key={organization.id}
                onClick={() => onEdit(organization)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell>
                  <div className="font-medium">{organization.name}</div>
                  <div className="text-sm text-muted-foreground hidden sm:block">
                    {organization.email}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {organization.type}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {organization.contactPersonName ? (
                    <div>
                      <div>{organization.contactPersonName}</div>
                      <div className="text-sm text-muted-foreground">
                        {organization.contactPersonEmail}
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No contact person</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(organization.status)}>
                    {organization.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {formatDistance(new Date(organization.updatedAt), new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(organization);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  {organization.website && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(organization.website, "_blank");
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Visit website</span>
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={(e) => handleDelete(organization.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrganizationsTable;
