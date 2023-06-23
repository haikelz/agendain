import { cx } from "class-variance-authority";
import { Paragraph } from "~/components/atoms";

export default function Loading() {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-200">
      <div className={cx("flex min-h-screen items-center justify-center", "w-full max-w-full p-4")}>
        <div className={cx("flex flex-col items-center justify-center", "w-full max-w-xl")}>
          <p className="text-2xl font-bold">Loading....</p>
        </div>
      </div>
    </div>
  );
}
