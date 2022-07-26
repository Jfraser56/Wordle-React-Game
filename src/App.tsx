import { useContext } from "react";
import WordleContext from "./WordleContext";
import Header from "./components/Header";
import Game from "./components/Game";

function App() {
  const { theme } = useContext(WordleContext);

  console.log("render app");

  return (
    <div className={`w-screen h-screen ${theme ? "bg-black" : "bg-white"}`}>
      <Header />
      <Game />
    </div>
  );
}

export default App;
