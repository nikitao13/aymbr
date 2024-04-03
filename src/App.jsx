import { useState } from 'react'
import './App.css'
import GameConsole from "./components/GameConsole.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <GameConsole />
    </>
  )
}

export default App
