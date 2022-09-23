import { SearchTodo } from "src/interfaces";

const Search = ({ searchTodo, setSearchTodo }: SearchTodo) => {
  return (
    <input
      className="py-1 px-2 font-medium dark:bg-gray-700 border-[3px] border-blue-500 rounded-md"
      placeholder="Cari Todo...."
      value={searchTodo}
      onChange={(event) => setSearchTodo(event.target.value)}
    />
  );
};

export default Search;
