import { createSlice } from "@reduxjs/toolkit";
import { initialTodos } from "../../utils/data";

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialTodos,
  reducers: {
    addTodo(state, action) {
      const newTodo = {
        id: action.payload.id,
        judul: action.payload.judul,
        keterangan: action.payload.keterangan,
      };
      state.push(newTodo);
    },
    deleteTodo(state, action) {
      return state.filter((value) => value.id !== action.payload.id);
    },
    editTodo(state, action) {
      return state.map((value) =>
        value.id === action.payload.id ? action.payload : value
      );
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todosSlice.actions;
export default todosSlice.reducer;
