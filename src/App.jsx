import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/tasks/TaskBoard";

import { TaskProvider, useTasks } from "./context/TaskContext";
import AddTaskModal from "./components/tasks/AddTaskModal";

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { state } = useTasks(); 

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  }

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 flex flex-col min-h-0">
        
        <Header onAddTaskClick={handleAddTask} />
        <TaskBoard 
          tasks={state.tasks} 
          onEditTask={handleEditTask} 
        />
        
        <AddTaskModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          taskToEdit={editingTask}
        />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}