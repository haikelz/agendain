import clsx from "clsx";
import { ChangeEvent } from "react";
import useAgendaStore from "../store";

type KeteranganTextAreaProps = {
  handleChangeAgenda: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const Keterangan = ({ handleChangeAgenda }: KeteranganTextAreaProps) => {
  const formData = useAgendaStore((state) => state.formData);

  return (
    <div className="flex flex-col">
      <label className="text-base font-semibold" htmlFor="keterangan">
        Keterangan
      </label>
      <textarea
        className={clsx(
          "mt-2 w-96 p-2 font-medium",
          "h-32 focus:ring-2 focus:ring-blue-500",
          "border border-gray-300 dark:border-gray-500",
          "rounded-md bg-gray-50 dark:bg-gray-800",
          "transition-all ease-in-out"
        )}
        placeholder="Ketik disini"
        name="keterangan"
        value={formData.keterangan}
        onChange={handleChangeAgenda}
        required
      />
    </div>
  );
};
