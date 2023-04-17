import clsx from "clsx";
import { nanoid } from "nanoid";
import { FormEvent, useMemo, useState } from "react";
import { HiArrowTopRightOnSquare, HiMoon, HiSun } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Keterangan } from "../components/KeteranganTextArea";
import Layout from "../components/Layout";
import TidakAda from "../components/TidakAda";
import { AgendaCard } from "../components/card";
import { Judul, Search } from "../components/inputs";
import { useDarkMode } from "../hooks/useDarkMode";
import { getDate } from "../lib/helpers/getDate";
import useAgendaStore from "../store";
import Button from "../components/Button";

const Home = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [search, setSearch] = useState<string>("");

  const { agenda, setAgenda, judul, keterangan, setJudul, setKeterangan } = useAgendaStore();

  /**
   * handling submit data
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = [...agenda];

    data.push({
      id: nanoid(),
      judul: judul,
      keterangan: keterangan,
      date: getDate(),
    });

    setJudul("");
    setKeterangan("");
    setAgenda(data);
  };

  /**
   * filtering agenda data based on user's search input and memoized it with `useMemo` hook
   */
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
          {darkMode === "dark" ? <HiMoon size={25} /> : <HiSun size={25} />}
        </button>
      </div>
      <p className="mt-1 font-medium">Apa agendamu hari ini?</p>
      <form className="my-6" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Judul />
          <Keterangan />
          <div className="flex items-center justify-center space-x-3">
            <button
              className={clsx(
                "flex items-center justify-center",
                "space-x-2 rounded-md",
                "bg-blue-500 text-white",
                "hover:bg-blue-600 hover:text-white",
                "py-2 px-3 shadow-lg"
              )}
              type="submit"
              aria-label="submit"
            >
              Tambahkan
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
