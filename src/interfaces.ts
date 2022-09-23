import { SetStateAction } from "jotai";
import { ChangeEventHandler, ReactNode } from "react";

export interface Event {
  target: {
    value: string;
    name: string;
  };
  preventDefault: () => void;
}

export interface Todos {
  todos: {
    id: string | any;
    judul: string;
    keterangan: string;
  }[];
  handleEdit: (id: null) => void;
  handleDelete: (id: string) => void;
}

export interface SearchTodo {
  searchTodo: string;
  setSearchTodo: (update: SetStateAction<string>) => void;
}

export interface Children {
  children: ReactNode[] | JSX.Element;
}

export interface Event {
  target: {
    value: string;
    name: string;
  };
  preventDefault: () => void;
}

export interface FormData {
  formData: {
    judul: string;
    keterangan: string;
  };
  handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}
