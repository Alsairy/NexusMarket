import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-200",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-additional-50 hover:bg-primary-600",
        secondary: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300",
        destructive: "bg-danger-500 text-additional-50 hover:bg-danger-600",
        success: "bg-success-500 text-additional-50 hover:bg-success-600",
        warning: "bg-warning-500 text-warning-900 hover:bg-warning-600",
        outline: "text-neutral-900 border border-neutral-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeVariantProps = VariantProps<typeof badgeVariants>;

export interface BadgeProps {
  variant?: NonNullable<BadgeVariantProps["variant"]>;
}
