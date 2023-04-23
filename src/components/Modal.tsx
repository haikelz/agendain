import { useClerk, useUser } from "@clerk/clerk-react";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { m } from "framer-motion";
import { HiXMark } from "react-icons/hi2";
import { cx } from "~/lib/helpers/cx";
import { variants } from "~/lib/utils/animations";
import useAgendaStore from "~/store";
import Button from "./Button";

/**
 * If we hover user type, we will get `UserResource` type.
 * But why we can't import it from clerk?
 * @see https://github.com/clerkinc/javascript/issues/116
 */
type ModalProps = {
  user: NonNullable<ReturnType<typeof useUser>["user"]>;
};

export default function Modal({ user }: ModalProps) {
  const setIsOpenModal = useAgendaStore((state) => state.setIsOpenModal);

  const { signOut } = useClerk();

  function handleSignOut() {
    setIsOpenModal(false);
    signOut();
  }

  return (
    <m.div
      transition={{ duration: 0.2 }}
      variants={variants.popUpModal}
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
                "text-sm",
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
              className="h-60 w-60 rounded-full border-[3px] border-blue-600"
              src={user.profileImageUrl}
              alt="user profile"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="my-3 flex flex-col items-center justify-center">
            <h4 className="text-2xl">{user.fullName}</h4>
            <div className="mt-1 flex flex-col items-center justify-center">
              <span>
                <span className="font-bold">Email: </span> {user.primaryEmailAddress?.emailAddress}
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
              "flex items-center justify-end",
              "space-x-2 rounded-b",
              "border-t border-gray-200 p-6",
              "dark:border-gray-600"
            )}
          >
            <Button
              className="flex items-center space-x-2 px-3 py-2"
              variant="primary"
              label="sign out"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </m.div>
  );
}
