let cells = document.querySelectorAll(".cell");
let btnRestart = document.querySelector(".restart");
let turn = "X";
let playerX = [];
let playerO = [];
let draw = true;
let winMsg = document.querySelector("h1");

const winPossibilities = [
  // linhas
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // colunas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // diagonais
  [0, 4, 8],
  [2, 4, 6],
];

const endGame = () => {
  cells.forEach((cell) => {
    cell.classList.add("lock");
  });
};

const checkWin = (e, draw) => {
  if (turn == "X") {
    playerX.push(parseInt(e.target.dataset.i));
    if (
      winPossibilities.some((possibility) =>
        possibility.every((number) => playerX.includes(number))
      )
    ) {
      winMsg.style.opacity = "1";
      winMsg.innerText = "O jogador X ganhou!";
      endGame();
    }
  } else if (turn == "O") {
    playerO.push(parseInt(e.target.dataset.i));
    if (
      winPossibilities.some((possibility) =>
        possibility.every((number) => playerO.includes(number))
      )
    ) {
      winMsg.style.opacity = "1";
      winMsg.innerText = "O jogador O ganhou!";
      endGame();
    }
  }

  cells.forEach((cell) => {
    if (!cell.classList.contains("blocked")) {
      draw = false;
      return;
    }
  });

  if (draw) {
    winMsg.style.opacity = "1";
    winMsg.innerText = "Deu velha!";
    return;
  }
};

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    cell.classList.add("blocked");
    cell.innerHTML = turn;
    checkWin(e, draw);
    turn = turn == "X" ? "O" : "X";
  });
});

btnRestart.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.classList.remove("blocked", "lock");
    cell.innerHTML = "";
  });
  turn = "X";
  playerX = [];
  playerO = [];
  winMsg.style.opacity = "0";
});
