import { useTasks } from "../../context/TaskContext";
import TaskColumn from "./TaskColumn";


export default function TaskBoard({ onEditTask }) {
  const { state, dispatch } = useTasks();
  
  // Get all unique tags from all tasks
  const uniqueTags = [...new Set(state.tasks.flatMap(task => task.tags))];
  
  // Filter tasks based on search keyword
  const getFilteredTasksBySearch = (tasks) => {
    if (!state.searchKeyword) return tasks;
    return tasks.filter(task =>
      task.title.toLowerCase().includes(state.searchKeyword.toLowerCase())
    );
  };
  
  // Handle delete with confirmation
  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: 'DELETE_TASK', payload: taskId });
    }
  };
  
  // Handle move task
  const handleMove = (taskId, newColumnId) => {
    dispatch({ type: 'MOVE_TASK', payload: { taskId, newColumnId } });
  };
  
  return (
    <div className="flex-1 overflow-x-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-[768px]">
        {state.columns.map(column => {
          const columnTasks = state.tasks.filter(task => task.columnId === column.id);
          const searchedTasks = getFilteredTasksBySearch(columnTasks);
          
          return (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={searchedTasks}
              onEditTask={onEditTask}
              onDeleteTask={handleDelete}
              onMoveTask={handleMove}
              uniqueTags={uniqueTags}
            />
          );
        })}
      </div>
    </div>
  );
}