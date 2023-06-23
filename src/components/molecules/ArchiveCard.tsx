import { cx } from "class-variance-authority";
import { m } from "framer-motion";
import { memo } from "react";
import { HiArrowPath, HiTrash } from "react-icons/hi2";
import reactStringReplace from "react-string-replace";
import { shallow } from "zustand/shallow";
import { Button, CheckBox, Heading, Paragraph } from "~/components/atoms";
import { variants } from "~/lib/utils/animations";
import useAgendaStore from "~/store";
import { AgendaProps } from "~/types";

type AgendaCardProps = {
  item: AgendaProps;
  search: string;
};

export function ArchiveCard({ item, search }: AgendaCardProps) {
  const { agenda, archive, setArchive, setAgenda } = useAgendaStore(
    (state) => ({
      agenda: state.agenda,
      archive: state.archive,
      setArchive: state.setArchive,
      setAgenda: state.setAgenda,
    }),
    shallow
  );

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
        <CheckBox checked={item.isDone} readOnly />
      </div>
      <div className="mt-2">
        <Heading as="h3" size="2xl" align="start" className={item.isDone ? "line-through" : ""}>
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
          <Button intent="danger" label="delete" onClick={() => handleDeleteArchive(item.id)}>
            <span>Delete</span>
            <HiTrash size={22} />
          </Button>
          <Button intent="primary" label="archive" onClick={() => handleUndoArchive(item.id)}>
            <span>Undo Archive</span>
            <HiArrowPath size={22} />
          </Button>
        </div>
      </div>
    </m.div>
  );
}

memo(ArchiveCard);
