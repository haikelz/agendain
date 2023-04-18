import clsx from "clsx";
import { ChangeEvent } from "react";
import useAgendaStore from "../../store";

type JudulInputProps = {
  handleChangeAgenda: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Judul = ({ handleChangeAgenda }: JudulInputProps) => {
  const formData = useAgendaStore((state) => state.formData);

  return (
    <div className="flex flex-col">
      <label className="text-base font-semibold" htmlFor="judul">
        Judul
      </label>
      <input
        type="text"
        className={clsx(
          "mt-2 w-96 p-2 font-medium",
          "rounded-md border border-gray-300 bg-gray-50",
          "transition-all ease-in-out",
          "focus:ring-2 focus:ring-blue-500",
          "dark:border-gray-500 dark:bg-gray-800"
        )}
        placeholder="Ketik disini"
        name="judul"
        value={formData.judul}
        onChange={handleChangeAgenda}
        required
      />
    </div>
  );
};
