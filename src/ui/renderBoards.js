// src/dom/renderBoards.js
import createBoard from './createBoards.js';

function extractBoardCells(gameboard, revealShips = false) {
    const cells = [];

    for (let y = 0; y < gameboard.board.length; y++) {
        for (let x = 0; x < gameboard.board[y].length; x++) {
            const cellValue = gameboard.board[y][x];

            const cell = {
                x,
                y,
                hit: cellValue === 'hit',
                miss: cellValue === 'miss',
                hasShip: typeof cellValue === 'object',
                revealed: false,
                sunk: false,
            };

            // Show player's own ships or reveal enemy's only if sunk
            if (cell.hasShip && Array.isArray(gameboard.ships)) {
                const shipData = gameboard.ships.find(({ positions }) =>
                    positions.some(([yi, xi]) => xi === x && yi === y)
                );
            
                if (shipData) {
                    cell.revealed = revealShips || shipData.ship.isSunk();
                    cell.sunk = shipData.ship.isSunk();
                }
            }

            cells.push(cell);
        }
    }

    return cells;
}

export default function renderBoards(playerGameboard, enemyGameboard) {
    const playerCells = extractBoardCells(playerGameboard, true); // Show all player ships
    const enemyCells = extractBoardCells(enemyGameboard, false); // Show only sunk enemy ships

    createBoard('player-board', playerCells, true);
    createBoard('enemy-board', enemyCells, false);
}
