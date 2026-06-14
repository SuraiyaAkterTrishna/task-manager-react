import { useTasks } from "../../context/TaskContext";
import TaskColumn from "./TaskColumn";

export default function TaskBoard(){
    const { state: { columns, tasks } } = useTasks();
    
    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8 min-h-0">
                    <div className="flex flex-col gap-6 xl:flex-row h-full">
                        {columns.map(column => (
                            <TaskColumn
                                key={column.id}
                                title={column.title}
                                tasks= {tasks.filter(task => task.columnId === column.id)}
                            />
                        ))}
                    </div>
                </div>
    );
}