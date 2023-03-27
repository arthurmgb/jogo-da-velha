let cells = document.querySelectorAll(".cell");
let btnRestart = document.querySelector(".restart");
let turn = "X";
let playerX = [];
let playerO = [];
let draw = true;
let winMsg = document.querySelector("h1");
const tap = new Audio("src/tap.wav");
const game_over = new Audio("src/go.mp3");
const game_win = new Audio("src/win.mp3");

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
    game_win.volume = 0.2;
    game_win.currentTime = 0;
    game_win.play();
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
      return;
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
      return;
    }
  }

  cells.forEach((cell) => {
    if (!cell.classList.contains("blocked")) {
      draw = false;
      return;
    }
  });

  if (draw) {
    game_over.volume = 0.3;
    game_over.currentTime = 0;
    game_over.play();
    winMsg.style.opacity = "1";
    winMsg.innerText = "Deu velha!";
    return;
  }
};

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    if (btnRestart.disabled) {
      btnRestart.disabled = false;
    }
    tap.currentTime = 0;
    tap.play();
    cell.classList.add("blocked");
    cell.innerHTML = turn;
    checkWin(e, draw);
    turn = turn == "X" ? "O" : "X";
  });
});

btnRestart.addEventListener("click", () => {
  tap.currentTime = 0;
  tap.play();
  cells.forEach((cell) => {
    cell.classList.remove("blocked", "lock");
    cell.innerHTML = "";
  });
  turn = "X";
  playerX = [];
  playerO = [];
  winMsg.style.opacity = "0";
  btnRestart.disabled = true;
});
