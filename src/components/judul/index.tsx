import { FormData } from "src/interfaces";

const Judul = ({ formData, handleChange }: FormData) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold" htmlFor="judul">
        Judul
      </label>
      <input
        className="p-2 mt-1 w-80 font-medium dark:bg-gray-700 border-[3px] border-blue-500 rounded-md"
        placeholder="Ketik disini"
        name="judul"
        required
        value={formData.judul}
        onChange={handleChange}
      />
    </div>
  );
};

export default Judul;
