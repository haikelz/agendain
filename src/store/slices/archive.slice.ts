import { createSlice } from "@reduxjs/toolkit";
import { initialArchiveData } from "../../utils/data";

const archiveSlice = createSlice({
  name: "archive",
  initialState: initialArchiveData,
  reducers: {
    addArchive(state, action) {
      const newArchive = {
        id: action.payload.id,
        judul: action.payload.judul,
        keterangan: action.payload.keterangan,
      };
      state.push(newArchive);
    },
    deleteArchive(state, action) {
      return state.filter((value) => value.id !== action.payload.id);
    },
  },
});

export const { addArchive, deleteArchive } = archiveSlice.actions;
export default archiveSlice.reducer;
