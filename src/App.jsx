import Sidebar from "./components/Sidebar";

export default function App(){
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
          <Sidebar />
          <main class="flex-1 flex flex-col min-h-0">
            
          </main>
        </div>
    );
}
