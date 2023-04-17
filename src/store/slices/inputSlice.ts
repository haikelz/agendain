import { StateCreator } from "zustand";
import { InputSliceProps } from "../../types";

const inputSlice: StateCreator<InputSliceProps, [], [], InputSliceProps> = (set) => ({
  judul: "",
  setJudul: (judul: string) => set({ judul: judul }),
  keterangan: "",
  setKeterangan: (keterangan: string) => set({ keterangan: keterangan }),
});

export default inputSlice;
