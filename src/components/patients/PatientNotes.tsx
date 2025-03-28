
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  Plus, 
  Search, 
  Filter, 
  User,
  Calendar,
  ChevronDown
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePatientNotes } from "@/hooks/usePatientNotes";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface PatientNotesProps {
  patientId: string;
}

const PatientNotes: React.FC<PatientNotesProps> = ({ patientId }) => {
  const { notes, isLoading, error, addNote } = usePatientNotes(patientId);
  const [newNote, setNewNote] = useState("");
  const [showAddNote, setShowAddNote] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  
  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote(newNote);
      setNewNote("");
      setShowAddNote(false);
    }
  };
  
  const filteredNotes = notes?.filter(note => 
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort notes based on selected sorting method
  const sortedNotes = filteredNotes?.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortBy === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });
  
  if (isLoading) {
    return <div className="flex justify-center p-8">Loading notes...</div>;
  }
  
  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center p-6">
            <p className="text-destructive">Error loading patient notes</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold flex items-center">
          <ClipboardList className="mr-2 h-5 w-5 text-primary" />
          Patient Notes
        </h2>
        
        <Button 
          size="sm" 
          className="gap-1"
          onClick={() => setShowAddNote(!showAddNote)}
        >
          <Plus className="h-4 w-4" />
          Add Note
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1 w-full md:w-auto">
              <Filter className="h-4 w-4" />
              <span>Sort: {sortBy === "newest" ? "Newest First" : "Oldest First"}</span>
              <ChevronDown className="h-4 w-4 ml-auto md:ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <DropdownMenuRadioItem value="newest">
                Newest First
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">
                Oldest First
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {showAddNote && (
        <Card>
          <CardContent className="pt-4">
            <h3 className="font-medium mb-2">New Note</h3>
            <Textarea 
              placeholder="Type your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[120px] mb-3"
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setShowAddNote(false);
                  setNewNote("");
                }}
              >
                Cancel
              </Button>
              <Button 
                size="sm"
                onClick={handleAddNote}
                disabled={!newNote.trim()}
              >
                Save Note
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {sortedNotes?.length ? (
        <div className="space-y-4">
          {sortedNotes.map((note, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <User className="h-4 w-4" />
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{note.author}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{note.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        {note.type}
                      </span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="whitespace-pre-wrap">{note.content}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-6 flex flex-col items-center justify-center">
            <ClipboardList className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No notes found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm 
                ? "No notes match your search criteria." 
                : "There are no notes on record for this patient."}
            </p>
            {!searchTerm && (
              <Button 
                className="gap-1"
                onClick={() => setShowAddNote(true)}
              >
                <Plus className="h-4 w-4" />
                Add First Note
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientNotes;
