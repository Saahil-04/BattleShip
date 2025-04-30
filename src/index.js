import "./styles.css";
import GameBoard from "./modules/gameBoard";
import Player from "./factories/player";
import renderBoards from "./ui/renderBoards";
import updateUI from "./ui/updateUI";
import { placeShipsRandomly } from "./utils/randomShips";

// Game State
const playerBoard = GameBoard();
const aiBoard = GameBoard();
const playerShipLengths = [5, 4, 3, 2, 2];
let currentShipIndex = 0;
let orientation = 'horizontal';
let gameStarted = false;
let isGameOver = false;
let currentTurn = 'player';

const player = Player('Player', false);
const ai = Player('AI', true);

// Initialize Game
function initializeGame() {
    setupEventListeners();
    renderBoards(playerBoard, aiBoard);
    document.getElementById('player-board').classList.add('unclickable')
    document.getElementById('enemy-board').classList.add('unclickable')
    updateUI(null);
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('manual-placement').addEventListener('click', handleManualPlacementStart);
    document.getElementById('random-placement').addEventListener('click', handleRandomPlacementStart);
    document.getElementById('toggle-orientation').addEventListener('click', toggleOrientation);
    document.getElementById('enemy-board').addEventListener('click', handlePlayerAttack);
    document.getElementById('place-again').addEventListener('click', handlePlaceAgain);
    document.getElementById('start-game').addEventListener('click', handleStartGameAfterRandom);
}

// Manual Placement
function handleManualPlacementStart() {
    document.getElementById('placement-choice').style.display = 'none';
    renderBoards(playerBoard, aiBoard);
    document.getElementById('player-board').classList.remove('unclickable');
    setupManualPlacement();
}

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
            finalizeManualPlacement();
        }
    } else {
        console.log('Invalid placement, try again.');
    }
}

function finalizeManualPlacement() {
    gameStarted = true;
    placeShipsRandomly(aiBoard);
    renderBoards(playerBoard, aiBoard);
    alert('All ships placed manually! Game ready.');
    document.getElementById('toggle-orientation').style.display = 'none';
    document.getElementById('enemy-board').classList.remove('unclickable');
    updateUI(currentTurn);
}

// Random Placement
function handleRandomPlacementStart() {
    placeShipsRandomly(playerBoard);
    placeShipsRandomly(aiBoard);
    renderBoards(playerBoard, aiBoard);

    document.getElementById('placement-choice').style.display = 'none';
    document.getElementById('player-board').classList.remove('unclickable');
    document.getElementById('enemy-board').classList.remove('unclickable');

    document.querySelector('.random-controls').style.display = 'block'

    gameStarted = false; // Important: do NOT start the game yet
    console.log("Ships placed randomly. Waiting for player to start.");
}

function handlePlaceAgain() {
    playerBoard.reset();
    aiBoard.reset();
    placeShipsRandomly(playerBoard);
    placeShipsRandomly(aiBoard);
    renderBoards(playerBoard, aiBoard);
    console.log("Ships re-placed randomly.");

}

function handleStartGameAfterRandom() {
    document.getElementById('enemy-board').addEventListener('click', handlePlayerAttack);

    gameStarted = true;
    currentTurn = 'player';
    updateUI(currentTurn);

    document.querySelector('.random-controls').style.display = 'none';

    console.log("Game started!");
}

// Orientation Toggle
function toggleOrientation() {
    orientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';
    document.getElementById('toggle-orientation').textContent =
        `Rotate (Current: ${orientation.charAt(0).toUpperCase() + orientation.slice(1)})`;
}

// Player Attack
function handlePlayerAttack(e) {
    if (currentTurn !== 'player' || isGameOver) return;

    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);
    if (isNaN(x) || isNaN(y)) return;

    const result = player.makeMove(x, y, aiBoard);
    if (result === 'repeat') return;

    renderBoards(playerBoard, aiBoard);
    console.log("Rendered Boards");
    if (aiBoard.allShipsSunk()) {
        console.log("checking win")
        endGame('🎉 You win!');
        return;
    }

    currentTurn = 'ai';
    updateUI(currentTurn);
    setTimeout(handleAIAttack, Math.random() * 400 + 300);
}

// AI Attack
function handleAIAttack() {

    if (isGameOver) return;

    let moveResult;
    do {
        moveResult = ai.randomMoves(playerBoard);
    } while (moveResult === 'repeat');

    renderBoards(playerBoard, aiBoard);

    if (playerBoard.allShipsSunk()) {
        endGame('💀 You lost!');
        return;
    }

    currentTurn = 'player';
    updateUI(currentTurn);
}

// End Game
function endGame(message) {
    isGameOver = true;
    renderBoards(playerBoard, aiBoard);
    alert(message);
}

// Start the Game
initializeGame();

