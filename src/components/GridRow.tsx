import { useContext, useEffect, useState } from "react";
import WordleContext from "../WordleContext";

interface Props {
  guesses: string[][];
  turn: number;
}

function GridRow({ guesses, turn }: Props) {
  const [yellowLetters, setYellowLetters] = useState<string[]>([]);

  const { word, correctLettersThisGame, setCorrectLettersThisGame } =
    useContext(WordleContext);

  const wordArr = Array.from(word);

  useEffect(() => {
    //Ensures that duplicate YELLOW letters are not both marked
    const updatedWord: any = ["", "", "", "", ""];
    if (guesses[turn]) {
      const wrongLetters = wordArr.filter(
        (letter, index) => letter !== guesses[turn][index]
      );
      const correctLetters = wordArr.filter(
        (letter, index) => letter === guesses[turn][index]
      );

      correctLetters.forEach((letter) => {
        if (!correctLettersThisGame.includes(letter)) {
          setCorrectLettersThisGame((prev: string[]) => [...prev, letter]);
          const correctKeysFromStorage = JSON.parse(
            window.localStorage.getItem("correctKeys") || "[]"
          );
          window.localStorage.setItem(
            "correctKeys",
            JSON.stringify([...correctKeysFromStorage, letter])
          );
        }
      });

      wordArr.forEach((letter, index) => {
        if (
          wrongLetters.includes(guesses[turn][index]) &&
          !updatedWord.includes(guesses[turn][index])
        ) {
          updatedWord.splice(index, 1, guesses[turn][index]);
        }
      });

      setYellowLetters(updatedWord);
    }
  }, []);

  return (
    <>
      {wordArr.map((letter, index) => (
        <div
          key={index}
          className={`w-12 h-12 sm:w-16 sm:h-16 m-1 bg-gray-500/60 flex justify-center items-center text-4xl  ${
            guesses[turn]
              ? word[index] === guesses[turn][index]
                ? "bg-green-600/100"
                : yellowLetters[index] === guesses[turn][index]
                ? "bg-yellow-500/100"
                : "bg-gray-700/100"
              : null
          }`}
        >
          {guesses[turn] ? guesses[turn][index] : ""}
        </div>
      ))}
    </>
  );
}

export default GridRow;
