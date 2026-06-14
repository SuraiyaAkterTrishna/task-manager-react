import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/tasks/TaskBoard";

export default function App(){
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
          <Sidebar />
          <main class="flex-1 flex flex-col min-h-0">
            <Header />
            <TaskBoard />
          </main>
        </div>
    );
}
