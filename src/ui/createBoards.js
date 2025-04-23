export default function createBoard(container,board, shipPositions = [], revealShips = false) {
    container.innerHTML = "";
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement('div');
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.classList.add('cell');

            const val = board[y][x];
            if (val === 'hit') cell.classList.add('hit');
            if (val === 'miss') cell.classList.add('miss');

            const validShipPositions = Array.isArray(shipPositions) ? shipPositions : [];
            const shipHere = validShipPositions.find(pos => pos.x === x && pos.y === y);
            if (shipHere) {
                if (revealShips || shipHere.revealed) {
                    cell.classList.add('ship');
                }

                if (shipHere.hit) {
                    cell.classList.add('hit');
                }

                if (shipHere.sunk) {
                    cell.classList.add('sunk');
                }
            }

            container.appendChild(cell);
        }
    }
}