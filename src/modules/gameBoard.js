import Ship from "../factories/ship";

export default function GameBoard() {
    let size = 10;
    const board = Array.from({ length: size }, () => Array(size).fill(null));
    const ships = [];

    const placeShip = (x, y, length, isVertical = false) => {
        const ship = Ship(length);
        const positions = [];
        for (let i = 0; i < length; i++) {
            const xi = isVertical ? x + i : x;
            const yi = isVertical ? y + i : y;
            if (xi >= size || yi >= size || board[xi][yi] !== null) {
                return false
            }
            positions.push([xi, yi]);
        }
        positions.forEach(([xi, yi]) => {
            board[xi][yi] = ship;
        });
        ships.push({ ship, positions });
        return true;
    }

    const recieveAttacks = (x, y) => {
        const target = board[y][x];
        if (target === 'miss' || target === 'hit') return 'repeat';

        if (target && typeof target === 'function') {
            target.hit();
            board[y][x] = 'hit';
            return 'hit';
        }
        else {
            target.hit();
            board[y][x] = 'miss';
            return 'miss'
        }
    }

    const allShipsSunk = () => {
        ships.every(({ ship }) => ship.isSunk());
    }

    return {
        board,
        placeShip,
        recieveAttacks,
        allShipsSunk,
    };

}