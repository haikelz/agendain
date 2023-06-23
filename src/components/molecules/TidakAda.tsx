import { Image, Paragraph } from "../atoms";

export function TidakAda({ description }: { description: string }) {
  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <Image
        src="/img/next-agenda.svg"
        alt="Tidak ada agenda terbaru"
        width="300px"
        height="300px"
      />
      <Paragraph className="mt-6 text-xl font-semibold">{description}</Paragraph>
    </div>
  );
}
