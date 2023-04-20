import { IconType } from "react-icons";
import reactStringReplace from "react-string-replace";
import Button from "~/components/Button";
import { cx } from "~/lib/helpers/cx";
import { buttonsList } from "~/lib/utils/data";
import useAgendaStore from "~/store";
import { AgendaProps } from "~/types";

export function AgendaCard({ item }: { item: AgendaProps }) {
  const { agenda, setAgenda, archive, setArchive, setFormData, setIsUpdate, search } =
    useAgendaStore((state) => state);

  function handleDeleteAgenda(id: string) {
    const data = [...agenda];
    const filteredData = data.filter((item) => item.id !== id);

    setAgenda(filteredData);
  }

  function handleEditAgenda(id: string) {
    const data = [...agenda];
    const foundData = data.find((item) => item.id === id);

    setIsUpdate({ id: id, status: true });
    setFormData({
      judul: foundData?.judul as string,
      keterangan: foundData?.keterangan as string,
    });
  }

  function handleArchiveAgenda(id: string) {
    const agendaData = [...agenda];
    const archiveData = [...archive];

    handleDeleteAgenda(id);

    const foundAgenda = agendaData.find((item) => item.id === id);

    archiveData.push({
      id: foundAgenda?.id as string,
      judul: foundAgenda?.judul as string,
      keterangan: foundAgenda?.keterangan as string,
      date: foundAgenda?.date as string,
      isDone: foundAgenda?.isDone as boolean,
    });
    setArchive(archiveData);
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
        <div className="flex items-center">
          <input
            name={item.judul}
            type="checkbox"
            className={cx(
              "h-4 w-4 cursor-pointer rounded",
              "border-gray-300 bg-gray-100 text-blue-700",
              "focus:ring-2 focus:ring-blue-600",
              "dark:border-gray-600 dark:bg-gray-700",
              "dark:ring-offset-gray-800 dark:focus:ring-blue-700"
            )}
            onChange={(event) =>
              setAgenda(
                agenda.map((value) =>
                  value.judul === event.target.name
                    ? { ...value, isDone: event.target.checked }
                    : value
                )
              )
            }
            checked={item.isDone}
          />
        </div>
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
}
