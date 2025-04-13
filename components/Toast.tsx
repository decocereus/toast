import { cn } from "../lib/utils";
import {
  AlertCircleIcon,
  InfoIcon,
  XCircleIcon,
  CheckCircleIcon,
  X,
} from "lucide-react";
import { ToastT, ToastType } from "../types/types";
import { useToast } from "../providers/ToastProvider";
import { useEffect, useRef } from "react";

const TOAST_TIMER = 30000;

export function getIcon(type: ToastType) {
  switch (type) {
    case "success":
      return <CheckCircleIcon size={24} color="white" />;
    case "error":
      return <XCircleIcon size={24} color="white" />;
    case "warning":
      return <AlertCircleIcon size={24} color="white" />;
    case "info":
      return <InfoIcon size={24} color="white" />;
  }
}

const Toast = ({
  id,
  type,
  message,
  description,
  onClose,
  containerClassName = "",
}: ToastT) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      const current = toastRef.current;
      if (current) {
        current.classList.add("animate-toast-out");
      }
      removeToast(id);
    }, TOAST_TIMER);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={toastRef}
      data-id={id}
      className={cn(
        `w-[356px] z-50 p-4 rounded-md border-2 border-white/20`,
        {
          "bg-green-500": type === "success",
          "bg-red-500": type === "error",
          "bg-yellow-500": type === "warning",
          "bg-blue-500": type === "info",
        },
        containerClassName
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center gap-x-4">
          {getIcon(type)}
          <div className="flex flex-col items-center justify-start gap-y-px">
            <p className="text-md font-medium text-white w-full">{message}</p>
            {description && (
              <p className="text-sm text-white w-full">{description}</p>
            )}
          </div>
        </div>
        <button
          className="p-2 rounded-full hover:bg-white/20"
          onClick={() => {
            removeToast(id);
            onClose?.();
          }}
        >
          <X size={24} color="black" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
