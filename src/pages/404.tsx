import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import TidakAda from "~/components/TidakAda";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <TidakAda description="404 Not Found!" />
        <Link to="/">
          <Button className="mt-3" type="button" aria-label="back to home">
            Back to Home
          </Button>
        </Link>
      </div>
    </section>
  );
}
