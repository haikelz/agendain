import { HiBookmark, HiPencilSquare, HiTrash } from "react-icons/hi2";
import { IconType } from "react-icons/lib";

type ButtonsListProps = {
  id: number;
  variant: "primary" | "secondary" | "danger";
  label: "delete" | "edit" | "archive";
  icon: IconType;
}[];

export const buttonsList: ButtonsListProps = [
  {
    id: 1,
    variant: "danger",
    label: "delete",
    icon: HiTrash,
  },
  {
    id: 2,
    variant: "secondary",
    label: "edit",
    icon: HiPencilSquare,
  },
  {
    id: 3,
    variant: "primary",
    label: "archive",
    icon: HiBookmark,
  },
];
