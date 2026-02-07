import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-additional-50 border border-primary-500 hover:bg-primary-600 hover:border-primary-600",
        destructive: "bg-danger-500 text-additional-50 border border-danger-500 hover:bg-danger-600 hover:border-danger-600",
        outline: "border border-neutral-300 bg-additional-50 text-neutral-900 hover:bg-neutral-100",
        secondary: "bg-neutral-200 text-neutral-900 border border-neutral-200 hover:bg-neutral-300 hover:border-neutral-300",
        ghost: "text-neutral-900 hover:bg-neutral-100",
        link: "text-primary-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-13 px-5 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps {
  variant?: NonNullable<ButtonVariantProps["variant"]>;
  size?: NonNullable<ButtonVariantProps["size"]>;
  disabled?: boolean;
  loading?: boolean;
  asChild?: boolean;
}
