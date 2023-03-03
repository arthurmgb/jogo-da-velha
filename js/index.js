let cells = document.querySelectorAll('.cell');
let turn = 'X';
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    cell.classList.add('blocked');
    cell.innerHTML = turn;
    turn = turn == 'X' ? 'O' : 'X';
  });
});