import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

type BaseProps = {
  judul: string;
  keterangan: string;
};

export type AgendaProps = BaseProps & {
  id: string;
  date: string;
};

export type AgendaSliceProps = {
  agenda: AgendaProps[];
  setAgenda: (agenda: AgendaProps[]) => void;
};

export type ArchiveSliceProps = {
  archive: AgendaProps[];
  setArchive: (archive: AgendaProps[]) => void;
};

export type FormDataSliceProps = {
  formData: FormDataProps;
  setFormData: (formData: FormDataProps) => void;
};

export type FormDataProps = BaseProps;

export type InputSliceProps = BaseProps & {
  setJudul: (judul: string) => void;
  setKeterangan: (keterangan: string) => void;
};

export type IsUpdateSliceProps = {
  isUpdate: {
    id: string;
    status: boolean;
  };
  setIsUpdate: (isUpdate: { id: string; status: boolean }) => void;
};

export type IndexTargetValueProps = Record<string, string> & {
  judul: string;
  keterangan: string;
};

export type DoneAgendaSliceProps = {
  isDone: boolean;
  setIsDone: (isDone: boolean) => void;
};
