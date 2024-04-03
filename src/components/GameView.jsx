import Target from './Target';
import renderTargets from "../helpers/renderTargets.js";
import popSound from '../assets/pop.wav';
import { useCallback, useEffect, useMemo } from 'react';

const pop = new Audio(popSound);

function GameView({ gameState, setGameState, targetDelay }) {
    useEffect(() => {
        if (!gameState.active) return;

        setGameState(prevState => ({
            ...prevState,
            score: 0,
            showTargets: false,
            activeTarget: { x: null, y: null },
        }));

        const delay = setTimeout(() => {
            setGameState(prevState => ({ ...prevState, showTargets: true }));
        }, 1300);

        return () => clearTimeout(delay);

    }, [gameState.active]);

    useEffect(() => {
        return renderTargets(gameState, setGameState, targetDelay);
    }, [setGameState, gameState.active, gameState.showTargets]);

    const incrementScore = useCallback((x, y) => {
        const currentTargetKey = `${x}-${y}`;
        const { lastHitTarget, score } = gameState;
        const lastHitTargetKey = lastHitTarget ? `${lastHitTarget.x}-${lastHitTarget.y}` : null;

        if (currentTargetKey !== lastHitTargetKey) {
            setGameState(prevState => ({
                ...prevState,
                score: score + 1,
                lastHitTarget: { x, y },
            }));
            pop.play().catch(error => console.error('sound error: ', error));
        }
    }, [gameState.lastHitTarget, gameState.score, setGameState]);

    const targets = useMemo(() => {
        if (!gameState.showTargets) return [];

        return Array.from({ length: 16 }, (_, rowIndex) =>
            Array.from({ length: 24 }, (_, colIndex) => {
                const isLastHit =
                    gameState.lastHitTarget && gameState.lastHitTarget.x === colIndex &&
                    gameState.lastHitTarget.y === rowIndex;

                const isActive = gameState.activeTarget.x === colIndex && gameState.activeTarget.y === rowIndex;

                return <Target
                        key={`${colIndex}-${rowIndex}`}
                        active={isActive}
                        onClick={() => incrementScore(colIndex, rowIndex)}
                        isLastHit={isLastHit}
                    />
            })
        );
    }, [gameState.showTargets, gameState.lastHitTarget, gameState.activeTarget, incrementScore]);

    return <div id='game-view'>{targets}</div>;
}

export default GameView;