import { StateCreator } from "zustand";
import { IsUpdateSliceProps } from "../../types";

const isUpdateSlice: StateCreator<IsUpdateSliceProps, [], [], IsUpdateSliceProps> = (set) => ({
  isUpdate: {
    id: "",
    status: false,
  },
  setIsUpdate: (isUpdate) => set({ isUpdate: isUpdate }),
});

export default isUpdateSlice;
