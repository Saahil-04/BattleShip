export function renderBoard(container, board, isEnemy = false) {
    container.innerHTML = "";
    for (let y = 0; y < 10; y++) {
        for (let x; x < 10; x++) {
            const cell = document.createElement('div');
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.classList.add('cell');

            const val = board[y][x];
            if (val === 'hit') cell.classList.add('hit');
            if (val === 'miss') cell.classList.add('miss');

            container.appendChild(cell);
        }
    }
}