import { HiArrowPath, HiTrash } from "react-icons/hi2";
import reactStringReplace from "react-string-replace";
import Button from "~/components/Button";
import { cx } from "~/lib/helpers/cx";
import useAgendaStore from "~/store";
import { AgendaProps } from "~/types";

export function ArchiveCard({ item }: { item: AgendaProps }) {
  const { agenda, archive, setArchive, setAgenda, search } = useAgendaStore((state) => state);

  function handleDeleteArchive(id: string) {
    const data = [...archive];

    const filteredArchive = data.filter((item) => item.id !== id);
    setArchive(filteredArchive);
  }

  function handleUndoArchive(id: string) {
    const agendaData = [...agenda];
    const archiveData = [...archive];

    handleDeleteArchive(id);

    const foundArchive = archiveData.find((item) => item.id === id);

    agendaData.push({
      id: foundArchive?.id as string,
      judul: foundArchive?.judul as string,
      keterangan: foundArchive?.keterangan as string,
      date: foundArchive?.date as string,
      isDone: foundArchive?.isDone as boolean,
    });
    setAgenda(agendaData);
  }

  return (
    <div
      className={cx(
        "flex flex-col justify-start shadow-sm",
        "rounded-md border border-gray-300 p-3",
        "dark:border-gray-500 dark:bg-gray-800"
      )}
    >
      <div className="flex w-full items-center justify-end space-x-2">
        <span className="font-semibold">{item.date}</span>
        <input
          type="checkbox"
          className={cx(
            "h-4 w-4 cursor-pointer rounded",
            "border-gray-300 bg-gray-100 text-blue-700",
            "focus:ring-2 focus:ring-blue-600",
            "dark:border-gray-600 dark:bg-gray-700",
            "dark:ring-offset-gray-800 dark:focus:ring-blue-700"
          )}
          checked={item.isDone}
          readOnly
        />
      </div>
      <div className="mt-2">
        <h3 className={cx("text-2xl font-bold", item.isDone ? "line-through" : "")}>
          {reactStringReplace(item.judul, search, (match: string, index: number) => (
            <span className="bg-yellow-300" key={index + 1}>
              {match}
            </span>
          ))}
        </h3>
        <p className={cx("my-3 font-medium", item.isDone ? "line-through" : "")}>
          {item.keterangan}
        </p>
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
}
