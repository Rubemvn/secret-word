import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className='startGame content'>
      <h1>Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={startGame}><p>Jogar</p></button>
    </div>
  )
}

export default StartScreen