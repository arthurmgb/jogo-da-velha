let cells = document.querySelectorAll(".cell");
let turn = "X";
let btnRestart = document.querySelector(".restart");

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    cell.classList.add("blocked");
    cell.innerHTML = turn;
    turn = turn == "X" ? "O" : "X";
  });
});

btnRestart.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.classList.remove("blocked");
    cell.innerHTML = "";
    turn = "X";
  });
});
