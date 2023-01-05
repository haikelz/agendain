import { SetStateAction, memo } from "react";

type Search = {
  search: string;
  setSearch: (update: SetStateAction<string>) => void;
};

export const Search = ({ search, setSearch }: Search) => {
  return (
    <input
      className="py-1 px-2 font-medium dark:bg-gray-700 border-[3px] border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500"
      placeholder="Cari Todo...."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
};

memo(Search);
