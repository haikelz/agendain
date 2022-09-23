import { FormData } from "src/interfaces";

const Keterangan = ({ formData, handleChange }: FormData) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold" htmlFor="keterangan">
        Keterangan
      </label>
      <textarea
        className="p-2 mt-1 font-medium w-80 h-32 dark:bg-gray-700 border-[3px] border-blue-500 rounded-md "
        placeholder="Ketik disini"
        name="keterangan"
        required
        value={formData.keterangan}
        onChange={handleChange}
      />
    </div>
  );
};

export default Keterangan;
