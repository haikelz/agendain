import { StateCreator } from "zustand";
import { AgendaProps } from "~/types";

type ArchiveSliceProps = {
  archive: AgendaProps[];
  setArchive: (archive: AgendaProps[]) => void;
};

const archiveSlice: StateCreator<ArchiveSliceProps, [], [], ArchiveSliceProps> = (set) => ({
  archive: [],
  setArchive: (archive) => set({ archive: archive }),
});

export default archiveSlice;
