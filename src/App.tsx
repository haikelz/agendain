import { nanoid } from "nanoid";
import { FormEvent, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonSubmit } from "./components/buttonSubmit";
import { DarkModeButton } from "./components/darkModeButton";
import { Judul } from "./components/judul";
import { Keterangan } from "./components/keterangan";
import Layout from "./components/layout";
import ListArchive from "./components/listArchive";
import ListTodo from "./components/listTodos";
import { Search } from "./components/search";
import TidakAda from "./components/tidakAda";
import { useFilter } from "./hooks/useFilter";
import { addTodo } from "./store/slices/todos.slice";
import { ListProps } from "./types";
import { initialFormData } from "./utils/data";

type IndexTargetValue = Record<string, string> & {
  judul: string;
  keterangan: string;
};

type EventProps = {
  target: {
    value: string;
    name: string;
  };
  preventDefault: () => void;
};

const App = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state: { todos: [ListProps] }) => state.todos);
  const archive = useSelector(
    (state: { archive: [ListProps] }) => state.archive
  );

  const handleChange = <T extends EventProps>(event: T) => {
    const data: IndexTargetValue = { ...formData };
    data[event.target.name] = event.target.value;

    setFormData(data);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      addTodo({
        id: nanoid(),
        judul: formData.judul,
        keterangan: formData.keterangan,
      })
    );
    setFormData({ judul: "", keterangan: "" });
  };

  const filteredTodos = useMemo(
    () => useFilter(todos, search),
    [todos, search]
  );

  const filteredArchive = useMemo(
    () => useFilter(archive, search),
    [archive, search]
  );

  /*
  TODO: edit feature
  const handleEdit = (id: string, judul: string, keterangan: string) => {
    const foundData = dispatch(
      editTodo({ id: id, judul: judul, keterangan: keterangan })
    );

    setFormData({
      judul: foundData.payload.judul,
      keterangan: foundData.payload.keterangan,
    });
  };*/

  return (
    <Layout>
      <div className="flex justify-center items-center gap-3">
        <h1 className="font-bold text-4xl">Todo App</h1>
        <DarkModeButton />
      </div>
      <p className="font-medium mt-1">Apa agendamu hari ini?</p>
      <form className="my-6" onSubmit={handleSubmit}>
        <div className="flex w-full justify-center items-center flex-col gap-4">
          <Judul handleChange={handleChange} formData={formData} />
          <Keterangan handleChange={handleChange} formData={formData} />
          <ButtonSubmit />
        </div>
      </form>
      <Search search={search} setSearch={setSearch} />
      <div
        className={`mt-6 flex flex-col justify-center ${
          filteredTodos.length ? "" : "items-center"
        } w-full`}
      >
        <h2 className="font-bold text-center text-2xl">Todos</h2>
        {filteredTodos.length ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4">
            {filteredTodos.map((todo, index) => (
              <ListTodo
                key={index + 1}
                todo={todo}
                dispatch={dispatch}
                // handleEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <TidakAda />
        )}
      </div>
      <div
        className={`mt-6 flex flex-col justify-center ${
          filteredArchive.length ? "" : "items-center"
        } w-full`}
      >
        <h2 className="font-bold text-center text-2xl">Archive</h2>
        {filteredArchive.length ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4">
            {filteredArchive.map((arc, index) => (
              <ListArchive key={index + 1} arc={arc} dispatch={dispatch} />
            ))}
          </div>
        ) : (
          <TidakAda />
        )}
      </div>
    </Layout>
  );
};

export default App;
