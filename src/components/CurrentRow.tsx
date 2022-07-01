import React from "react";

function CurrentRow({ guess }: { guess: string[] }) {
  return (
    <>
      <div className="flex justify-center items-center text-4xl w-14 h-14 sm:w-16 sm:h-16 m-1 bg-gray-500/60 ">
        {guess[0]}
      </div>
      <div className="w-14 h-14 sm:w-16 sm:h-16 m-1 bg-gray-500/60 flex justify-center items-center text-4xl">
        {guess[1]}
      </div>
      <div className="w-14 h-14 sm:w-16 sm:h-16 m-1 bg-gray-500/60 flex justify-center items-center text-4xl">
        {guess[2]}
      </div>
      <div className="w-14 h-14 sm:w-16 sm:h-16 m-1 bg-gray-500/60 flex justify-center items-center text-4xl">
        {guess[3]}
      </div>
      <div className="w-14 h-14 sm:w-16 sm:h-16 m-1 bg-gray-500/60 flex justify-center items-center text-4xl">
        {guess[4]}
      </div>
    </>
  );
}

export default CurrentRow;
