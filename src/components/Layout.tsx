import clsx from "clsx";
import { ChildrenProps } from "../types";
import { Suspense } from "react";

const Layout = ({ children }: ChildrenProps) => {
  return (
    <section
      className={clsx(
        "flex min-h-screen items-start justify-center",
        "w-full max-w-full",
        "box-content dark:bg-gray-900 dark:text-gray-200"
      )}
    >
      <div className={clsx("flex flex-col items-center justify-center", "w-full max-w-7xl p-4")}>
        {children}
      </div>
    </section>
  );
};

export default Layout;
