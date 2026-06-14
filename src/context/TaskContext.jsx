/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { taskData } from "../data/tasks"; 

const TaskContext = createContext();

function taskReducer(state, action){
    switch(action.type){
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload] // অবজেক্ট স্ট্রাকচার ঠিক রেখে tasks অ্যারে আপডেট
            };
        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
            };
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        default:
            return state;
    }
}

export function TaskProvider({children}){
    const [state, dispatch] = useReducer(taskReducer, taskData); 
    
    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
  const context = useContext(TaskContext);
  
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  
  return context;
}