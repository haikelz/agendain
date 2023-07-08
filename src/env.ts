import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  client: {
    VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnvStrict: {
    VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  },
  clientPrefix: "VITE_",
});
