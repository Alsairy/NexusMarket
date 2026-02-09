import { ref } from "vue";
import type { ToastVariant } from "./variants";

export interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface Toast extends Required<Pick<ToastOptions, "id" | "variant" | "duration">> {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const TOAST_MAX = 5;
const TOAST_DEFAULT_DURATION = 5000;

let toastCount = 0;

function genId(): string {
  toastCount += 1;
  return `toast-${toastCount}-${Date.now()}`;
}

const toasts = ref<Toast[]>([]);
const timers = new Map<string, ReturnType<typeof setTimeout>>();

function addToast(options: ToastOptions): Toast {
  const id = options.id ?? genId();

  const toast: Toast = {
    id,
    title: options.title,
    description: options.description,
    variant: options.variant ?? "default",
    duration: options.duration ?? TOAST_DEFAULT_DURATION,
    action: options.action,
  };

  // Remove oldest if at max
  if (toasts.value.length >= TOAST_MAX) {
    const oldest = toasts.value[0];
    if (oldest) {
      dismiss(oldest.id);
    }
  }

  toasts.value.push(toast);

  // Auto-dismiss after duration (0 means persistent)
  if (toast.duration > 0) {
    const timer = setTimeout(() => {
      dismiss(toast.id);
    }, toast.duration);
    timers.set(toast.id, timer);
  }

  return toast;
}

function dismiss(id: string): void {
  const timer = timers.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

function dismissAll(): void {
  for (const [id, timer] of timers) {
    clearTimeout(timer);
    timers.delete(id);
  }
  toasts.value = [];
}

export function useToast() {
  return {
    toasts,
    toast: addToast,
    dismiss,
    dismissAll,
  };
}
