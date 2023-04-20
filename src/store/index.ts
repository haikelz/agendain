import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  AgendaSliceProps,
  ArchiveSliceProps,
  FormDataSliceProps,
  IsDoneSliceProps,
  IsUpdateSliceProps,
  SearchSliceProps,
} from "~/types";
import agendaSlice from "./slices/agendaSlice";
import archiveSlice from "./slices/archiveSlice";
import formDataSlice from "./slices/formDataSlice";
import isDoneSlice from "./slices/isDoneSlice";
import isUpdateSlice from "./slices/isUpdateSlice";
import { searchSlice } from "./slices/searchSlice";

const useAgendaStore = create<
  AgendaSliceProps &
    ArchiveSliceProps &
    FormDataSliceProps &
    IsUpdateSliceProps &
    IsDoneSliceProps &
    SearchSliceProps
>()(
  devtools(
    persist(
      (...set) => ({
        ...agendaSlice(...set),
        ...archiveSlice(...set),
        ...formDataSlice(...set),
        ...isUpdateSlice(...set),
        ...isDoneSlice(...set),
        ...searchSlice(...set),
      }),
      {
        name: "agenda",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useAgendaStore;
