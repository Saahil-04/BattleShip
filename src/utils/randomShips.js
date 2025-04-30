export function placeShipsRandomly(board) {
    const shiplengths = [5, 4, 3, 2];

    for (const length of shiplengths) {
        let placed = false;

        while (!placed) {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const isVertical = Math.random() < 0.5;

            placed = board.placeShip(x, y, length, isVertical);
        }
    }
}

