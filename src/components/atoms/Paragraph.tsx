import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

const paragraph = cva("text-base text-gray-900 dark:text-white", {
  variants: {
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    weight: "medium",
  },
});

type ParagraphProps = HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof paragraph>;

export function Paragraph({
  className,
  weight,
  children,
  ...props
}: ParagraphProps) {
  return (
    <p className={paragraph({ weight, className })} {...props}>
      {children}
    </p>
  );
};
