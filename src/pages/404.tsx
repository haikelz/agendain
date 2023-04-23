import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import TidakAda from "~/components/TidakAda";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <TidakAda description="404 Not Found!" />
      <Link to="/">
        <Button className="mt-3" type="button" aria-label="back to home">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
