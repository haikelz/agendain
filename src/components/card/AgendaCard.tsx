import clsx from "clsx";
import { SyntheticEvent, memo } from "react";
import useAgendaStore from "../../store";
import { AgendaProps } from "../../types";
import Button from "../Button";

export const AgendaCard = ({ item }: { item: AgendaProps }) => {
  const { agenda, setAgenda, archive, setArchive, formData, setFormData } = useAgendaStore();

  /**
   * Delete a agenda that user specify
   */
  const handleDeleteAgenda = (id: string) => {
    const data = [...agenda];
    const filteredData = data.filter((item) => item.id !== id);

    setAgenda(filteredData);
    console.log(filteredData);
  };

  /**
   * Archive a agenda that user specify
   */
  const handleArchive = (id: string) => {
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

  const handleEditAgenda = (event: SyntheticEvent) => {
    const data = { ...formData };
    data[event.target.name] = event.target.value;
    setFormData(data);
  };

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
      <div className="flex items-end justify-end space-x-3">
        <div className="rounded-full bg-red-500 p-2"></div>
        <div className="rounded-full bg-yellow-500 p-2"></div>
        <div className="rounded-full bg-blue-500 p-2"></div>
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{item.judul}</h1>
        <p className="my-3 font-medium">{item.keterangan}</p>
        <div className="flex items-center justify-between">
          <div className="items-center justify-center space-x-4">
            <Button
              variant="danger"
              label="delete"
              className="px-3 py-2"
              onClick={() => handleDeleteAgenda(item.id)}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              className="px-3 py-2"
              label="Edit agenda"
              onClick={handleEditAgenda}
            >
              Edit
            </Button>
            <Button
              variant="primary"
              label="archive"
              className="px-3 py-2"
              onClick={() => handleArchive(item.id)}
            >
              Archive
            </Button>
          </div>
          <span className="font-semibold">{item.date}</span>
        </div>
      </div>
    </div>
  );
};

memo(AgendaCard);
