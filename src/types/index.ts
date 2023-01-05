import { ChangeEventHandler, ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type ListProps = {
  id: string;
  judul: string;
  keterangan: string;
};

export type FormDataProps = {
  formData: {
    judul: string;
    keterangan: string;
  };
  handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};
