import clsx from "clsx";
import useAgendaStore from "../../store";

export const Judul = () => {
  const { formData, setJudul, judul } = useAgendaStore();

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
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        required
      />
    </div>
  );
};
