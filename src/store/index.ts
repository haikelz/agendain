import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AgendaSliceProps, ArchiveSliceProps, FormDataSliceProps, InputSliceProps } from "../types";
import agendaSlice from "./slices/agendaSlice";
import archiveSlice from "./slices/archiveSlice";
import formDataSlice from "./slices/formDataSlice";
import inputSlice from "./slices/inputSlice";

const useAgendaStore = create<
  AgendaSliceProps & ArchiveSliceProps & FormDataSliceProps & InputSliceProps
>()(
  persist(
    (...set) => ({
      ...agendaSlice(...set),
      ...archiveSlice(...set),
      ...formDataSlice(...set),
      ...inputSlice(...set),
    }),
    {
      name: "agenda",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAgendaStore;
