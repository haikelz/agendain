import { HiMagnifyingGlass } from "react-icons/hi2";
import { cx } from "~/lib/helpers/cx";
import useAgendaStore from "~/store";

export function SearchInput() {
  const { search, setSearch } = useAgendaStore((state) => state);

  return (
    <div className="relative flex w-full items-center justify-center">
      <input
        type="search"
        className={cx(
          "relative w-full rounded-lg",
          "border border-gray-300 bg-gray-50",
          "p-2.5 pl-12",
          "text-sm text-gray-900",
          "focus:border-blue-500 focus:ring-blue-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400",
          "dark:focus:border-blue-500 dark:focus:ring-blue-500"
        )}
        placeholder="Cari...."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <HiMagnifyingGlass
        className="absolute left-4 h-5 w-5 text-gray-500 dark:text-gray-400"
        size={20}
      />
    </div>
  );
}
