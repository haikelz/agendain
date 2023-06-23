import { cx } from "class-variance-authority";
import { useEffect, useMemo, useState } from "react";
import Layout from "~/components/Layout";
import { Heading, Paragraph } from "~/components/atoms";
import { ArchiveCard, SearchInput } from "~/components/molecules";
import { TidakAda } from "~/components/molecules/TidakAda";
import useAgendaStore from "~/store";

export default function Archive() {
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

  useEffect(() => {
    document.title = "Archive | Agendain";
  }, []);

  return (
    <Layout>
      <div className="w-full">
        <section className="flex flex-col items-center justify-center text-center">
          <Heading as="h1" size="4xl">
            Archive
          </Heading>
          <Paragraph className="my-4 mt-1">
            Cari agenda yang telah kamu archivekan disini!
          </Paragraph>
          <SearchInput search={search} setSearch={setSearch} />
        </section>
        <section className="mt-6 w-full">
          <Heading align="center" as="h2" size="3xl" className="my-6">
            List Archive
          </Heading>
          {filteredArchive.length ? (
            <div className={cx("mt-6 grid grid-cols-1 grid-rows-1 gap-4")}>
              {filteredArchive.map((item) => (
                <ArchiveCard key={item.id} item={item} search={search} />
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
