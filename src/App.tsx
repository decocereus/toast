import { useState } from "react";
import ToastProvider, { useToast } from "../providers/ToastProvider";
import Toaster from "../components/Toaster";
import { ToastType } from "../types/types";
import { cn } from "../lib/utils";

function App() {
  return (
    <ToastProvider>
      <div className="w-full h-screen flex flex-col gap-y-4 items-center justify-center p-4 relative bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Toast Notification Demo</h1>
        <div className="flex flex-wrap gap-2 justify-center">
          <ToastButton type="success" />
          <ToastButton type="error" />
          <ToastButton type="warning" />
          <ToastButton type="info" />
        </div>
        <Toaster />
      </div>
    </ToastProvider>
  );
}

function ToastButton({ type }: { readonly type: ToastType }) {
  const { addToast } = useToast();
  const [count, setCount] = useState(0);

  const getTitle = () => {
    switch (type) {
      case "success":
        return "Success";
      case "error":
        return "Error";
      case "warning":
        return "Warning";
      case "info":
        return "Information";
    }
  };

  return (
    <button
      className={cn("px-4 py-2 text-white font-medium rounded-lg", {
        "bg-green-500 hover:bg-green-600": type === "success",
        "bg-red-500 hover:bg-red-600": type === "error",
        "bg-yellow-500 hover:bg-yellow-600": type === "warning",
        "bg-blue-500 hover:bg-blue-600": type === "info",
      })}
      onClick={() => {
        const newCount = count + 1;
        setCount(newCount);
        addToast({
          id: Date.now().toString(),
          message: `${getTitle()} Notification #${newCount}`,
          description: `This is a ${type} toast notification example`,
          type,
        });
      }}
    >
      Show {getTitle()}
    </button>
  );
}

export default App;
