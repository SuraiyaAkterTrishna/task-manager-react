import { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import AddTaskModal from './components/tasks/AddTaskModal';
import TaskBoard from './components/tasks/TaskBoard';
import Header from './components/Header';


function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddTaskClick={handleAddTask} />
      <TaskBoard onEditTask={handleEditTask} />
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        taskToEdit={editingTask}
      />
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