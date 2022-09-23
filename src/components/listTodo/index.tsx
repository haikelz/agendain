import { Todos } from "src/interfaces";

const ListTodo = ({ todos, handleEdit, handleDelete }: Todos) => {
  return (
    <>
      {todos.map((todo, index) => (
        <div
          className="flex border-[3px] border-black dark:border-white rounded-md justify-start flex-col p-3"
          key={index + 1}
        >
          <div className="flex justify-end items-end gap-3">
            <div className="bg-red-500 p-2 rounded-full"></div>
            <div className="bg-yellow-500 p-2 rounded-full"></div>
            <div className="bg-blue-500 p-2 rounded-full"></div>
          </div>
          <div className="mt-4">
            <h1 className="font-bold text-2xl">{todo.judul}</h1>
            <p className="font-medium mt-3">{todo.keterangan}</p>
            <div className="flex mt-3 gap-4">
              <button
                className="bg-red-300 dark:bg-red-400 hover:bg-red-400 dark:hover:bg-red-500 p-2.5 rounded-md shadow-md"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
              <button
                className="bg-red-300 dark:bg-red-400 hover:bg-red-400 dark:hover:bg-red-500 p-2.5 rounded-md shadow-md"
                onClick={() => handleEdit(todo.id)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListTodo;
