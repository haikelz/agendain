import { SetStateAction } from "react";
import { MdSearch } from "react-icons/md";
import { cx } from "~/lib/helpers/cx";

type SearchProps = {
  search: string;
  setSearch: (update: SetStateAction<string>) => void;
};

export const Search = ({ search, setSearch }: SearchProps) => {
  return (
    <div className="relative flex items-center justify-center">
      <input
        type="search"
        className={cx(
          "relative w-96 bg-gray-50 px-2 py-1.5 pl-12 font-medium",
          "rounded-md border border-gray-300",
          "transition-all ease-in-out",
          "focus:ring-2 focus:ring-blue-500",
          "dark:border-gray-500 dark:bg-gray-800"
        )}
        placeholder="Cari...."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <MdSearch className="absolute left-4 text-gray-500" size={20} />
    </div>
  );
};
