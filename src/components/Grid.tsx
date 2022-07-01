import React, { useState } from "react";
import GridRow from "./GridRow";
import CurrentRow from "./CurrentRow";

interface Props {
  guess: string[];
  guesses: string[][];
  turn: number;
}

function Grid({ guess, guesses, turn }: Props) {
  return (
    <div>
      <div className="flex mx-auto ">
        {turn === 0 ? (
          <CurrentRow guess={guess} />
        ) : (
          <GridRow turn={0} guesses={guesses} />
        )}
      </div>
      <div className="flex mx-auto ">
        {turn === 1 ? (
          <CurrentRow guess={guess} />
        ) : (
          <GridRow turn={1} guesses={guesses} />
        )}
      </div>
      <div className="flex mx-auto ">
        {turn === 2 ? (
          <CurrentRow guess={guess} />
        ) : (
          <GridRow turn={2} guesses={guesses} />
        )}
      </div>
      <div className="flex mx-auto ">
        {turn === 3 ? (
          <CurrentRow guess={guess} />
        ) : (
          <GridRow turn={3} guesses={guesses} />
        )}
      </div>
      <div className="flex mx-auto ">
        {turn === 4 ? (
          <CurrentRow guess={guess} />
        ) : (
          <GridRow turn={4} guesses={guesses} />
        )}
      </div>
      <div className="flex mx-auto ">
        {turn === 5 ? (
          <CurrentRow guess={guess} />
        ) : (
          <GridRow turn={5} guesses={guesses} />
        )}
      </div>
    </div>
  );
}

export default Grid;
