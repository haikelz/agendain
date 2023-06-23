import { cx } from "class-variance-authority";
import { m } from "framer-motion";
import { memo } from "react";
import { IconType } from "react-icons";
import reactStringReplace from "react-string-replace";
import { shallow } from "zustand/shallow";
import { Button, CheckBox, Heading, Paragraph } from "~/components/atoms";
import { variants } from "~/lib/utils/animations";
import { buttonsList } from "~/lib/utils/data";
import useAgendaStore from "~/store";
import { AgendaProps } from "~/types";

type AgendaCardProps = {
  item: AgendaProps;
  search: string;
};

export function AgendaCard({ item, search }: AgendaCardProps) {
  const { agenda, setAgenda, archive, setArchive, setFormData, setIsUpdate } = useAgendaStore(
    (state) => ({
      agenda: state.agenda,
      setAgenda: state.setAgenda,
      archive: state.archive,
      setArchive: state.setArchive,
      setFormData: state.setFormData,
      setIsUpdate: state.setIsUpdate,
    }),
    shallow
  );

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
    const foundAgenda = agendaData.find((item) => item.id === id);

    handleDeleteAgenda(id);
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
    <m.div
      variants={variants.leftToRight}
      transition={{ duration: 0.3 }}
      initial="hidden"
      animate="visible"
      className={cx(
        "flex flex-col justify-start shadow-sm",
        "rounded-md border border-gray-300 p-3",
        "dark:border-gray-500 dark:bg-gray-800"
      )}
    >
      <div className="flex w-full items-center justify-end space-x-2">
        <span className="font-semibold">{item.date}</span>
        <div className="flex items-center">
          <CheckBox
            name={item.judul}
            onChange={(event) =>
              setAgenda(
                agenda.map((item) =>
                  item.judul === event.target.name
                    ? { ...item, isDone: event.target.checked }
                    : item
                )
              )
            }
            checked={item.isDone}
          />
        </div>
      </div>
      <div className="mt-2">
        <Heading as="h3" align="start" size="2xl" className={item.isDone ? "line-through" : ""}>
          {reactStringReplace(item.judul, search, (match: string, index: number) => (
            <span className="bg-yellow-300" key={index + 1}>
              {match}
            </span>
          ))}
        </Heading>
        <Paragraph className={cx("my-3", item.isDone ? "line-through" : "")}>
          {item.keterangan}
        </Paragraph>
        <div className="flex items-center justify-start space-x-4">
          {buttonsList.map((button) => {
            const Icon: IconType = button.icon;
            return (
              <Button
                intent={
                  button.label === "delete"
                    ? "danger"
                    : button.label === "edit"
                    ? "secondary"
                    : "primary"
                }
                key={button.id}
                label={button.label}
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
    </m.div>
  );
}

memo(AgendaCard);
