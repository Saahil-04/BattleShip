// src/dom/renderBoards.js
import createBoard from './createBoards.js';

// Sample ship positions for both player and enemy
const playerShips = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
];

const enemyShips = [
    { x: 5, y: 5, hit: true },
    { x: 6, y: 5, hit: true },
    { x: 7, y: 5, hit: true, sunk: true, revealed: true }, // example sunk part
];

export default function renderBoards(playerBoard, aiBoard) {
    // Show player ships openly
    createBoard(document.getElementById('player-board'), playerBoard.board, playerShips, true);

    // Hide enemy ships unless sunk
    createBoard(document.getElementById('enemy-board'), aiBoard.board, enemyShips, false);
}
