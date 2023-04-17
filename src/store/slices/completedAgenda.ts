import { StateCreator } from "zustand";

type CompletedAgendaProps = {
  isCompleted: boolean;
  setIsCompleted: (isCompleted: boolean) => void;
};

const completedAgenda: StateCreator<CompletedAgendaProps, [], [], CompletedAgendaProps> = (
  set
) => ({
  isCompleted: false,
  setIsCompleted: (isCompleted) => set({ isCompleted: isCompleted }),
});

export default completedAgenda;
