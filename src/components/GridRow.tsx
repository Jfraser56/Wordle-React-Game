import { useContext, useEffect } from "react";
import WordleContext from "../WordleContext";

interface Props {
  guesses: string[][];
  turn: number;
}
function GridRow({ guesses, turn }: Props) {
  const { word } = useContext(WordleContext);

  const rowLetterMap = [0, 1, 2, 3, 4];

  return (
    <>
      {rowLetterMap.map((letterIndex) => (
        <div
          key={letterIndex}
          className={`w-14 h-14 sm:w-16 sm:h-16 m-1 bg-gray-500/60 flex justify-center items-center text-4xl  ${
            guesses[turn]
              ? word[letterIndex] === guesses[turn][letterIndex]
                ? "bg-green-600/100"
                : word.includes(guesses[turn][letterIndex])
                ? "bg-yellow-500/100"
                : "bg-gray-700/100"
              : null
          }`}
        >
          {guesses[turn] ? guesses[turn][letterIndex] : ""}
        </div>
      ))}
    </>
  );
}

export default GridRow;
