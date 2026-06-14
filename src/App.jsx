import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/tasks/TaskBoard";
import { TaskProvider } from "./context/TaskContext";

export default function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen flex flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-0">
          <Header />
          <TaskBoard />
        </main>
      </div>
    </TaskProvider>
  );
}
