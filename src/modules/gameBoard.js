import Ship from "../factories/ship";

export default function GameBoard() {
    let size = 10;
    const board = Array.from({ length: size }, () => Array(size).fill(null));
    const ships = [];

    const placeShip = (x, y, length, isVertical = false) => {
        const ship = Ship(length);
        const positions = [];
        for (let i = 0; i < length; i++) {
            const xi = isVertical ? x : x + i;
            const yi = isVertical ? y + i : y;
        
            if (xi >= size || yi >= size || board[yi][xi] !== null) {
                return false;
            }
        
            positions.push([yi, xi]);
        }
        positions.forEach(([yi, xi]) => {
            board[yi][xi] = ship;
        });
        ships.push({ ship, positions });
        console.log('ship placed', ships, board);
        return true;
    }

    const recieveAttacks = (x, y) => {
        const target = board[y][x];
        if (target === 'miss' || target === 'hit') return 'repeat';

        if (target && typeof target === 'object') {
            target.hit();
            board[y][x] = 'hit';
            console.log('target hit')
            return 'hit';
        }
        else {
            board[y][x] = 'miss';
            console.log('target missed')
            return 'miss'
        }
    }

    const allShipsSunk = () => {
        return ships.every(({ ship }) => ship.isSunk());
    }

    return {
        board,
        ships,
        placeShip,
        recieveAttacks,
        allShipsSunk,
    };

}