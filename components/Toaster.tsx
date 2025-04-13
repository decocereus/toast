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
      <ul className="relative flex flex-col-reverse gap-2">
        {toasts.map((toast: ToastT, index: number) => (
          <li
            key={toast.id}
            className="absolute right-0 bottom-0"
            style={{
              transform: `translateY(${-index * 0.5}rem)`,
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
