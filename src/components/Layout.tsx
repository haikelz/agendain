import { useUser } from "@clerk/clerk-react";
import { AnimatePresence, m } from "framer-motion";
import { HiMoon, HiSun } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useDarkMode } from "~/hooks";
import { cx } from "~/lib/helpers/cx";
import { pageTransition } from "~/lib/utils/animations";
import useAgendaStore from "~/store";
import { ChildrenProps } from "~/types";
import Modal from "./Modal";

export default function Layout({ children }: ChildrenProps) {
  const [darkMode, setDarkMode] = useDarkMode();

  const { isLoaded, isSignedIn, user } = useUser();
  const { isOpenModal, setIsOpenModal } = useAgendaStore((state) => state);

  const location = useLocation();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <>
      <div className="dark:bg-gray-900 dark:text-gray-200">
        <div
          className={cx("flex min-h-screen items-start justify-center", "w-full max-w-full p-4")}
        >
          <div className={cx("flex flex-col items-center justify-center", "w-full max-w-xl")}>
            <nav className="sticky w-full py-4">
              <div className="flex items-center justify-between">
                <Link to="/">
                  <div className="flex items-center justify-center">
                    <img className="h-8 w-8" src="/logo.svg" alt="logo" />
                  </div>
                </Link>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    className={cx(
                      "rounded-md bg-gray-200 p-1.5",
                      "hover:bg-gray-300",
                      "dark:bg-gray-700 dark:hover:bg-gray-800"
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
                      loading="eager"
                    />
                  </button>
                </div>
              </div>
            </nav>
            <AnimatePresence mode="wait">
              <m.main
                variants={pageTransition}
                transition={{ duration: 0.4 }}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="my-4 flex w-full items-center justify-center"
              >
                {children}
              </m.main>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">{isOpenModal ? <Modal user={user} /> : null}</AnimatePresence>
    </>
  );
}
