import { createContext, useState } from "react";
import { Context } from "vm";

interface WordleContextProviderProps {
  children: React.ReactNode;
}

const WordleContext = createContext<Context>(null!);

export const WordleContextProvider = ({
  children,
}: WordleContextProviderProps) => {
  const [theme, setTheme] = useState<boolean>(false);
  const [word, setWord] = useState<string>("");
  const [correctLettersThisGame, setCorrectLettersThisGame] = useState<
    string[]
  >([]);

  return (
    <WordleContext.Provider
      value={{
        theme,
        word,
        correctLettersThisGame,
        setTheme,
        setWord,
        setCorrectLettersThisGame,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};

export default WordleContext;
