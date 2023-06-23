import { cx } from "class-variance-authority";
import format from "date-fns/format";
import id from "date-fns/locale/id";
import { AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { HiArrowPath, HiArrowTopRightOnSquare, HiPlus } from "react-icons/hi2";
import { Link } from "wouter";
import Layout from "~/components/Layout";
import { Button, Heading, Paragraph } from "~/components/atoms";
import { AgendaCard, JudulInput, KeteranganTextArea, SearchInput } from "~/components/molecules";
import { TidakAda } from "~/components/molecules/TidakAda";
import useAgendaStore from "~/store";
import { IndexTargetValueProps } from "~/types";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  const { agenda, setAgenda, formData, setFormData, isUpdate, setIsUpdate } = useAgendaStore(
    (state) => ({
      agenda: state.agenda,
      setAgenda: state.setAgenda,
      formData: state.formData,
      setArchive: state.setArchive,
      setFormData: state.setFormData,
      isUpdate: state.isUpdate,
      setIsUpdate: state.setIsUpdate,
    })
  );

  function handleChangeAgenda(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
        date: format(new Date(), "dd LLLL yyyy", { locale: id }),
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
        if (item.judul === search) return item;
        else if (item.judul?.toLowerCase().includes(search.toLowerCase())) return item;
      }),
    [search, agenda]
  );

  return (
    <Layout>
      <div className="w-full">
        <div className="text-center">
          <Heading as="h1" size="4xl">
            Agendain
          </Heading>
          <Paragraph className="mt-2">Apa agendamu hari ini?</Paragraph>
        </div>
        <form className="my-6 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center gap-4">
            <JudulInput handleChangeAgenda={handleChangeAgenda} />
            <KeteranganTextArea handleChangeAgenda={handleChangeAgenda} />
            <div className="flex items-center justify-center space-x-3">
              <Button type="submit" intent="primary" label="submit">
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
              </Button>
              <Link to="/archive">
                <Button intent="secondary" label="Go to Archive">
                  <span>Go to Archive</span>
                  <HiArrowTopRightOnSquare />
                </Button>
              </Link>
            </div>
          </div>
        </form>
        <SearchInput search={search} setSearch={setSearch} />
        <div
          className={cx(
            "flex w-full flex-col justify-center",
            filteredAgenda.length ? "" : "items-center"
          )}
        >
          <Heading as="h2" align="center" size="3xl" className="my-6">
            List Agenda
          </Heading>
          {filteredAgenda.length ? (
            <div className={cx("grid grid-cols-1 grid-rows-1 gap-4")}>
              <AnimatePresence mode="sync">
                {filteredAgenda.map((item) => (
                  <AgendaCard key={item.id} item={item} search={search} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <TidakAda description="Kamu belum mempunyai agenda!" />
          )}
        </div>
      </div>
    </Layout>
  );
}
