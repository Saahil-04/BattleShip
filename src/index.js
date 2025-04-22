import GameBoard from "./modules/gameBoard";
import Player from "./factories/player";
import { renderBoard } from "./ui/dom";

const playerBoard = GameBoard();
const aiBoard = GameBoard();

const player = Player('Player', false);
const ai = Player('AI', true);

playerBoard.placeShip(0, 0, 5);
aiBoard.placeShip(0, 0, 5);

renderBoard(document.querySelector('#player-board'), playerBoard.board);
renderBoard(document.querySelector('#ai-board'), aiBoard.board, true);

document.querySelector('#ai-board').addEventListener('click', (e) => {
    const x = e.target.dataset.x;
    const y = e.target.dataset.y;
    const result = player.makeMove(aiBoard, x, y);

    if (result === 'repeat');

    renderBoard(document.querySelector('#enemy-board'), aiBoard.board, true);

    setTimeout(() => {
        ai.makeRandomMove(playerBoard);
        renderBoard(document.querySelector('#player-board'), playerBoard.board);
    }, 300);
});