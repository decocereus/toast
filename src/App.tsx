import ToastProvider, { useToast } from "../providers/ToastProvider";
import Toaster from "../components/Toaster";

function App() {
  return (
    <ToastProvider>
      <div className="w-full h-screen flex flex-col gap-y-4 items-center justify-center p-4 relative">
        <h1 className="w-fit">Welcome to Toast App</h1>
        <ToastButton />
        <Toaster />
      </div>
    </ToastProvider>
  );
}

function ToastButton() {
  const { addToast } = useToast();
  return (
    <button
      onClick={() => {
        addToast({
          id: Date.now().toString(),
          message: `Hello ${Math.random() * 100}`,
          type: "success",
        });
      }}
    >
      Add Toast
    </button>
  );
}

export default App;
