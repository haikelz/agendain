import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  AgendaSliceProps,
  ArchiveSliceProps,
  FormDataSliceProps,
  IsDoneSliceProps,
  IsOpenModalSliceProps,
  IsUpdateSliceProps,
} from "~/types";
import agendaSlice from "./slices/agendaSlice";
import archiveSlice from "./slices/archiveSlice";
import formDataSlice from "./slices/formDataSlice";
import isDoneSlice from "./slices/isDoneSlice";
import isOpenModalSlice from "./slices/isOpenModalSlice";
import isUpdateSlice from "./slices/isUpdateSlice";

/**
 * Slice the store into smaller stores
 * @see https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md
 */
const useAgendaStore = create<
  AgendaSliceProps &
    ArchiveSliceProps &
    FormDataSliceProps &
    IsUpdateSliceProps &
    IsDoneSliceProps &
    IsOpenModalSliceProps
>()(
  devtools(
    persist(
      (...set) => ({
        ...agendaSlice(...set),
        ...archiveSlice(...set),
        ...formDataSlice(...set),
        ...isUpdateSlice(...set),
        ...isDoneSlice(...set),
        ...isOpenModalSlice(...set),
      }),
      {
        name: "agenda",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useAgendaStore;
