import { memo } from "react";
import { FormDataProps } from "../../types";

export const Judul = ({ formData, handleChange }: FormDataProps) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold" htmlFor="judul">
        Judul
      </label>
      <input
        className="p-2 mt-1 w-80 font-medium focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 border-[3px] border-blue-500 rounded-md"
        placeholder="Ketik disini"
        name="judul"
        required
        value={formData.judul}
        onChange={handleChange}
      />
    </div>
  );
};

memo(Judul);
