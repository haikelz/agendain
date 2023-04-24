import { useUser } from "@clerk/clerk-react";
import { Tooltip } from "flowbite-react";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useDarkMode } from "~/hooks";
import { cx } from "~/lib/helpers/cx";
import { variants } from "~/lib/utils/animations";
import useAgendaStore from "~/store";
import { ChildrenProps } from "~/types";
import Modal from "./Modal";

export default function Layout({ children }: ChildrenProps) {
  const [darkMode, setDarkMode] = useDarkMode();
  const [isOnClick, setIsOnClick] = useState<boolean>(false);

  const { notMove, pageTransition, toTop } = variants;
  const { isLoaded, isSignedIn, user } = useUser();
  const { isOpenModal, setIsOpenModal } = useAgendaStore(
    (state) => ({
      isOpenModal: state.isOpenModal,
      setIsOpenModal: state.setIsOpenModal,
    }),
    shallow
  );

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  function handleClick() {
    setDarkMode(darkMode === "light" ? "dark" : "light");
    setIsOnClick(true);
  }

  return (
    <>
      <div className={cx("flex min-h-screen items-start justify-center", "w-full max-w-full p-4")}>
        <div className={cx("flex flex-col items-center justify-center", "w-full max-w-xl")}>
          <nav className="sticky w-full py-4">
            <div className="flex items-center justify-between">
              <Link to="/">
                <div className="flex items-center justify-center">
                  <img className="h-8 w-8" src="/logo.svg" alt="logo" />
                </div>
              </Link>
              <div className="flex items-center justify-center space-x-3">
                <Tooltip content={darkMode === "dark" ? "Dark" : "Light"} trigger="hover">
                  <button
                    className={cx(
                      "overflow-hidden rounded-md bg-gray-200 p-1.5",
                      "hover:bg-gray-300",
                      "dark:bg-gray-700 dark:hover:bg-gray-800"
                    )}
                    type="button"
                    aria-label="change mode theme"
                    onClick={handleClick}
                  >
                    <AnimatePresence mode="wait">
                      <m.div
                        key={darkMode}
                        variants={isOnClick === true ? toTop : notMove}
                        initial="hidden"
                        animate="visible"
                      >
                        {darkMode === "dark" ? <HiSun size={19} /> : <HiMoon size={19} />}
                      </m.div>
                    </AnimatePresence>
                  </button>
                </Tooltip>
                <button
                  type="button"
                  aria-label="open modal"
                  onClick={() => setIsOpenModal(!isOpenModal)}
                >
                  <img
                    className={cx(
                      "h-8 w-8",
                      "cursor-pointer rounded-full",
                      "transition-all ease-in-out",
                      "hover:border-2 hover:border-blue-600"
                    )}
                    src={user.profileImageUrl}
                    alt="user profile"
                    loading="eager"
                  />
                </button>
              </div>
            </div>
          </nav>
          <m.main
            variants={pageTransition}
            transition={{ duration: 0.3 }}
            initial="hidden"
            animate="visible"
            className="my-4 flex w-full items-center justify-center"
          >
            {children}
          </m.main>
        </div>
      </div>
      <AnimatePresence mode="wait">{isOpenModal ? <Modal user={user} /> : null}</AnimatePresence>
    </>
  );
}
