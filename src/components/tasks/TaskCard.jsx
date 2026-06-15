import { useEffect, useRef, useState } from "react";
import { tagColors } from "../../context/TaskContext";


export default function TaskCard({ task, onEdit, onDelete, onMove, columnId }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getMoveOptions = () => {
    const options = [];
    if (columnId !== 1) options.push({ id: 1, name: 'To-do' });
    if (columnId !== 2) options.push({ id: 2, name: 'In Progress' });
    if (columnId !== 3) options.push({ id: 3, name: 'Done' });
    return options;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleEdit = () => {
    setShowMenu(false);
    onEdit(task);
  };

  const handleDelete = () => {
    setShowMenu(false);
    onDelete(task.id);
  };

  const handleMove = (newColumnId) => {
    setShowMenu(false);
    onMove(task.id, newColumnId);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow relative">
      {/* Header with 3 dots */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 text-base pr-8">{task.title}</h3>
        
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
              {/* Edit Option */}
              <button
                onClick={handleEdit}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              
              {/* Delete Option */}
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
              
              {/* Divider */}
              <div className="border-t border-gray-200 my-1"></div>
              
              {/* Move To Section */}
              <div className="px-2 py-1">
                <div className="text-xs font-medium text-gray-500 px-2 py-1">Move To</div>
                {getMoveOptions().map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleMove(option.id)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {task.tags.map((tag, idx) => (
          <span
            key={idx}
            className={`px-2 py-1 text-xs font-medium rounded-lg ${tagColors[tag] || 'bg-gray-100 text-gray-800'}`}
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Due Date */}
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Due {formatDate(task.dueDate)}</span>
      </div>
    </div>
  );
}