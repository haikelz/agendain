import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

const checkbox = cva("h-4 w-4 cursor-pointer rounded", {
  variants: {
    intent: {
      blue: [
        "border-gray-300 bg-gray-100 text-blue-700",
        "focus:ring-2 focus:ring-blue-600",
        "dark:border-gray-600 dark:bg-gray-700",
        "dark:ring-offset-gray-800 dark:focus:ring-blue-700",
      ],
    },
  },
  defaultVariants: {
    intent: "blue",
  },
});

type CheckBoxProps = InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof checkbox>;

export function CheckBox({ intent, className, ...props }: CheckBoxProps) {
  return <input type="checkbox" className={checkbox({ intent, className })} {...props} />;
}
