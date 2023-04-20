import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdSearch } from "react-icons/md";
import { cx } from "~/lib/helpers/cx";
import useAgendaStore from "~/store";

export function SearchInput() {
  const { search, setSearch } = useAgendaStore();

  return (
    <div className="relative flex w-full items-center justify-center">
      <input
        type="search"
        className={cx(
          "relative w-full bg-gray-50 px-2 py-1.5 pl-12 font-medium",
          "rounded-md border border-gray-300",
          "transition-all ease-in-out",
          "focus:ring-2 focus:ring-blue-600",
          "dark:border-gray-500 dark:bg-gray-800"
        )}
        placeholder="Cari...."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <HiMagnifyingGlass className="absolute  left-4 text-gray-900 dark:text-gray-500" size={20} />
    </div>
  );
}
