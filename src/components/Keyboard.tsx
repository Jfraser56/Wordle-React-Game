import { useState } from "react";

function Keyboard({ handleClick }: { handleClick: (key: string) => void }) {
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
              className="flex justify-center items-center m-1 w-12 h-14 rounded bg-gray-400"
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
              className="flex justify-center items-center m-1 w-12 h-14 rounded bg-gray-400"
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
              className="flex justify-center items-center m-1 w-full h-14 rounded bg-gray-400"
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
