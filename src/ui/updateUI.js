export default function (currentTurn) {

    const turnDiv = document.getElementById('turn-indicator');

    if (currentTurn == null) {
        turnDiv.textContent = 'Place Your Ships...'
    }
    else {
        turnDiv.style.display = 'block'
        turnDiv.textContent = currentTurn == 'player' ? 'Your Turn!!' : `AI's Turn..`;
    }
}   