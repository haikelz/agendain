import { StateCreator } from "zustand";
import { AgendaSliceProps } from "~/types";

const agendaSlice: StateCreator<AgendaSliceProps, [], [], AgendaSliceProps> = (set) => ({
  agenda: [],
  setAgenda: () => set((state) => ({ agenda: state.agenda })),
});

export default agendaSlice;
