import clsx from "clsx";
import { HiArrowPath, HiTrash } from "react-icons/hi2";
import useAgendaStore from "../../store";
import { AgendaProps } from "../../types";
import Button from "../Button";

const ArchiveCard = ({ item }: { item: AgendaProps }) => {
  const { agenda, archive, setArchive, setAgenda } = useAgendaStore((state) => state);

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
      <div className="flex w-full items-center justify-end">
        <span className="font-semibold">{item.date}</span>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold">{item.judul}</span>
        <p className="my-3 font-medium">{item.keterangan}</p>
        <div className="flex items-center justify-start space-x-4">
          <Button
            variant="danger"
            label="delete"
            className="flex items-center space-x-2 px-3 py-2"
            onClick={() => handleDeleteArchive(item.id)}
          >
            <span>Delete</span>
            <HiTrash size={22} />
          </Button>
          <Button
            variant="primary"
            label="archive"
            className="flex items-center space-x-2 px-3 py-2"
            onClick={() => handleUndoArchive(item.id)}
          >
            <span>Undo Archive</span>
            <HiArrowPath size={22} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveCard;
