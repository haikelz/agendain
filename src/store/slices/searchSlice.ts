import { StateCreator } from "zustand";
import { SearchSliceProps } from "~/types";

export const searchSlice: StateCreator<SearchSliceProps, [], [], SearchSliceProps> = (set) => ({
  search: "",
  setSearch: (search) => set({ search: search }),
});
