import { useEffect, useState } from "react";

function GameHeader() {
    const [fadeValue, setFadeValue] = useState('0');

    useEffect(() => {
        const timer = setTimeout(() => setFadeValue('1'), 250);
        return () => clearTimeout(timer);
    }, []);

    return <header><h1 id='hh1' style={{opacity: fadeValue}}>aymbr</h1></header>;
}

export default GameHeader;