import { ClerkProvider, RedirectToSignIn, SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { LazyMotion, domAnimation } from "framer-motion";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { clerkPubKey } from "./lib/utils/constants";
import Loading from "./pages/Loading";

const Home = lazy(() => import("./pages/Home"));
const NotFoundPage = lazy(() => import("./pages/404"));
const Archive = lazy(() => import("./pages/Archive"));

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key!");
}

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <LazyMotion features={domAnimation}>
        <div className="dark:bg-gray-900 dark:text-gray-200">
          <BrowserRouter>
            <Routes>
              <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
              <Route
                path="/"
                element={
                  <>
                    <SignedIn>
                      <Suspense fallback={<Loading />}>
                        <Home />
                      </Suspense>
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/archive"
                element={
                  <>
                    <SignedIn>
                      <Suspense fallback={<Loading />}>
                        <Archive />
                      </Suspense>
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<Loading />}>
                    <NotFoundPage />
                  </Suspense>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </LazyMotion>
    </ClerkProvider>
  );
}
