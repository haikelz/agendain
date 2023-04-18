import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  AgendaSliceProps,
  ArchiveSliceProps,
  FormDataSliceProps,
  IsUpdateSliceProps,
} from "~/types";
import agendaSlice from "./slices/agendaSlice";
import archiveSlice from "./slices/archiveSlice";
import formDataSlice from "./slices/formDataSlice";
import isUpdateSlice from "./slices/isUpdateSlice";

const useAgendaStore = create<
  AgendaSliceProps & ArchiveSliceProps & FormDataSliceProps & IsUpdateSliceProps
>()(
  devtools(
    persist(
      (...set) => ({
        ...agendaSlice(...set),
        ...archiveSlice(...set),
        ...formDataSlice(...set),
        ...isUpdateSlice(...set),
      }),
      {
        name: "agenda",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useAgendaStore;
