export default function TidakAda({ description }: { description: string }) {
  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <img
        src="/img/void.svg"
        alt="Tidak ada section"
        width="200px"
        height="200px"
        loading="lazy"
        decoding="async"
      />
      <span className="mt-3 text-xl font-bold">{description}</span>
    </div>
  );
}
