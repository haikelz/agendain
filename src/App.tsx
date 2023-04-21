import { ClerkProvider, RedirectToSignIn, SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { LazyMotion, domAnimation } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { clerkPubKey } from "./lib/utils/constants";
import NotFoundPage from "./pages/404";
import Archive from "./pages/Archive";
import Home from "./pages/Home";

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key!");
}

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <LazyMotion features={domAnimation}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <Home />
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
                    <Archive />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </LazyMotion>
    </ClerkProvider>
  );
}
