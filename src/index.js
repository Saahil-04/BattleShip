import "./styles.css";
import GameBoard from "./modules/gameBoard";
import Player from "./factories/player";
import renderBoards from "./ui/renderBoards";
import updateUI from "./ui/updateUI";

const playerBoard = GameBoard();
const aiBoard = GameBoard();

const player = Player('Player', false);
const ai = Player('AI', true);

let currentTurn = 'player';

playerBoard.placeShip(0, 0, 5);
aiBoard.placeShip(0, 0, 5);

// Render both boards
renderBoards(playerBoard, aiBoard);

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

    currentTurn = 'ai';
    updateUI(currentTurn);

    setTimeout(() => {
        ai.randomMoves(playerBoard);
        renderBoards(playerBoard, aiBoard); // Re-render both boards after AI move

        currentTurn = 'player';
        updateUI(currentTurn);
    }, 400);
});