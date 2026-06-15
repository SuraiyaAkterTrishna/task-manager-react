import { useState, useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';



export default function AddTaskModal({ isOpen, onClose, taskToEdit }) {
  const { dispatch } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: ['Design'],
    dueDate: '',
    columnId: 1
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        tags: taskToEdit.tags,
        dueDate: taskToEdit.dueDate,
        columnId: taskToEdit.columnId
      });
    } else {
      setFormData({
        title: '',
        description: '',
        tags: ['Design'],
        dueDate: '',
        columnId: 1
      });
    }
  }, [taskToEdit]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    if (!formData.dueDate) {
      alert('Please select a due date');
      return;
    }
    
    if (taskToEdit) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: { ...formData, id: taskToEdit.id }
      });
    } else {
      const newTask = {
        id: `task-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        tags: formData.tags,
        dueDate: formData.dueDate,
        columnId: formData.columnId
      };
      dispatch({ type: 'ADD_TASK', payload: newTask });
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {taskToEdit ? 'Edit Task' : 'Create New Task'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {taskToEdit ? 'Update your task details' : 'Add a new task to your board'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Task Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Wireframes, API Integration, etc."
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add detailed description, acceptance criteria, or notes..."
                rows="3"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tag
                </label>
                <select
                  value={formData.tags[0]}
                  onChange={(e) => setFormData({ ...formData, tags: [e.target.value] })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none"
                >
                  <option value="Design">🎨 Design</option>
                  <option value="Operations">⚙️ Operations</option>
                  <option value="Marketing">📢 Marketing</option>
                  <option value="Creative">💡 Creative</option>
                  <option value="Development">💻 Development</option>
                  <option value="Backend">🔧 Backend</option>
                  <option value="Setup">🛠️ Setup</option>
                  <option value="Infrastructure">🏗️ Infrastructure</option>
                  <option value="Documentation">📚 Documentation</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.columnId}
                  onChange={(e) => setFormData({ ...formData, columnId: parseInt(e.target.value) })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none"
                >
                  <option value="1">📋 To-do</option>
                  <option value="2">🔄 In Progress</option>
                  <option value="3">✅ Done</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors font-medium"
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