import { Event } from "./interfaces";
import { formDataAtom, isUpdateAtom, searchTodoAtom, todosAtom } from "./store";
import { useAtom } from "jotai";
import { FormEvent, useEffect } from "react";
import { nanoid } from "nanoid";
import Layout from "./components/layout";
import DarkModeButton from "./components/darkModeButton";
import Judul from "./components/judul";
import Keterangan from "./components/keterangan";
import ButtonSubmit from "./components/buttonSubmit";
import TidakAda from "./components/tidakAda";
import ListTodo from "./components/listTodo";
import Search from "./components/search";

type IndexTargetValue = Record<string, string> & {
  judul: string;
  keterangan: string;
};

const App = () => {
  const [todos, setTodos] = useAtom(todosAtom);
  const [searchTodo, setSearchTodo] = useAtom(searchTodoAtom);
  const [formData, setFormData] = useAtom(formDataAtom);
  const [isUpdate, setIsUpdate] = useAtom(isUpdateAtom);

  const saveTodos = <T,>(newTodos: T): void => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleChange = <T extends Event>(event: T): void => {
    const data: IndexTargetValue = { ...formData };
    data[event.target.name] = event.target.value;

    setFormData(data);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = [...todos];

    if (isUpdate.status) {
      data.forEach((item) => {
        if (item.id === isUpdate.id) {
          item.judul = formData.judul;
          item.keterangan = formData.keterangan;
        }
      });
    } else {
      data.push({
        id: nanoid(),
        judul: formData.judul,
        keterangan: formData.keterangan,
      });
    }

    setTodos(data);
    setIsUpdate({ id: null, status: false });
    setFormData({ judul: "", keterangan: "" });
    saveTodos(data);
  };

  const handleEdit = (id: null) => {
    const data = [...todos];
    const foundData: any = data.find((item) => item.id === id);

    setIsUpdate({ id: id, status: true });
    setFormData({ judul: foundData.judul, keterangan: foundData.keterangan });
    saveTodos(formData);
  };

  const handleDelete = (id: string) => {
    const data = [...todos];
    const filteredData = data.filter((item) => item.id !== id);

    setTodos(filteredData);
    saveTodos(filteredData);
  };

  const filteredTodos = todos.filter((item) => {
    if (item.judul === searchTodo) {
      return item;
    } else if (item.judul.toLowerCase().includes(searchTodo.toLowerCase())) {
      return item;
    }
  });

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos") || ""));
    }
  }, []);

  return (
    <Layout>
      <div className="flex justify-center items-center gap-3">
        <h1 className="font-bold text-4xl">Todo App</h1>
        <DarkModeButton />
      </div>
      <p className="font-medium mt-1">Apa agendamu hari ini?</p>
      <form className="my-6" onSubmit={(event) => handleSubmit(event)}>
        <div className="flex w-full justify-center items-center flex-col gap-4">
          <Judul handleChange={handleChange} formData={formData} />
          <Keterangan handleChange={handleChange} formData={formData} />
          <ButtonSubmit />
        </div>
      </form>
      <Search searchTodo={searchTodo} setSearchTodo={setSearchTodo} />
      {todos ? (
        filteredTodos.length ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4">
            <ListTodo
              todos={todos}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        ) : (
          <TidakAda />
        )
      ) : (
        <TidakAda />
      )}
    </Layout>
  );
};

export default App;
