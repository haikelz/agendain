export default function TidakAda({ description }: { description: string }) {
  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <img
        src="/img/next-agenda.svg"
        alt="Tidak ada agenda terbaru"
        width="300px"
        height="300px"
        loading="lazy"
        decoding="async"
      />
      <span className="mt-6 text-xl font-semibold">{description}</span>
    </div>
  );
}
