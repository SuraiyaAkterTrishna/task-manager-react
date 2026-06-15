import { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import TaskCard from "./TaskCard";


export default function TaskColumn({ column, tasks, onEditTask, onDeleteTask, onMoveTask, uniqueTags }) {
  const { state, dispatch } = useTasks();
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  // Get current filter and sort for this column
  const currentFilter = state.filters[column.id] || '';
  const currentSort = state.sortOrder[column.id] || 'asc';

  // Apply filter
  let filteredTasks = tasks;
  if (currentFilter) {
    filteredTasks = tasks.filter(task => task.tags.includes(currentFilter));
  }

  // Apply sort
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return currentSort === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const handleFilter = (tag) => {
    console.log('Filter clicked:', tag, 'for column:', column.id); // Debug log
    dispatch({ 
      type: 'SET_FILTER', 
      payload: { 
        columnId: column.id, 
        tag: tag === currentFilter ? '' : tag 
      } 
    });
    setShowFilterMenu(false);
  };

  const toggleSort = () => {
    const newOrder = currentSort === 'asc' ? 'desc' : 'asc';
    dispatch({ 
      type: 'SET_SORT', 
      payload: { 
        columnId: column.id, 
        order: newOrder 
      } 
    });
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-4 flex flex-col h-full">
      {/* Column Header */}
      <div className="flex justify-between items-center mb-4 px-2">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {column.title}
            <span className="ml-2 text-sm text-gray-500 font-normal">
              ({sortedTasks.length})
            </span>
          </h2>
          {currentFilter && (
            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
              Filter: {currentFilter}
              <button 
                onClick={() => handleFilter(currentFilter)}
                className="hover:text-blue-600"
              >
                ×
              </button>
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`p-2 rounded-lg transition-colors ${currentFilter ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">Filter by Tag</div>
                  <button
                    onClick={() => handleFilter('')}
                    className="w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-gray-100"
                  >
                    All Tags
                  </button>
                  {uniqueTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleFilter(tag)}
                      className={`w-full text-left px-3 py-1.5 text-sm rounded-md ${
                        currentFilter === tag ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sort Button */}
          <button
            onClick={toggleSort}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
            title={`Sort by date (${currentSort === 'asc' ? 'Oldest first' : 'Newest first'})`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Tasks Container */}
      <div className="flex-1 overflow-y-auto space-y-3 min-h-[200px]">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No tasks found</p>
            {currentFilter && (
              <p className="text-xs text-gray-400 mt-1">Clear filter to see all tasks</p>
            )}
          </div>
        ) : (
          sortedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              columnId={column.id}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onMove={onMoveTask}
            />
          ))
        )}
      </div>
    </div>
  );
}