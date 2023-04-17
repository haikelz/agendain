import clsx from "clsx";
import useAgendaStore from "../../store";
import { AgendaProps } from "../../types";
import Button from "../Button";

export const ArchiveCard = ({ item }: { item: AgendaProps }) => {
  const { id, judul, keterangan } = item;
  const { agenda, archive, setArchive, setAgenda } = useAgendaStore();

  const handleDeleteArchive = (id: string) => {
    const data = [...archive];

    const filteredArchive = data.filter((item) => item.id !== id);
    setArchive(filteredArchive);
  };

  const handleUndoArchive = (id: string) => {
    const agendaData = [...agenda];
    const archiveData = [...archive];

    handleDeleteArchive(id);

    const foundArchive = archiveData.find((item) => item.id === id);

    agendaData.push({
      id: foundArchive?.id as string,
      judul: foundArchive?.judul as string,
      keterangan: foundArchive?.keterangan as string,
      date: foundArchive?.date as string,
    });
    setAgenda(agendaData);
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
              onClick={() => handleDeleteArchive(item.id)}
            >
              Delete
            </Button>

            <Button
              variant="primary"
              label="archive"
              className="px-3 py-2"
              onClick={() => handleUndoArchive(item.id)}
            >
              Undo Archive
            </Button>
          </div>
          <span className="font-semibold">{item.date}</span>
        </div>
      </div>
    </div>
  );
};
