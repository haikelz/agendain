import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { addArchive } from "../../store/slices/archive.slice";
import { deleteTodo } from "../../store/slices/todos.slice";
import { ListProps } from "../../types";
import { memo } from "react";

type ListTodosProps = {
  todo: ListProps;
  dispatch: Dispatch<AnyAction>;
  // handleEdit: (id: string, judul: string, keterangan: string) => void;
};

const ListTods = ({ todo, dispatch /*handleEdit*/ }: ListTodosProps) => {
  const { id, judul, keterangan } = todo;

  const handleArchive = <T extends string>(id: T, judul: T, keterangan: T) => {
    dispatch(addArchive({ id: id, judul: judul, keterangan: keterangan }));
    dispatch(deleteTodo({ id: id }));
  };

  return (
    <div className="flex border-[3px] hover:scale-105 ease-in-out transition-all border-black dark:border-white rounded-md justify-start flex-col p-3 cursor-pointer">
      <div className="flex justify-end items-end gap-3">
        <div className="bg-red-500 p-2 rounded-full"></div>
        <div className="bg-yellow-500 p-2 rounded-full"></div>
        <div className="bg-blue-500 p-2 rounded-full"></div>
      </div>
      <div className="mt-4">
        <h1 className="font-bold text-2xl">{judul}</h1>
        <p className="font-medium mt-3">{keterangan}</p>
        <div className="flex mt-3 gap-4">
          <button
            className="bg-red-300 dark:bg-red-400 hover:bg-red-400 dark:hover:bg-red-500 p-2.5 rounded-md shadow-md"
            onClick={() => dispatch(deleteTodo({ id: id }))}
          >
            Delete
          </button>
          <button
            className="bg-red-300 dark:bg-red-400 hover:bg-red-400 dark:hover:bg-red-500 p-2.5 rounded-md shadow-md"
            onClick={() => handleArchive(id, judul, keterangan)}
          >
            Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ListTods);
