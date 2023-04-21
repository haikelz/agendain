import { Label, TextInput } from "flowbite-react";
import { ChangeEvent } from "react";
import useAgendaStore from "~/store";

type JudulInputProps = {
  handleChangeAgenda: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function JudulInput({ handleChangeAgenda }: JudulInputProps) {
  const formData = useAgendaStore((state) => state.formData);

  return (
    <div className="flex w-full flex-col">
      <Label htmlFor="judul">Judul</Label>
      <TextInput
        type="text"
        className="mt-2"
        placeholder="Ketik disini...."
        name="judul"
        value={formData.judul}
        onChange={handleChangeAgenda}
        required
      />
    </div>
  );
}
