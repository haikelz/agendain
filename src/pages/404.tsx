import { Link } from "wouter";
import { Button } from "~/components/atoms";
import { TidakAda } from "~/components/molecules/TidakAda";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <TidakAda description="404 Not Found!" />
      <Link to="/">
        <Button intent="primary" className="mt-3" label="back to home">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
