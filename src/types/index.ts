import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

type BaseProps = {
  judul: string;
  keterangan: string;
};

// agenda, archive props
export type AgendaProps = BaseProps & {
  id: string;
  date: string;
  isDone: boolean;
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

// slice props
export type IsDoneSliceProps = {
  isDone: boolean;
  setIsDone: (isDone: boolean) => void;
};

export type SearchSliceProps = {
  search: string;
  setSearch: (search: string) => void;
};

export type IsOpenModalSliceProps = {
  isOpenModal: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
};

export type DarkModeSliceProps = {
  darkMode: string;
  setDarkMode: (darkMode: string) => void;
};
