import { useEffect, useMemo } from "react";
import Layout from "~/components/Layout";
import TidakAda from "~/components/TidakAda";
import { ArchiveCard } from "~/components/cards";
import { SearchInput } from "~/components/inputs";
import { cx } from "~/lib/helpers/cx";
import useAgendaStore from "~/store";

export default function Archive() {
  const archive = useAgendaStore((state) => state.archive);
  const search = useAgendaStore((state) => state.search);

  const filteredArchive = useMemo(
    () =>
      archive.filter((item) => {
        if (item.judul === search) return item;
        else if (item.judul.toLowerCase().includes(search.toLowerCase())) return item;
      }),
    [search, archive]
  );

  useEffect(() => {
    document.title = "Archive";
  }, []);

  return (
    <Layout>
      <div className="w-full">
        <section className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold">Archive</h1>
          <p className="my-4 mt-1 font-medium">Cari agenda yang telah kamu archivekan disini!</p>
          <SearchInput />
        </section>
        <section className="mt-6 w-full">
          <h2 className="my-6 text-center text-3xl font-bold">List Archive</h2>
          {filteredArchive.length ? (
            <div className={cx("mt-6 grid grid-cols-1 grid-rows-1 gap-4")}>
              {filteredArchive.map((item) => (
                <ArchiveCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div>
              <TidakAda description="Kamu belum mempunyai archive!" />
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
