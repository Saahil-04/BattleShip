
export default function Player(name = 'Player', isAI = 'false') {

    const movesMade = new Set();


    const makeMove = (x, y, gameboard) => {
        const key = `${x},${y}`;
        if (movesMade.has(key)) {
            return 'repeat';
        }

        movesMade.add(key);
        return gameboard.recieveAttacks(x, y);
    }

    const randomMoves = (gameboard) => {

        let x, y;
        do {
            x = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
            y = Math.floor(Math.random() * (9 - 0 + 1)) + 0;

        } while (movesMade.has(`${x},${y}`));
        movesMade.add(`${x},${y}`);
        console.log("AI move", x, y)
        return gameboard.recieveAttacks(x, y);

    }
    return {
        name,
        isAI,
        makeMove,
        randomMoves,
    }
}