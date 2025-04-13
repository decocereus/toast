export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastT {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  containerClassName?: string;
  onClose?: () => void;
}
