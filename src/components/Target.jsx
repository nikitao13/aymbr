function Target({ onClick, active, isLastHit }) {
    const backgroundColor = isLastHit ? '#121212' : (active ? 'red' : '#121212');
    const targetOpacity = isLastHit ? '0' : (active ? '1' : '0');

    return (
        <div
            className="target"
            onClick={active && !isLastHit ? onClick : undefined}
            style={{
                width: '50px',
                height: '50px',
                backgroundColor: backgroundColor,
                borderRadius: '50%',
                opacity: targetOpacity,
                transition: 'opacity 0.85s ease-in-out',
            }}
        />
    );
}


export default Target;