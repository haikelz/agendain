import { StateCreator } from "zustand";
import { AgendaProps } from "~/types";

type AgendaSliceProps = {
  agenda: AgendaProps[];
  setAgenda: (agenda: AgendaProps[]) => void;
};

const agendaSlice: StateCreator<AgendaSliceProps, [], [], AgendaSliceProps> = (set) => ({
  agenda: [],
  setAgenda: (agenda) => set({ agenda: agenda }),
});

export default agendaSlice;
