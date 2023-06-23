import { cx } from "class-variance-authority";
import { SetStateAction } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

type SearchInputProps = {
  search: string;
  setSearch: (search: SetStateAction<string>) => void;
};

export function SearchInput({ search, setSearch }: SearchInputProps) {
  return (
    <div className="relative flex w-full items-center justify-center">
      <input
        type="search"
        className={cx(
          "block w-full rounded-lg",
          "border border-gray-300 bg-gray-50",
          "p-2.5 pl-12 text-sm text-gray-900",
          "focus:border-cyan-500 focus:ring-cyan-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:border-gray-600 dark:bg-gray-700 dark:text-white",
          "dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
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
