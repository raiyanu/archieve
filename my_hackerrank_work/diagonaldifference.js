let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

function calcDia(matrix, side) {
  let total = 0;
  for (let i = 0; i < matrix.length; i++) {
    if (side == 1) {
      total += matrix[i][i];
    } else {
      matrix[i] = matrix[i].reverse();
      total += matrix[i][i];
    }
    console.log(matrix[i][i]);
  }
  return total;
}
console.log(calcDia(matrix, 1) - calcDia(matrix, -1));
