import { useClerk, useUser } from "@clerk/clerk-react";
import { HiXMark } from "react-icons/hi2";
import { cx } from "~/lib/helpers/cx";
import useAgendaStore from "~/store";

export default function Modal() {
  const { setIsOpenModal } = useAgendaStore();
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="relative max-h-full w-full max-w-lg">
      <div className={cx("relative rounded-lg bg-white shadow", "dark:bg-gray-700")}>
        <div
          className={cx(
            "flex items-start justify-between rounded-t border-b p-4",
            "dark:border-gray-600"
          )}
        >
          <h3 className={cx("text-xl font-semibold text-gray-900", "dark:text-white")}>
            User Data
          </h3>
          <button
            type="button"
            className={cx(
              "ml-auto inline-flex items-center",
              "rounded-lg bg-transparent p-1.5",
              "text-sm text-gray-400",
              "hover:bg-gray-200 hover:text-gray-900",
              "dark:hover:bg-gray-600 dark:hover:text-white"
            )}
            aria-label="open close modal"
            onClick={() => setIsOpenModal(false)}
          >
            <HiXMark size={22} />
          </button>
        </div>
        <div className="my-4 flex w-full items-center justify-center">
          <img
            className="h-60 w-60 rounded-full"
            src={user.profileImageUrl}
            alt="user profile"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="my-3 flex flex-col items-center justify-center">
          <span className="text-xl font-bold">{user.username}</span>
          <span className="">{user.primaryEmailAddress?.emailAddress}</span>
        </div>
        <div
          className={cx(
            "flex items-center space-x-2 rounded-b border-t border-gray-200 p-6",
            "dark:border-gray-600"
          )}
        >
          <button
            type="button"
            aria-label="sign out"
            className={cx(
              "rounded-lg bg-blue-700 px-5 py-2.5",
              "text-center text-sm font-medium text-white",
              "hover:bg-blue-800 focus:outline-none",
              "focus:ring-4 focus:ring-blue-300",
              "dark:bg-blue-700 dark:hover:bg-blue-700",
              "dark:focus:ring-blue-800"
            )}
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
