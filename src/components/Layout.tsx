import { useClerk, useUser } from "@clerk/clerk-react";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { HiMoon, HiSun, HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDarkMode } from "~/hooks/useDarkMode";
import { cx } from "~/lib/helpers/cx";
import useAgendaStore from "~/store";
import { ChildrenProps } from "~/types";
import Button from "./Button";
import { AnimatePresence, Variant, Variants, m } from "framer-motion";

export default function Layout({ children }: ChildrenProps) {
  const [darkMode, setDarkMode] = useDarkMode();

  const { isOpenModal, setIsOpenModal } = useAgendaStore();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const popUpModal: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  };

  return (
    <>
      <div
        className={cx(
          "flex min-h-screen items-start justify-center",
          "w-full max-w-full p-4",
          "dark:bg-gray-900 dark:text-gray-200"
        )}
      >
        <div className={cx("flex flex-col items-center justify-center", "w-full max-w-xl")}>
          <nav className="sticky w-full py-4">
            <div className="flex items-center justify-between">
              <Link to="/">
                <div className="flex items-center justify-center">
                  <img className="h-7 w-7" src="/logo.svg" alt="logo" />
                </div>
              </Link>
              <div className="flex items-center justify-center space-x-3">
                <button
                  className={cx(
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
                <button
                  type="button"
                  aria-label="open modal"
                  onClick={() => setIsOpenModal(!isOpenModal)}
                >
                  <img
                    className="h-8 w-8 cursor-pointer rounded-full"
                    src={user.profileImageUrl}
                    alt="user profile"
                  />
                </button>
              </div>
            </div>
          </nav>
          <main className="my-4 flex w-full flex-col items-center justify-center">{children}</main>
        </div>
      </div>
      {isOpenModal ? (
        <AnimatePresence key={user.username} mode="wait">
          <m.div
            transition={{ duration: 0.2 }}
            variants={popUpModal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cx(
              "fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)]",
              "max-h-full w-full items-center justify-center",
              "overflow-y-auto overflow-x-hidden p-4",
              "backdrop-blur-sm",
              "md:inset-0"
            )}
          >
            <div className="relative max-h-full w-full max-w-md">
              <div className={cx("relative rounded-lg bg-white shadow", "dark:bg-gray-800")}>
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
                      "transition-all ease-in-out",
                      "hover:bg-gray-200 hover:text-gray-900",
                      "dark:hover:bg-gray-700 dark:hover:text-white"
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
                  <h4 className="font-inter text-2xl">{user.fullName}</h4>
                  <div className="mt-1 flex flex-col items-center justify-center">
                    <span>
                      <span className="font-bold">Email: </span>{" "}
                      {user.primaryEmailAddress?.emailAddress}
                    </span>
                    <span>
                      <span className="font-bold">Last Login: </span>
                      {format(new Date(user.lastSignInAt as Date), "dd LLLL yyyy, HH:MM:SS", {
                        locale: id,
                      })}
                    </span>
                  </div>
                </div>
                <div
                  className={cx(
                    "flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 p-6",
                    "dark:border-gray-600"
                  )}
                >
                  <Button
                    className="flex items-center space-x-2 px-3 py-2"
                    variant="primary"
                    label="sign out"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </m.div>
        </AnimatePresence>
      ) : null}
    </>
  );
}
