/* eslint-disable react-hooks/set-state-in-effect */
// components/AddTaskModal.jsx
import { useState, useEffect } from "react";
import { useTasks } from "../../context/TaskContext";


export default function AddTaskModal({ isOpen, onClose, taskToEdit }) {
  const { dispatch } = useTasks();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: ["Design"],
    dueDate: "",
    columnId: 1
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        tags: taskToEdit.tags,
        dueDate: taskToEdit.dueDate,
        columnId: taskToEdit.columnId
      });
    } else {
      setFormData({
        title: "",
        description: "",
        tags: ["Design"],
        dueDate: "",
        columnId: 1
      });
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (taskToEdit) {
      dispatch({
        type: "UPDATE_TASK",
        payload: { ...formData, id: taskToEdit.id }
      });
    } else {
      const newTask = {
        id: `task-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        tags: Array.isArray(formData.tags) ? formData.tags : [formData.tags],
        dueDate: formData.dueDate,
        columnId: formData.columnId
      };
      dispatch({ type: "ADD_TASK", payload: newTask });
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {taskToEdit ? 'Edit Task' : 'Add Task'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Task Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tag</label>
                <select
                  value={formData.tags[0]}
                  onChange={(e) => setFormData({...formData, tags: [e.target.value]})}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                >
                  <option value="Design">Design</option>
                  <option value="Operations">Operations</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Creative">Creative</option>
                  <option value="Development">Development</option>
                  <option value="Backend">Backend</option>
                  <option value="Setup">Setup</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Documentation">Documentation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={formData.columnId}
                  onChange={(e) => setFormData({...formData, columnId: parseInt(e.target.value)})}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                >
                  <option value="1">To-do</option>
                  <option value="2">In Progress</option>
                  <option value="3">Done</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gray-900 text-white"
              >
                {taskToEdit ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}