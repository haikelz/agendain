import { StateCreator } from "zustand";
import { IsDoneSliceProps } from "~/types";

const isDoneSlice: StateCreator<IsDoneSliceProps, [], [], IsDoneSliceProps> = (set) => ({
  isDone: false,
  setIsDone: (isDone) => set({ isDone: isDone }),
});

export default isDoneSlice;
