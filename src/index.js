import "./styles.css";
import GameBoard from "./modules/gameBoard";
import Player from "./factories/player";
import renderBoards from "./ui/renderBoards";
import updateUI from "./ui/updateUI";
import { placeShipsRandomly } from "./utils/randomShips";

const playerBoard = GameBoard();
const aiBoard = GameBoard();
const playerShipLengths = [5, 4, 3, 2, 2];

let currentShipIndex = 0;
let orientation = 'horizontal';
let gameStarted = false;
let isGameOver = false;


const player = Player('Player', false);
const ai = Player('AI', true);

let currentTurn = 'player';

playerBoard.placeShip(0, 0, 5);
aiBoard.placeShip(0, 0, 5);

// Render both boards
renderBoards(playerBoard, aiBoard);

document.getElementById('manual-placement').addEventListener('click', () => {
    document.getElementById('placement-choice').style.display = 'none';
    renderBoards(playerBoard, aiBoard);
    setupManualPlacement();
});

document.getElementById('random-placement').addEventListener('click', () => {
    placeShipsRandomly(playerBoard);
    placeShipsRandomly(aiBoard);
    gameStarted = true;
    document.getElementById('placement-choice').style.display = 'none';
    renderBoards(playerBoard, aiBoard);
    console.log("Game started with random player ships.");
});

function setupManualPlacement() {
    document.getElementById('toggle-orientation').style.display = 'block';

    document.getElementById('player-board').addEventListener('click', handleManualShipPlacement);
}

function handleManualShipPlacement(e) {
    if (gameStarted) return;

    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);
    if (isNaN(x) || isNaN(y)) return;

    const length = playerShipLengths[currentShipIndex];
    const isVertical = orientation === 'vertical';

    const placed = playerBoard.placeShip(x, y, length, isVertical);
    if (placed) {
        currentShipIndex++;
        renderBoards(playerBoard, aiBoard);

        if (currentShipIndex === playerShipLengths.length) {
            gameStarted = true;
            placeShipsRandomly(aiBoard);
            renderBoards(playerBoard, aiBoard);
            alert('All ships placed manually! Game ready.');
            document.getElementById('toggle-orientation').style.display = 'none'
        }
    } else {
        console.log('Invalid placement, try again.');
    }
}

document.getElementById('toggle-orientation').addEventListener('click', () => {
    orientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';
    document.getElementById('toggle-orientation').textContent =
        `Rotate (Current: ${orientation.charAt(0).toUpperCase() + orientation.slice(1)})`;
});

document.querySelector('#enemy-board').addEventListener('click', (e) => {

    if (currentTurn !== 'player') return;

    const x = parseInt(e.target.dataset.x, 10); // Ensure x is a number
    const y = parseInt(e.target.dataset.y, 10); // Ensure y is a number

    if (isNaN(x) || isNaN(y)) return; // Ignore clicks outside the grid

    const result = player.makeMove(x, y, aiBoard);
    console.log("result", result);

    if (result === 'repeat') return; // Prevent re-rendering on repeated moves

    // Re-render the enemy board
    renderBoards(playerBoard, aiBoard);
    if (aiBoard.allShipsSunk()) {
        isGameOver = true;
        renderBoards(playerBoard, aiBoard); // just to re-render final state
        alert("🎉 You win!");
        return;
    }

    currentTurn = 'ai';
    updateUI(currentTurn);

    setTimeout(() => {
        if (isGameOver) return;

        ai.randomMoves(playerBoard);
        renderBoards(playerBoard, aiBoard); // Re-render both boards after AI move

        currentTurn = 'player';
        updateUI(currentTurn);

        if (playerBoard.allShipsSunk()) {
            isGameOver = true;
            alert("💀 You lost!");
        }
    }, 400);
});