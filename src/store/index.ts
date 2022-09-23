import { atom } from "jotai";
import { initialFormData, initialIsUpdate, initialTodos } from "../utils/data";

export const todosAtom = atom(initialTodos);
export const formDataAtom = atom(initialFormData);
export const isUpdateAtom = atom(initialIsUpdate);
export const searchTodoAtom = atom<string>("");
