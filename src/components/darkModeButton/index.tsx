import { useDarkMode } from "../../hooks/useDarkMode";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const changeMode = () => setDarkMode(darkMode === "dark" ? "light" : "dark");

  return (
    <div>
      <button className="" onClick={changeMode}>
        {darkMode === "dark" ? (
          <MdLightMode size="25px" />
        ) : (
          <MdDarkMode size="25px" />
        )}
      </button>
    </div>
  );
};

export default DarkModeButton;
