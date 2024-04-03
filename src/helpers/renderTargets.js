function renderTargets(gameState, setGameState, targetDelay) {
    if (!gameState.active || !gameState.showTargets) {
        setGameState(prevState => ({ ...prevState, activeTarget: { x: null, y: null } }));
        return () => {};
    }

    const interval = setInterval(() => {
        setGameState(prevState => ({
            ...prevState,
            activeTarget: {
                x: Math.floor(Math.random() * 24),
                y: Math.floor(Math.random() * 16),
            },
        }));
    }, targetDelay[gameState.mode] * 1000);

    return () => clearInterval(interval);
}

export default renderTargets;