import { StateCreator } from "zustand";
import { FormDataSliceProps } from "~/types";

const formDataSlice: StateCreator<FormDataSliceProps, [], [], FormDataSliceProps> = (set) => ({
  formData: {
    judul: "",
    keterangan: "",
  },
  setFormData: (formData) => set({ formData: formData }),
});

export default formDataSlice;
