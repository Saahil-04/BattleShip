export default function (currentTurn) {

    const turnDiv = document.getElementById('turn-indicator');

    if (currentTurn == null) {
        turnDiv.style.display = 'none'
    }

    turnDiv.textContent = currentTurn == 'player' ? 'Your Turn!!' : `AI's Turn..`;
}