import { useContext, useEffect } from "react";
import WordleContext from "../WordleContext";

function Header() {
  const { theme, setTheme } = useContext(WordleContext);

  const toggleTheme = () => {
    const savedTheme = JSON.parse(
      window.localStorage.getItem("savedTheme") || "false"
    );
    if (savedTheme === true) {
      window.localStorage.setItem("savedTheme", JSON.stringify(false));
    } else {
      window.localStorage.setItem("savedTheme", JSON.stringify(true));
    }
    setTheme(!savedTheme);
  };

  useEffect(() => {
    const savedTheme = JSON.parse(
      window.localStorage.getItem("savedTheme") || "false"
    );

    setTheme(savedTheme);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full flex justify-between items-center py-3 px-10 border-b ${
        theme ? "bg-black border-gray-500" : "bg-white border-gray-300"
      }`}
    >
      <button
        type="button"
        className={`${theme ? "text-white" : "text-black"}`}
      >
        Help
      </button>
      <h1
        className={`font-bold text-2xl ${theme ? "text-white" : "text-black"}`}
      >
        Worldle Demo!
      </h1>
      <input
        onChange={toggleTheme}
        type="checkbox"
        className="toggle"
        checked={theme}
      />
    </div>
  );
}

export default Header;
