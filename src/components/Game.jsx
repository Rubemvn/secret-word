import { useState, useRef } from 'react'
import './Game.css'

const Game = ({
  verifyLetter,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  resetGame,
  retry
}) => {

  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)


  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)

    setLetter("")

    letterInputRef.current.focus()
  }

  return (

    <div className='game content'>
      <p className='points'>
        <span>PONTUAÇÃO: {score}</span>
      </p>

      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className='letter'>
              {letter}
            </span>
          ) : (
            <span key={i} className='blankSquare'></span>
          )
        )}
      </div>
      <h3 className='tip'>
        Dica: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s)</p>

      <div className="letterContainer">
        <p className='guidanceText'>tente adivinhar uma letra</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name='letter'
            maxLength="1"
            required
            onChange={(e) => (
              setLetter(e.target.value.toUpperCase()))
            }
            value={letter.toUpperCase()}
            ref={letterInputRef}
          />
          <button><p>JOGAR!</p></button>
        </form>

      </div>
      
      <div className='backButtons'>
        <button onClick={resetGame}><p>RESET</p></button>
        <button onClick={retry}><p>INÍCIO</p></button>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras Utilizadas</p>
        {wrongLetters.map((letters, i) => (
          <span key={i}>{letters}, </span>
        )
        )}
      </div>
    </div>
  )
}

export default Game