export default function (currentTurn) {
    const turnDiv = document.getElementById('turn-indicator');
    turnDiv.textContent = currentTurn == 'player' ? 'Your Turn!!' : `AI's Turn..`;
}