import clsx from "clsx";
import { IconType } from "react-icons";
import { HiArrowPath, HiBookmark, HiTrash } from "react-icons/hi2";
import useAgendaStore from "../../store";
import { AgendaProps } from "../../types";
import Button from "../Button";

type ButtonsListProps = {
  id: number;
  variant: "primary" | "secondary" | "danger";
  label: "delete" | "edit" | "archive";
  onClick: (id: string) => void;
  icon: IconType;
}[];

const AgendaCard = ({ item }: { item: AgendaProps }) => {
  const { agenda, setAgenda, archive, setArchive, setFormData, setIsUpdate } = useAgendaStore(
    (state) => state
  );

  /**
   * Delete a agenda that user specify
   */
  const handleDeleteAgenda = (id: string) => {
    const data = [...agenda];
    const filteredData = data.filter((item) => item.id !== id);

    setAgenda(filteredData);
  };

  /**
   * Edit agenda based on id
   */
  const handleEditAgenda = (id: string) => {
    const data = [...agenda];
    const foundData = data.find((item) => item.id === id);

    setIsUpdate({ id: id, status: true });
    setFormData({
      judul: foundData?.judul as string,
      keterangan: foundData?.keterangan as string,
    });
  };

  /**
   * Archive an agenda that user specify
   */
  const handleArchiveAgenda = (id: string) => {
    const agendaData = [...agenda];
    const archiveData = [...archive];

    handleDeleteAgenda(id);

    const foundAgenda = agendaData.find((item) => item.id === id);

    archiveData.push({
      id: foundAgenda?.id as string,
      judul: foundAgenda?.judul as string,
      keterangan: foundAgenda?.keterangan as string,
      date: foundAgenda?.date as string,
    });
    setArchive(archiveData);
  };

  const buttonsList: ButtonsListProps = [
    {
      id: 1,
      variant: "danger",
      label: "delete",
      onClick: (id: string) => handleDeleteAgenda(id),
      icon: HiTrash,
    },
    {
      id: 2,
      variant: "secondary",
      label: "edit",
      onClick: (id: string) => handleEditAgenda(id),
      icon: HiArrowPath,
    },
    {
      id: 3,
      variant: "primary",
      label: "archive",
      onClick: (id: string) => handleArchiveAgenda(id),
      icon: HiBookmark,
    },
  ];

  return (
    <div
      className={clsx(
        "flex cursor-pointer flex-col justify-start shadow-sm",
        "rounded-md border border-gray-300 p-3",
        "transition-all ease-in-out",
        "hover:scale-105",
        "dark:border-white"
      )}
    >
      <div className="flex w-full items-center justify-end space-x-2">
        <span className="font-semibold">{item.date}</span>
        <div className="flex items-center">
          <input
            type="checkbox"
            className={clsx(
              "h-4 w-4 cursor-pointer rounded",
              "border-gray-300 bg-gray-100 text-blue-600",
              "focus:ring-2 focus:ring-blue-500",
              "dark:border-gray-600 dark:bg-gray-700",
              "dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            )}
          />
        </div>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold">{item.judul}</span>
        <p className="my-3 font-medium">{item.keterangan}</p>
        <div className="flex items-center justify-start space-x-4">
          {buttonsList.map((button) => {
            const Icon: IconType = button.icon;
            return (
              <Button
                key={button.id}
                variant={button.variant}
                label={button.label}
                className="flex items-center space-x-2 px-3 py-2"
                onClick={() =>
                  button.label === "delete"
                    ? handleDeleteAgenda(item.id)
                    : button.label === "edit"
                    ? handleEditAgenda(item.id)
                    : handleArchiveAgenda(item.id)
                }
              >
                <span className="capitalize">{button.label}</span>
                <Icon size={22} />
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgendaCard;
