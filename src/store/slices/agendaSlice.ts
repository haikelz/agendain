import { StateCreator } from "zustand";
import { AgendaSliceProps } from "~/types";

const agendaSlice: StateCreator<AgendaSliceProps, [], [], AgendaSliceProps> = (set) => ({
  agenda: [],
  setAgenda: (agenda) => set({ agenda: agenda }),
});

export default agendaSlice;
