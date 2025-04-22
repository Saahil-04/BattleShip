import GameBoard from "../modules/gameBoard";

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
            x = Math.random() * 10;
            y = Math.random() * 10;

        } while (movesMade.has(`${x},${y}`));
        movesMade.add(`${x},${y}`);
        return gameboard.recieveAttacks(x, y);

    }
    return {
        name,
        isAI,
        moveMove,
        randomMoves,
    }
}