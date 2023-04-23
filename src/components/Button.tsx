import { HTMLAttributes } from "react";
import { cx } from "~/lib/helpers/cx";
import { ChildrenProps } from "~/types";

type ButtonProps = ChildrenProps & {
  variant: "primary" | "secondary" | "danger";
  className: string;
  label: string;
} & HTMLAttributes<HTMLButtonElement>;

export default function Button({ children, variant, className, label, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cx(
        "rounded-md",
        "flex items-center justify-center space-x-2 text-white shadow-lg",
        "text-base",
        "transition-all ease-in-out",
        "hover:-translate-y-1",
        "focus:outline-none focus:ring-4",
        variant === "primary"
          ? ["bg-blue-600", "hover:bg-blue-700", "focus:ring-blue-300", "dark:focus:ring-blue-800"]
          : variant === "secondary"
          ? ["bg-teal-500", "hover:bg-teal-600", "focus:ring-teal-300", "dark:focus:ring-teal-800"]
          : variant === "danger"
          ? ["bg-red-500", "hover:bg-red-600", "focus:ring-red-300", "dark:focus:ring-red-800"]
          : "",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
