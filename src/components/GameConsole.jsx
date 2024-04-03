import GameHeader from "./GameHeader.jsx";
import GameView from "./GameView.jsx";
import Options from "./Options.jsx";
import {useEffect, useState} from "react";

function GameConsole() {
    const loadMode = () => localStorage.getItem('gameMode') || 'easy';
    const loadScore = () => parseInt(localStorage.getItem('gameScore'), 10) || 0;


    const [gameState, setGameState] = useState({
        active: false,
        score: loadScore(),
        mode: loadMode(),
        activeTarget: { x: null, y: null },
        showTargets: false,
        lastHitTarget: null,
        best: 0,
        targetsPerGame: 31,
    });

    const targetDelay = { easy: 2, medium: 1.5, hard: 1 };

    useEffect(() => {
        localStorage.setItem('gameMode', gameState.mode);
        localStorage.setItem('gameScore', gameState.score.toString());
    }, [gameState.mode, gameState.score]);

    const startGame = () => {
        if (gameState.active) {
            console.log('game is already running.');
            return;
        }
        console.log('game started');
        initializeGameState();
        endGameAfterDelay();
    }

    const initializeGameState = () => setGameState(prevState => ({
        ...prevState,
        score: 0,
        active: true,
        activeTarget: { x: null, y: null },
        showTargets: false,
        lastHitTarget: null,
    }));

    const endGameAfterDelay = () => {
        setTimeout(() => {
            setGameState(prevState => ({
                ...prevState,
                active: false,
                showTargets: false,
            }));
            console.log('game ended');
        }, gameState.targetsPerGame * targetDelay[gameState.mode] * 1000);
    };

    return <div id='console'>
            <GameHeader />
            <Options gameState={gameState} startGame={startGame} setGameState={setGameState} />
            <GameView gameState={gameState} setGameState={setGameState} targetDelay={targetDelay} />
           </div>
}

export default GameConsole;