import { Label, TextInput } from "flowbite-react";
import { ChangeEvent } from "react";
import useAgendaStore from "~/store";

type JudulInputProps = {
  handleChangeAgenda: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function JudulInput({ handleChangeAgenda }: JudulInputProps) {
  const judul = useAgendaStore((state) => state.formData.judul);

  return (
    <div className="flex w-full flex-col">
      <Label htmlFor="judul">Judul</Label>
      <TextInput
        type="text"
        className="mt-2"
        placeholder="Ketik disini...."
        name="judul"
        value={judul}
        onChange={handleChangeAgenda}
        required
      />
    </div>
  );
}
