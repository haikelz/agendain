import { Label, Textarea } from "flowbite-react";
import { ChangeEvent } from "react";
import useAgendaStore from "~/store";

type KeteranganTextAreaProps = {
  handleChangeAgenda: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export function KeteranganTextArea({ handleChangeAgenda }: KeteranganTextAreaProps) {
  const keterangan = useAgendaStore((state) => state.formData.keterangan);

  return (
    <div className="flex w-full flex-col">
      <Label htmlFor="keterangan">Keterangan</Label>
      <Textarea
        className="mt-2 h-32 text-sm"
        placeholder="Ketik disini...."
        name="keterangan"
        value={keterangan}
        onChange={handleChangeAgenda}
        required
      />
    </div>
  );
}
