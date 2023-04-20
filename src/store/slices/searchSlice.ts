import { StateCreator } from "zustand";
import { SearchSliceProps } from "~/types";

const searchSlice: StateCreator<SearchSliceProps, [], [], SearchSliceProps> = (set) => ({
  search: "",
  setSearch: (search) => set({ search: search }),
});

export default searchSlice;
