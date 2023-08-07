// CSS
import "./App.css";

// React
import { useCallback, useState, useEffect } from "react";

// Data
import { wordsList } from "./data/word";

// Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [enteringNow, setEnteringNow] = useState(true)

  const guessesQty = 5

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  console.log(gameStage)

  const pickedWordAndCategory = () => {
    // pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { category, word };
  };

  // starts the secret word game
  const startGame = () => {
    // reset all states
    clearLetterStates()

    // pick word and pick cattegory
    const { category, word } = pickedWordAndCategory();
    // console.log(category, word);

    // create array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toUpperCase());

    // fill states
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  // process the letter input
  const verifyLetter = (letter) => {

    if (guessedLetters.includes(letter) ||
      wrongLetters.includes(letter)
    ) {
      return
    }

    // push guessed letter or remove a guess
    if (letters.includes(letter)) {
      setGuessedLetters((actualGuessedLetter) => [
        ...actualGuessedLetter,
        letter
      ]);
    } else {
      setWrongLetters((actualWrongLetter) => [
        ...actualWrongLetter,
        letter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1)

    }
  };

  // reset letters states
  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // check id guesses ended
  useEffect(() => {
    if (guesses == 0) {
      // reset all states
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  // check win condition
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)]

    // win condition
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      // add score
      setScore((actualScore) => (actualScore += 100))

      // restart game with the new word
      startGame()
    }

  }, [guessedLetters])

  // restarts the game
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)

    setGameStage(stages[0].name);
  };

  // reset the game
  const resetGame = () => {
    setScore(0)
    setGuesses(guessesQty)

    startGame()
  }

  return (
    <>
      <div className="App">

        {gameStage === "start" &&
          <StartScreen
            startGame={startGame}
            resetGame={resetGame}
            retry={retry} />
        }
        {gameStage === "game" &&
          <Game
            verifyLetter={verifyLetter}
            pickedCategory={pickedCategory}
            letters={letters}
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
            resetGame={resetGame}
            retry={retry}
          />
        }
        {gameStage === "end" && <GameOver retry={retry} score={score} />}
      </div>
    </>
  );
}

export default App;
