import { useEffect, useState, useContext } from "react";
import WordleContext from "../WordleContext";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import Modal from "./Modal";

interface IModal {
  isOpen: boolean;
  gameWon: boolean;
}

function Game() {
  const [turn, setTurn] = useState<number>(0);
  const [modalStatus, setModalStatus] = useState<IModal>({
    isOpen: false,
    gameWon: false,
  });
  const [guesses, setGuesses] = useState<string[][]>([]);
  const [guess, setGuess] = useState<string[]>([]);

  const { word, setWord } = useContext(WordleContext);

  const getLocalStorage = (item: string, defValue: string) => {
    return JSON.parse(window.localStorage.getItem(item) || defValue);
  };

  const setLocalStorage = (guess: string[]) => {
    const guessHistory = getLocalStorage("wordleGuesses", "[]");
    let turnHistory = getLocalStorage("wordleTurn", "0");

    guessHistory.push(guess);
    turnHistory += 1;
    window.localStorage.setItem("wordleGuesses", JSON.stringify(guessHistory));
    window.localStorage.setItem("wordleTurn", JSON.stringify(turnHistory));
  };

  const clearLocalStorage = () => {
    window.localStorage.removeItem("wordleGuesses");
    window.localStorage.removeItem("wordleTurn");
    window.localStorage.removeItem("gameOver");
    window.localStorage.removeItem("gameWon");
  };

  const resetGame = () => {
    clearLocalStorage();
    setTurn(0);
    setGuesses([]);
    setGuess([]);
    setModalStatus({
      isOpen: false,
      gameWon: false,
    });
    fetchRandomWord();
  };

  const fetchRandomWord = async () => {
    console.log("fetching");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RANDOM_WORD,
        "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
      },
    };

    const result = await fetch(
      "https://random-words5.p.rapidapi.com/getRandom?wordLength=5",
      //@ts-ignore
      options
    );

    const res = await result.text();
    await setWord(res.toUpperCase());
    window.localStorage.setItem(
      "wordleWord",
      JSON.stringify(res.toUpperCase())
    );
  };

  const validateGuess = async (guessedWord: string) => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${guessedWord}`
    );
    try {
      if (response.ok) {
        setGuesses((prev) => [...prev, guess]);
        setLocalStorage(guess);
        setGuess([]);
        setTurn(turn + 1);

        if (guess.join("") === word) {
          setModalStatus({ isOpen: true, gameWon: true });
          window.localStorage.setItem("gameOver", JSON.stringify(true));
          window.localStorage.setItem("gameWon", JSON.stringify(true));
        } else if (turn === 5) {
          setModalStatus({ isOpen: true, gameWon: false });
          window.localStorage.setItem("gameOver", JSON.stringify(false));
          window.localStorage.setItem("gameWon", JSON.stringify(false));
        }
      } else {
        console.log("Not a word");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const handleGameInput = (key: string) => {
    const isChar = /^[a-z]$/i.test(key);
    const isGuessComplete = guess.length === 5;
    const isBackSpace = key === "Backspace" || key === "BACK";
    const isEnter = key === "Enter" || key === "ENTER";

    if (!modalStatus.isOpen) {
      if (isChar && !isGuessComplete) {
        setGuess((prev) => [...prev, key.toUpperCase()]);
      } else if (isBackSpace) {
        setGuess((prev) => {
          const temp = [...prev];
          temp.pop();
          return temp;
        });
      } else if (isGuessComplete && isEnter) {
        validateGuess(guess.join(""));
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = ({ key }: { key: string }) => {
      handleGameInput(key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess]);

  useEffect(() => {
    //Checks for previous game data
    const guessHistory = getLocalStorage("wordleGuesses", "[]");
    const turnHistory = getLocalStorage("wordleTurn", "0");
    const wordleWord = getLocalStorage("wordleWord", "null");
    const gameOver = getLocalStorage("gameOver", "false");
    const gameWon = getLocalStorage("gameWon", "false");

    if (gameOver) {
      if (gameWon) {
        setModalStatus({ isOpen: true, gameWon: true });
      } else {
        setModalStatus({ isOpen: true, gameWon: true });
      }
    }

    if (wordleWord !== null) {
      setGuesses(guessHistory);
      setTurn(turnHistory);
      setWord(wordleWord);
    } else {
      fetchRandomWord();
    }
  }, []);

  return (
    <div className="min-w-[20rem] max-w-[30rem] mx-auto pt-[10vh] h-full flex flex-col justify-between items-center text-white">
      <Grid guess={guess} guesses={guesses} turn={turn} />
      <Keyboard handleClick={handleGameInput} />
      {modalStatus.isOpen && (
        <Modal
          gameResult={modalStatus.gameWon}
          word={word}
          resetGame={resetGame}
        />
      )}
    </div>
  );
}

export default Game;
