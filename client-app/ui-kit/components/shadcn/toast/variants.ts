import { cva, type VariantProps } from "class-variance-authority";

export const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg border p-4 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default:
          "border-[#ff6037]/20 bg-additional-50 text-neutral-900",
        success:
          "border-success-500/20 bg-additional-50 text-neutral-900",
        error:
          "border-danger-500/20 bg-additional-50 text-neutral-900",
        warning:
          "border-warning-500/20 bg-additional-50 text-neutral-900",
        info:
          "border-blue-500/20 bg-additional-50 text-neutral-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const toastIndicatorVariants = cva(
  "absolute left-0 top-0 h-full w-1 rounded-l-lg",
  {
    variants: {
      variant: {
        default: "bg-[#ff6037]",
        success: "bg-success-500",
        error: "bg-danger-500",
        warning: "bg-warning-500",
        info: "bg-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ToastVariantProps = VariantProps<typeof toastVariants>;

export type ToastVariant = NonNullable<ToastVariantProps["variant"]>;

export interface ToastProps {
  variant?: ToastVariant;
  class?: string;
}
