import { cx } from "~/lib/helpers/cx";
import { ChildrenProps } from "~/types";

const Layout = ({ children }: ChildrenProps) => {
  return (
    <section
      className={cx(
        "flex min-h-screen items-start justify-center",
        "w-full max-w-full",
        "box-content dark:bg-gray-900 dark:text-gray-200"
      )}
    >
      <div className={cx("flex flex-col items-center justify-center", "w-full max-w-7xl p-4")}>
        {children}
      </div>
    </section>
  );
};

export default Layout;
