import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const button = cva(
  [
    "rounded-md flex items-center justify-center",
    "space-x-2 text-white shadow-lg",
    "px-3 py-2",
    "text-base transition-all",
    "hover:-translate-y-1",
    "focus:outline-none focus:ring-4",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-blue-500",
          "hover:bg-blue-700",
          "focus:ring-blue-300",
          "dark:focus:ring-blue-800",
        ],
        secondary: [
          "bg-teal-500",
          "hover:bg-teal-600",
          "focus:ring-teal-300",
          "dark:focus:ring-teal-800",
        ],
        danger: ["bg-red-500", "hover:bg-red-600", "focus:ring-red-300", "dark:focus:ring-red-800"],
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    className?: string;
    label: string;
  };

export function Button({ children, intent, className, label, ...props }: ButtonProps) {
  return (
    <button type="button" aria-label={label} className={button({ intent, className })} {...props}>
      {children}
    </button>
  );
}
