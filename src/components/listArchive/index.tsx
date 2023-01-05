import { ListProps } from "../../types";
import { deleteArchive } from "../../store/slices/archive.slice";
import { addTodo } from "../../store/slices/todos.slice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { memo } from "react";

type ListArchiveProps = {
  arc: ListProps;
  dispatch: Dispatch<AnyAction>;
};

const ListArchive = ({ arc, dispatch }: ListArchiveProps) => {
  const { id, judul, keterangan } = arc;

  const handleUndoArchive = (id: string, judul: string, keterangan: string) => {
    dispatch(addTodo({ id: id, judul: judul, keterangan: keterangan }));
    dispatch(deleteArchive({ id: id }));
  };

  return (
    <div className="flex border-[3px] border-black dark:border-white rounded-md justify-start flex-col p-3 cursor-pointer">
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
            onClick={() => dispatch(deleteArchive({ id: id }))}
          >
            Delete
          </button>
          <button
            className="bg-red-300 dark:bg-red-400 hover:bg-red-400 dark:hover:bg-red-500 p-2.5 rounded-md shadow-md"
            onClick={() => handleUndoArchive(id, judul, keterangan)}
          >
            Undo Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ListArchive);
