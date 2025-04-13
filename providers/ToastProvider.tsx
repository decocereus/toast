import React, { createContext, useContext, useMemo, useState } from "react";
import { ToastT } from "../types/types";

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastContextType {
  toasts: ToastT[];
  addToast: (toast: ToastT) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastT[]>([]);

  const addToast = (toast: ToastT) => {
    if (toasts.length >= 3) {
      setToasts((prev) => {
        const existingToasts = [...prev];
        existingToasts.pop();
        return [toast, ...existingToasts];
      });
      return;
    }
    setToasts((prev) => [toast, ...prev]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const value = useMemo(() => ({ toasts, addToast, removeToast }), [toasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

export default ToastProvider;
