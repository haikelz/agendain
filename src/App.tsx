import { ClerkProvider, RedirectToSignIn, SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { LazyMotion, domAnimation } from "framer-motion";
import { Suspense, lazy } from "react";
import { Route, Switch } from "wouter";
import { env } from "~/env";
import Loading from "./pages/Loading";

const Home = lazy(() => import("./pages/Home"));
const NotFoundPage = lazy(() => import("./pages/404"));
const Archive = lazy(() => import("./pages/Archive"));

const { VITE_CLERK_PUBLISHABLE_KEY } = env;

if (!VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key!");
}

export default function App() {
  return (
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
      <LazyMotion features={domAnimation}>
        <div className="dark:bg-gray-900 dark:text-gray-200">
          <Switch>
            <Route path="/sign-in">
              <SignIn routing="path" path="/sign-in" />
            </Route>
            <Route path="/">
              <SignedIn>
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </Route>
            <Route path="/archive">
              <SignedIn>
                <Suspense fallback={<Loading />}>
                  <Archive />
                </Suspense>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </Route>
            <Route>
              <Suspense fallback={<Loading />}>
                <NotFoundPage />
              </Suspense>
            </Route>
          </Switch>
        </div>
      </LazyMotion>
    </ClerkProvider>
  );
}
