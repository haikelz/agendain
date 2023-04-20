import clsx from "clsx";
import { HiMoon, HiSun } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDarkMode } from "~/hooks/useDarkMode";
import { cx } from "~/lib/helpers/cx";
import { ChildrenProps } from "~/types";

export default function Layout({ children }: ChildrenProps) {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <section
      className={cx(
        "flex min-h-screen items-start justify-center",
        "w-full max-w-full p-4",
        "dark:bg-gray-900 dark:text-gray-200"
      )}
    >
      <div className={cx("flex flex-col items-center justify-center", "w-full max-w-xl")}>
        <nav className="sticky top-0 w-full bg-white/80 py-4 backdrop-blur-sm dark:bg-gray-900/80">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="flex items-center justify-center">
                <img className="h-7 w-7" src="/logo.svg" alt="logo" />
              </div>
            </Link>
            <button
              className={clsx(
                "rounded-md bg-gray-200 p-1.5",
                "hover:bg-gray-300",
                "dark:bg-gray-800"
              )}
              type="button"
              aria-label="change mode theme"
              onClick={() => setDarkMode(darkMode === "dark" ? "light" : "dark")}
            >
              {darkMode === "dark" ? <HiSun size={19} /> : <HiMoon size={19} />}
            </button>
          </div>
        </nav>
        {children}
      </div>
    </section>
  );
}
