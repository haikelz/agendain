import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { browser } from "~/lib/utils/constants";
import useDarkModeStore from "~/store";

export function useDarkMode() {
  const { darkMode, setDarkMode } = useDarkModeStore(
    (state) => ({
      darkMode: state.darkMode,
      setDarkMode: state.setDarkMode,
    }),
    shallow
  );

  useEffect(() => {
    if (!browser) return;

    localStorage.setItem("theme", darkMode);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(darkMode);
  }, [darkMode]);

  return [darkMode, setDarkMode] as const;
}
