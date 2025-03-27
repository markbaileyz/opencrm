
import React from "react";
import { PatientTask } from "@/types/patient";
import TaskManagement from "../TaskManagement";

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
  return (
    <TaskManagement
      tasks={tasks}
      patientId={patientId}
      onAddTask={onAddTask}
      onUpdateTask={onUpdateTask}
      onDeleteTask={onDeleteTask}
    />
  );
};

export default TasksTab;
