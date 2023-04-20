import { ChangeEvent } from "react";
import { cx } from "~/lib/helpers/cx";
import useAgendaStore from "~/store";

type JudulInputProps = {
  handleChangeAgenda: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function JudulInput({ handleChangeAgenda }: JudulInputProps) {
  const formData = useAgendaStore((state) => state.formData);

  return (
    <div className="flex w-full flex-col">
      <label className="text-base font-semibold" htmlFor="judul">
        Judul
      </label>
      <input
        type="text"
        className={cx(
          "mt-2 p-2 font-medium",
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
}
