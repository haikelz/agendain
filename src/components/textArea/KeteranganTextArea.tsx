import { ChangeEvent } from "react";
import { cx } from "~/lib/helpers/cx";
import useAgendaStore from "~/store";

type KeteranganTextAreaProps = {
  handleChangeAgenda: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export function KeteranganTextArea({ handleChangeAgenda }: KeteranganTextAreaProps) {
  const formData = useAgendaStore((state) => state.formData);

  return (
    <div className="flex w-full flex-col">
      <label className="text-base font-semibold" htmlFor="keterangan">
        Keterangan
      </label>
      <textarea
        className={cx(
          "mt-2 p-2 font-medium",
          "h-32 border border-gray-300",
          "rounded-md bg-gray-50",
          "transition-all ease-in-out",
          "dark:border-gray-500 dark:bg-gray-800",
          "focus:ring-2 focus:ring-blue-600"
        )}
        placeholder="Ketik disini...."
        name="keterangan"
        value={formData.keterangan}
        onChange={handleChangeAgenda}
        required
      />
    </div>
  );
}
