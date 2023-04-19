import { useMemo, useState } from "react";
import Layout from "~/components/Layout";
import TidakAda from "~/components/TidakAda";
import { ArchiveCard } from "~/components/cards";
import { Search } from "~/components/inputs";
import { cx } from "~/lib/helpers/cx";
import useAgendaStore from "~/store";

const Archive = () => {
  document.title = "Archive";

  const [search, setSearch] = useState<string>("");
  const archive = useAgendaStore((state) => state.archive);

  const filteredArchive = useMemo(
    () =>
      archive.filter((item) => {
        if (item.judul === search) return item;
        else if (item.judul.toLowerCase().includes(search.toLowerCase())) return item;
      }),
    [search, archive]
  );

  return (
    <Layout>
      <h1 className="text-4xl font-bold">Archive</h1>
      <p className="my-4 mt-1 text-center font-medium">
        Silahkan cari agenda yang telah kamu archivekan disini!
      </p>
      <Search search={search} setSearch={setSearch} />
      <div className="mt-6 w-full">
        <h2 className="text-center text-2xl font-bold">List archive</h2>
        {filteredArchive.length ? (
          <div
            className={cx(
              "mt-6 grid grid-cols-1 grid-rows-1 gap-4",
              "sm:grid-cols-2",
              "md:grid-cols-3"
            )}
          >
            {filteredArchive.map((item) => (
              <ArchiveCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <TidakAda description="Kamu belum mempunyai archive!" />
        )}
      </div>
    </Layout>
  );
};

export default Archive;
