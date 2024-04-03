import { useEffect, useState } from "react";

function Options({ gameState, startGame, setGameState }) {
    const [fadeValue, setFadeValue] = useState('0');

    useEffect(() => {
        const timer = setTimeout(() => setFadeValue('1'), 1000);
        return () => clearTimeout(timer);
    }, []);

    const getNextMode = () => {
        const modeMap = { easy: 'medium', medium: 'hard', hard: 'easy' };
        return modeMap[gameState.mode];
    };

    const changeMode = () => gameState.active ? null : setGameState(prevState => ({...prevState, mode: getNextMode()}));

    const styles = {
        cursor: gameState.active ? 'not-allowed' : 'pointer',
        color: gameState.active ? 'grey' : 'white'
    };

    return (
        <div id='startScore' style={{opacity: fadeValue}}>
            <p id='start' style={styles} onClick={startGame}>start</p>
            <p id='mode' style={styles} onClick={changeMode}>mode: {gameState.mode}</p>
            <p id='score'>score: <span style={{color: 'red'}}>{gameState.score}</span></p>
        </div>
    )
}

export default Options;