
import React, { useState } from "react";
import { PatientTask } from "@/types/patient";
import TaskManagement from "../TaskManagement";
import TaskFormDialog from "@/components/tasks/TaskFormDialog";
import TaskList from "@/components/tasks/TaskList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface TasksTabProps {
  tasks: PatientTask[];
  patientId: string;
  onAddTask: (task: PatientTask) => void;
  onUpdateTask: (taskId: string, updates: Partial<PatientTask>) => void;
  onDeleteTask: (taskId: string) => void;
}

const TasksTab: React.FC<TasksTabProps> = ({
  tasks,
  patientId,
  onAddTask,
  onUpdateTask,
  onDeleteTask
}) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<PatientTask | undefined>(undefined);
  
  const handleAddTask = () => {
    setSelectedTask(undefined);
    setShowTaskForm(true);
  };
  
  const handleEditTask = (task: PatientTask) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };
  
  const handleCompleteTask = (task: PatientTask) => {
    onUpdateTask(task.id, { status: "completed" });
  };
  
  const handleSaveTask = (task: PatientTask, isNew: boolean) => {
    if (isNew) {
      onAddTask(task);
    } else {
      onUpdateTask(task.id, task);
    }
    setShowTaskForm(false);
  };
  
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddTask}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
      
      <TaskList
        tasks={tasks}
        onAddTask={handleAddTask}
        onCompleteTask={handleCompleteTask}
        onEditTask={handleEditTask}
      />
      
      <TaskFormDialog
        open={showTaskForm}
        onOpenChange={setShowTaskForm}
        task={selectedTask}
        patientId={patientId}
        onSave={handleSaveTask}
      />
    </>
  );
};

export default TasksTab;
