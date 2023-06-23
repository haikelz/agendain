import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

const heading = cva("font-bold text-gray-900 dark:text-white", {
  variants: {
    size: {
      "4xl": "text-4xl",
      "3xl": "text-3xl",
      "2xl": "text-2xl",
      xl: "text-xl",
    },
    align: {
      center: "text-center",
      justify: "text-justify",
      start: "text-start",
      end: "text-end",
    },
  },
  defaultVariants: {
    size: "4xl",
  },
});

type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof heading> & {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

export function Heading({ className, size, align, children, as, ...props }: HeadingProps) {
  return (
    <>
      {as === "h1" ? (
        <h1 className={heading({ className, size, align })} {...props}>
          {children}
        </h1>
      ) : as === "h2" ? (
        <h2 className={heading({ className, size, align })} {...props}>
          {children}
        </h2>
      ) : as === "h3" ? (
        <h3 className={heading({ className, size, align })} {...props}>
          {children}
        </h3>
      ) : as === "h4" ? (
        <h4 className={heading({ className, size, align })} {...props}>
          {children}
        </h4>
      ) : as === "h5" ? (
        <h5 className={heading({ className, size, align })} {...props}>
          {children}
        </h5>
      ) : (
        <h6 className={heading({ className, size, align })} {...props}>
          {children}
        </h6>
      )}
    </>
  );
}
