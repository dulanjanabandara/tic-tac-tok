document.addEventListener("DOMContentLoaded", function () {
  const boardElement = document.getElementById("board");
  const cells = [];
  let currentPlayer = "X";
  let gameOver = false;

  // Create the game board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", () => handleCellClick(i));
    cells.push(cell);
    boardElement.appendChild(cell);
  }

  // Function to handle cell click
  function handleCellClick(index) {
    if (!gameOver && cells[index].innerHTML === "") {
      cells[index].innerHTML = currentPlayer;
      if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
        gameOver = true;
      } else if (isBoardFull()) {
        alert("It's a tie!");
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  // Function to check for a winner
  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        cells[a].innerHTML !== "" &&
        cells[a].innerHTML === cells[b].innerHTML &&
        cells[a].innerHTML === cells[c].innerHTML
      ) {
        highlightWinnerCells(combo);
        return true;
      }
    }

    return false;
  }

  // Function to highlight winning cells
  function highlightWinnerCells(cellsToHighlight) {
    cellsToHighlight.forEach((index) => cells[index].classList.add("winner"));
  }

  // Function to check if the board is full
  function isBoardFull() {
    return cells.every((cell) => cell.innerHTML !== "");
  }
});
