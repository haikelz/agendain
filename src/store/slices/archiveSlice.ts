import { StateCreator } from "zustand";
import { ArchiveSliceProps } from "~/types";

const archiveSlice: StateCreator<ArchiveSliceProps, [], [], ArchiveSliceProps> = (set) => ({
  archive: [],
  setArchive: (archive) => set({ archive: archive }),
});

export default archiveSlice;
