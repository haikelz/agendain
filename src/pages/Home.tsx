import clsx from "clsx";
import { nanoid } from "nanoid";
import { ChangeEvent, FormEvent, lazy, useMemo, useState } from "react";
import { HiArrowPath, HiArrowTopRightOnSquare, HiMoon, HiPlus, HiSun } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { Keterangan } from "../components/KeteranganTextArea";
import Layout from "../components/Layout";
import TidakAda from "../components/TidakAda";
import { Judul, Search } from "../components/inputs";
import { useDarkMode } from "../hooks/useDarkMode";
import { getDate } from "../lib/helpers/getDate";
import useAgendaStore from "../store";
import { IndexTargetValueProps } from "../types";

const AgendaCard = lazy(() => import("../components/card/AgendaCard"));

const Home = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [search, setSearch] = useState<string>("");

  const { agenda, setAgenda, formData, setFormData, isUpdate, setIsUpdate } = useAgendaStore();

  const handleChangeAgenda = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const data: IndexTargetValueProps = { ...formData };
    data[event.target.name] = event.target.value;

    setFormData(data);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
      });
    }

    setAgenda(data);
    setIsUpdate({ id: "", status: false });
    setFormData({ judul: "", keterangan: "" });
  };

  const filteredAgendas = useMemo(
    () =>
      agenda.filter((value) => {
        if (value.judul === search) {
          return value;
        } else if (value.judul?.toLowerCase().includes(search.toLowerCase())) {
          return value;
        }
      }),
    [search, agenda]
  );

  return (
    <Layout>
      <div className="flex items-center justify-center space-x-3">
        <h1 className="text-4xl font-bold">Agendain</h1>
        <button
          className="rounded-md bg-gray-200 p-2 hover:bg-gray-300 dark:bg-gray-800"
          type="button"
          aria-label="change mode theme"
          onClick={() => setDarkMode(darkMode === "dark" ? "light" : "dark")}
        >
          {darkMode === "dark" ? <HiSun size={25} /> : <HiMoon size={25} />}
        </button>
      </div>
      <p className="mt-1 font-medium">Apa agendamu hari ini?</p>
      <form className="my-6" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Judul handleChangeAgenda={handleChangeAgenda} />
          <Keterangan handleChangeAgenda={handleChangeAgenda} />
          <div className="flex items-center justify-center space-x-3">
            <button
              className={clsx(
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
                className={clsx("flex items-center justify-center", "space-x-2 px-3 py-2")}
              >
                <span>Go to Archive</span>
                <HiArrowTopRightOnSquare />
              </Button>
            </Link>
          </div>
        </div>
      </form>
      <Search search={search} setSearch={setSearch} />
      <div
        className={clsx(
          "flex w-full flex-col justify-center",
          filteredAgendas.length ? "" : "items-center"
        )}
      >
        <h2 className="my-6 text-center text-3xl font-bold">List Agenda</h2>
        {filteredAgendas.length ? (
          <div
            className={clsx(
              "grid grid-cols-1 grid-rows-1 gap-4",
              "sm:grid-cols-2",
              "md:grid-cols-3"
            )}
          >
            {filteredAgendas.map((item, index) => (
              <AgendaCard key={index + 1} item={item} />
            ))}
          </div>
        ) : (
          <TidakAda description="Kamu belum mempunyai agenda!" />
        )}
      </div>
    </Layout>
  );
};

export default Home;
