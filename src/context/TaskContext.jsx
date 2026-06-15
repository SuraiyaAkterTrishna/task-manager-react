import { createContext, useContext, useReducer, useEffect } from 'react';
import { taskData } from '../data/tasks';

const TaskContext = createContext();

// Tag colors mapping
export const tagColors = {
  "Design": "bg-purple-100 text-purple-800",
  "Operations": "bg-blue-100 text-blue-800",
  "Marketing": "bg-green-100 text-green-800",
  "Creative": "bg-pink-100 text-pink-800",
  "Development": "bg-indigo-100 text-indigo-800",
  "Backend": "bg-red-100 text-red-800",
  "Setup": "bg-yellow-100 text-yellow-800",
  "Infrastructure": "bg-gray-100 text-gray-800",
  "Documentation": "bg-teal-100 text-teal-800"
};

// Initial state
const initialState = {
  tasks: taskData.tasks,
  columns: taskData.columns,
  searchKeyword: '',
  filters: {
    1: '',  // To-do column filter
    2: '',  // In Progress column filter
    3: ''   // Done column filter
  },
  sortOrder: {
    1: 'asc',  // To-do column sort
    2: 'asc',  // In Progress column sort
    3: 'asc'   // Done column sort
  }
};

// Reducer
function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
      
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        )
      };
      
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
      
    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, columnId: action.payload.newColumnId }
            : task
        )
      };
      
    case 'SET_SEARCH':
      return {
        ...state,
        searchKeyword: action.payload
      };
      
    case 'SET_FILTER':
      console.log('Setting filter:', action.payload); // Debug log
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.columnId]: action.payload.tag
        }
      };
      
    case 'SET_SORT':
      return {
        ...state,
        sortOrder: {
          ...state.sortOrder,
          [action.payload.columnId]: action.payload.order
        }
      };
      
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load from localStorage if exists
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(savedTasks) });
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
}