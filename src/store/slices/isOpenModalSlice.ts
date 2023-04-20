import { StateCreator } from "zustand";
import { IsOpenModalSliceProps } from "~/types";

const isOpenModalSlice: StateCreator<
  IsOpenModalSliceProps,
  [],
  [],
  IsOpenModalSliceProps
> = () => ({
  isOpenModal: false,
  setIsOpenModal: (isOpenModal) => ({ isOpenModal: isOpenModal }),
});

export default isOpenModalSlice;
