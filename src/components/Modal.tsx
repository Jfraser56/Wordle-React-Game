import { AiFillGithub } from "react-icons/ai";

interface Props {
  gameResult: boolean;
  word: string;
  resetGame: () => void;
}

function Modal({ gameResult, word, resetGame }: Props) {
  return (
    <div className="absolute flex justify-center items-center top-0 left-0 w-screen h-screen bg-black/40">
      <div className="p-5 w-72 h-60 sm:w-96 bg-white rounded-lg text-center text-black">
        <h1 className="text-2xl font-bold mb-2">
          {gameResult ? "You Won!" : "You Lost 😢"}
        </h1>
        <p className="text-lg mb-8">
          {" "}
          The word was <span className="font-bold">{word}</span>
        </p>
        <div className="flex items-center justify-center mb-8">
          <button
            onClick={resetGame}
            className="transition w-28 h-10 mr-5 rounded text-white bg-green-600 hover:bg-green-800"
          >
            Play again
          </button>
          <a
            href="https://github.com/Jfraser56/Wordle-React-Game"
            target="_blank"
          >
            <button className="flex justify-center items-center transition w-28 h-10 rounded text-white bg-gray-700 hover:bg-gray-800">
              Github <AiFillGithub className="ml-2" size="1.5rem" />
            </button>
          </a>
        </div>
        <a
          className="text-sm underline"
          href="https://jfraser56.github.io/"
          target="_blank"
        >
          by John Fraser
        </a>
      </div>
    </div>
  );
}

export default Modal;
