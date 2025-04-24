// src/dom/createBoard.js
export default function createBoard(containerId, cells, isPlayer = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    container.classList.add('board');
  
    cells.forEach((cellData) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = cellData.x;
      cell.dataset.y = cellData.y;
  
      if (cellData.miss) cell.classList.add('miss');
      if (cellData.hit) cell.classList.add('hit');
  
      if (cellData.hasShip && (isPlayer || cellData.revealed)) {
        cell.classList.add('ship');
      }
  
      if (cellData.sunk) {
        cell.classList.add('sunk');
      }
  
      container.appendChild(cell);
    });
  }
  