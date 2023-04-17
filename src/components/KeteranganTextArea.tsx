import clsx from "clsx";
import useAgendaStore from "../store";

export const Keterangan = () => {
  const { formData, keterangan, setKeterangan } = useAgendaStore();

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
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
        required
      />
    </div>
  );
};
