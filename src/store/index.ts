import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./slices/todos.slice";
import archiveSlice from "./slices/archive.slice";

const store = configureStore({
  reducer: {
    todos: todosSlice,
    archive: archiveSlice,
  },
});

export default store;
