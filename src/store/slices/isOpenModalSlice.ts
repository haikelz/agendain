import { StateCreator } from "zustand";
import { IsOpenModalSliceProps } from "~/types";

const isOpenModalSlice: StateCreator<IsOpenModalSliceProps, [], [], IsOpenModalSliceProps> = (
  set
) => ({
  isOpenModal: false,
  setIsOpenModal: (isOpenModal) => set({ isOpenModal: isOpenModal }),
});

export default isOpenModalSlice;
