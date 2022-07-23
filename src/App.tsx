import { useContext } from "react";
import WordleContext from "./WordleContext";
import Header from "./components/Header";
import Game from "./components/Game";

function App() {
  const { theme } = useContext(WordleContext);

  console.log("render app");

  return (
    <div
      className={`relative w-screen h-screen overflow-auto py-[10vh] ${
        theme ? "bg-black" : "bg-white"
      }`}
    >
      <Header />
      <Game />
    </div>
  );
}

export default App;
