
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, FolderPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const DocumentsModule: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Documents</h2>
        <p className="text-muted-foreground">Store and manage your documents</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search documents..." className="pl-8" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="cursor-pointer hover:bg-muted/50">
                <CardContent className="p-4 flex items-center gap-3">
                  <FileText className="h-10 w-10 text-blue-500" />
                  <div>
                    <p className="font-medium">Document {i}.pdf</p>
                    <p className="text-xs text-muted-foreground">
                      Updated {i} day{i !== 1 ? "s" : ""} ago
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsModule;
