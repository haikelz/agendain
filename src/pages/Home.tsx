import { nanoid } from "nanoid";
import { ChangeEvent, FormEvent, useMemo } from "react";
import { HiArrowPath, HiArrowTopRightOnSquare, HiPlus } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
import Layout from "~/components/Layout";
import TidakAda from "~/components/TidakAda";
import { AgendaCard } from "~/components/cards";
import { JudulInput, SearchInput } from "~/components/inputs";
import { KeteranganTextArea } from "~/components/textArea";
import { cx } from "~/lib/helpers/cx";
import { getDate } from "~/lib/helpers/getDate";
import useAgendaStore from "~/store";
import { IndexTargetValueProps } from "~/types";

export default function Home() {
  const { agenda, setAgenda, formData, setFormData, isUpdate, setIsUpdate, search } =
    useAgendaStore((state) => state);

  function handleChangeAgenda<T extends ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>(
    event: T
  ) {
    const data: IndexTargetValueProps = { ...formData };
    data[event.target.name] = event.target.value;

    setFormData(data);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = [...agenda];

    if (isUpdate.status) {
      data.forEach((item) => {
        if (item.id === isUpdate.id) {
          item.judul = formData.judul;
          item.keterangan = formData.keterangan;
        }
      });
    } else {
      data.push({
        id: nanoid(),
        judul: formData.judul,
        keterangan: formData.keterangan,
        date: getDate(),
        isDone: false,
      });
    }

    setAgenda(data);
    setIsUpdate({ id: "", status: false });
    setFormData({ judul: "", keterangan: "" });
  }

  const filteredAgenda = useMemo(
    () =>
      agenda.filter((item) => {
        if (item.judul === search) {
          return item;
        } else if (item.judul?.toLowerCase().includes(search.toLowerCase())) {
          return item;
        }
      }),
    [search, agenda]
  );

  return (
    <Layout>
      <div className="my-4 flex w-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Agendain</h1>
        <p className="mt-2 font-medium">Apa agendamu hari ini?</p>
        <form className="my-6 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center gap-4">
            <JudulInput handleChangeAgenda={handleChangeAgenda} />
            <KeteranganTextArea handleChangeAgenda={handleChangeAgenda} />
            <div className="flex items-center justify-center space-x-3">
              <button
                className={cx(
                  "flex items-center justify-center",
                  "space-x-2 rounded-md",
                  "bg-blue-500 text-white",
                  "hover:bg-blue-600 hover:text-white",
                  "px-3 py-2 shadow-lg"
                )}
                type="submit"
                aria-label="submit"
              >
                {isUpdate.status ? (
                  <>
                    <span>Update</span>
                    <HiArrowPath size={22} />
                  </>
                ) : (
                  <>
                    <span>Tambahkan</span>
                    <HiPlus size={22} />
                  </>
                )}
              </button>
              <Link to="/archive">
                <Button
                  variant="secondary"
                  label="Go to Archive"
                  className={cx("flex items-center justify-center", "space-x-2 px-3 py-2")}
                >
                  <span>Go to Archive</span>
                  <HiArrowTopRightOnSquare />
                </Button>
              </Link>
            </div>
          </div>
        </form>
        <SearchInput />
        <div
          className={cx(
            "flex w-full flex-col justify-center",
            filteredAgenda.length ? "" : "items-center"
          )}
        >
          <h2 className="my-6 text-center text-3xl font-bold">List Agenda</h2>
          {filteredAgenda.length ? (
            <div className={cx("grid grid-cols-1 grid-rows-1 gap-4")}>
              {filteredAgenda.map((item, index) => (
                <AgendaCard key={index + 1} item={item} />
              ))}
            </div>
          ) : (
            <TidakAda description="Kamu belum mempunyai agenda!" />
          )}
        </div>
      </div>
    </Layout>
  );
}
