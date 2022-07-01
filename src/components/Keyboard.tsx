import { useEffect, useState, useContext } from "react";
import WordleContext from "../WordleContext";

interface Props {
  guessedKeys: string[];
  handleClick: (key: string) => void;
  word: string;
}

function Keyboard({ word, guessedKeys, handleClick }: Props) {
  const [row1, setRow1] = useState([
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
  ]);
  const [row2, setRow2] = useState([
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
  ]);
  const [row3, setRow3] = useState([
    "ENTER",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "BACK",
  ]);

  const { correctLettersThisGame } = useContext(WordleContext);

  const wordArr = Array.from(word);

  return (
    <div className="w-full h-auto p-2">
      <div className="flex justify-center">
        {row1.map((cur, index) => {
          return (
            <div
              onClick={(e) =>
                handleClick(
                  e.currentTarget.textContent === null
                    ? ""
                    : e.currentTarget.textContent
                )
              }
              className={`flex justify-center items-center m-1 w-12 h-14 rounded bg-gray-400 cursor-pointer ${
                correctLettersThisGame.includes(cur)
                  ? "bg-green-600"
                  : guessedKeys.includes(cur) && wordArr.includes(cur)
                  ? "bg-yellow-500"
                  : guessedKeys.includes(cur) && "bg-gray-700"
              }`}
              key={index}
            >
              {cur}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mx-5">
        {row2.map((cur, index) => {
          return (
            <div
              onClick={(e) => handleClick(e.currentTarget.id)}
              className={`flex justify-center items-center m-1 w-12 h-14 rounded bg-gray-400 cursor-pointer ${
                correctLettersThisGame.includes(cur)
                  ? "bg-green-600"
                  : guessedKeys.includes(cur) && wordArr.includes(cur)
                  ? "bg-yellow-500"
                  : guessedKeys.includes(cur) && "bg-gray-700"
              }`}
              key={index}
              id={cur}
            >
              {cur}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        {row3.map((cur, index) => {
          return (
            <div
              onClick={(e) => handleClick(e.currentTarget.id)}
              className={`flex justify-center items-center m-1 w-12 h-14 rounded bg-gray-400 cursor-pointer ${
                correctLettersThisGame.includes(cur)
                  ? "bg-green-600"
                  : guessedKeys.includes(cur) && wordArr.includes(cur)
                  ? "bg-yellow-500"
                  : guessedKeys.includes(cur) && "bg-gray-700"
              }`}
              key={index}
              id={cur}
            >
              {cur}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Keyboard;
