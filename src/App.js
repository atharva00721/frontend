// import { Header } from "./components/Header";
import { StatusBar } from "./components/StatusBar";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* <Header /> */}

      <main className="flex flex-col h-screen">
        <PipelineToolbar />
        <div className="flex-1 relative">
          <PipelineUI />
        </div>
        <StatusBar />
        <div className="bg-white border-t border-neutral-200 p-4">
          <SubmitButton />
        </div>
      </main>
    </div>
  );
}

export default App;
