import { memo } from "react";

export const ButtonSubmit = () => {
  return (
    <button
      className="rounded-md bg-blue-500 text-white hover:bg-blue-600 hover:text-white shadow-lg p-2.5"
      type="submit"
    >
      Submit
    </button>
  );
};

memo(ButtonSubmit);
