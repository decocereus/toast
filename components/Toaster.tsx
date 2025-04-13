import { useToast } from "../providers/ToastProvider";
import { ToastT } from "../types/types";
import Toast from "./Toast";

const Toaster = () => {
  const { toasts } = useToast();

  if (!toasts || toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-2 right-2 z-50">
      <ul className="relative">
        {toasts.map((toast: ToastT, index: number) => (
          <li
            key={toast.id}
            className="absolute right-2 bottom-2 animate-toast-in transition-transform duration-200 ease-in-out shadow-lg"
            style={{
              transform: `translateY(${-index * 0.4}rem)`,
              zIndex: toasts.length - index,
            }}
          >
            <Toast {...toast} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toaster;
