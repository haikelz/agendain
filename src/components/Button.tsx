import { HTMLAttributes } from "react";
import { cx } from "~/lib/helpers/cx";
import { ChildrenProps } from "~/types";

type ButtonProps = ChildrenProps & {
  variant: "primary" | "secondary" | "danger";
  className: string;
  label: string;
} & HTMLAttributes<HTMLButtonElement>;

const Button = ({ children, variant, className, label, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      className={cx(
        "rounded-md text-white shadow-lg transition-all ease-in-out",
        variant === "primary"
          ? "bg-blue-500 hover:bg-blue-600"
          : variant === "secondary"
          ? "bg-gray-500 hover:bg-gray-600"
          : variant === "danger"
          ? "bg-red-500 hover:bg-red-600"
          : "",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
