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
  const [guessedKeys, setGuessedKeys] = useState<string[]>([]);

  const { word, setWord, setCorrectLettersThisGame } =
    useContext(WordleContext);

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

  const clearLocalStorage = () => {
    window.localStorage.removeItem("wordleGuesses");
    window.localStorage.removeItem("wordleTurn");
    window.localStorage.removeItem("gameOver");
    window.localStorage.removeItem("gameWon");
    window.localStorage.removeItem("guessedKeys");
    window.localStorage.removeItem("correctKeys");
  };

  const resetGame = () => {
    clearLocalStorage();
    setTurn(0);
    setGuesses([]);
    setGuess([]);
    setGuessedKeys([]);
    setCorrectLettersThisGame([]);
    setModalStatus({
      isOpen: false,
      gameWon: false,
    });
    fetchRandomWord();
  };

  const getLocalStorage = (item: string, defValue: string) => {
    return JSON.parse(window.localStorage.getItem(item) || defValue);
  };

  const updateGuessAndTurnHistory = (guess: string[]) => {
    //On valid guess, update user guess history and increment their turn +1
    const guessHistory = getLocalStorage("wordleGuesses", "[]");
    let turnHistory = getLocalStorage("wordleTurn", "0");

    guessHistory.push(guess);
    turnHistory += 1;
    window.localStorage.setItem("wordleGuesses", JSON.stringify(guessHistory));
    window.localStorage.setItem("wordleTurn", JSON.stringify(turnHistory));
  };

  const validateGuess = async (guessedWord: string) => {
    //Checks if word is in the english dictionary
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${guessedWord}`
    );
    try {
      if (response.ok) {
        setGuesses((prev) => [...prev, guess]);
        updateGuessAndTurnHistory(guess);
        setGuess([]);
        setTurn(turn + 1);

        guess.forEach((letter) => {
          //If guessedKeys does not already include a letter, push it onto guessedKeys state and update local storage
          if (!guessedKeys.includes(letter)) {
            setGuessedKeys((prev: string[]) => [...prev, letter]);
            const guessedKeysHistory = getLocalStorage("guessedKeys", "[]");
            window.localStorage.setItem(
              "guessedKeys",
              JSON.stringify([...guessedKeysHistory, letter])
            );
          }
        });

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

    //If the game is not over, then apply user key presses
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

  //
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
    const guessedKeysHistory = getLocalStorage("guessedKeys", "[]");
    const correctKeysHistory = getLocalStorage("correctKeys", "[]");

    if (gameOver) {
      if (gameWon) {
        setModalStatus({ isOpen: true, gameWon: true });
      } else {
        setModalStatus({ isOpen: true, gameWon: true });
      }
    }

    //If game is not finished, fill state with local storage data
    if (wordleWord !== null) {
      setGuesses(guessHistory);
      setTurn(turnHistory);
      setWord(wordleWord);
      setGuessedKeys(guessedKeysHistory);
      setCorrectLettersThisGame(correctKeysHistory);
    } else {
      fetchRandomWord();
    }
  }, []);

  return (
    <div className="min-w-[20rem] max-w-[30rem] mx-auto game-height pb-16 sm:pb-0 flex flex-col justify-evenly items-center text-white">
      <Grid guess={guess} guesses={guesses} turn={turn} />
      <Keyboard
        handleClick={handleGameInput}
        word={word}
        guessedKeys={guessedKeys}
      />
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
