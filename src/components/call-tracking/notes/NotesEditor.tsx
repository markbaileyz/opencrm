
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Save } from "lucide-react";

interface NotesEditorProps {
  initialNotes: string;
  onSave: (notes: string) => void;
}

const NotesEditor: React.FC<NotesEditorProps> = ({ initialNotes, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(initialNotes);

  const handleSaveNotes = () => {
    onSave(notes);
    setIsEditing(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Call Notes</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsEditing(!isEditing)} 
          className="h-8 px-2"
        >
          {isEditing ? (
            <Save className="h-4 w-4" />
          ) : (
            <Edit2 className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter notes about this call..."
            className="min-h-[100px]"
          />
          <Button 
            onClick={handleSaveNotes} 
            className="mt-2"
          >
            Save Notes
          </Button>
        </div>
      ) : (
        <div className="p-3 bg-muted/40 rounded-md min-h-[60px]">
          {notes ? notes : (
            <span className="text-muted-foreground italic">No notes added for this call.</span>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesEditor;
