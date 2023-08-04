import "./GameOver.css"

const GameOver = ({retry, score}) => {
  return (
    <div className="gameOver content">
      <h1>Game Over</h1>
    <h2 className="score">Sua pontuação foi: <span>{score}</span></h2>
      <button onClick={retry}>
        <p>Restart</p>
      </button>
    </div>
  )
}

export default GameOver