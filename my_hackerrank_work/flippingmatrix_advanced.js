// flipping matrix problem using javascript
"use strict";
function flippingMatrix(matrix) {
  let length = matrix.length,
    sum = 0,
    arr = new Array();
  for (let i = 0; i <= length / 2 - 1; i++) {
    for (let j = 0; j < length / 2; j++) {
      console.log(`i = ${i} , j = ${j}`);
      console.log(`
        matrix[i][j] = ${matrix[i][j]},
        matrix[i][length - j - 1] = ${matrix[i][length - j - 1]},
        matrix[length - i - 1][j] = ${matrix[length - i - 1][j]},
        matrix[length - i - 1][length - j - 1] = ${
          matrix[length - i - 1][length - j - 1]
        }
    `);
      arr.push(
        Math.max(
          matrix[i][j],
          matrix[i][length - j - 1],
          matrix[length - i - 1][j],
          matrix[length - i - 1][length - j - 1]
        )
      );
      console.log(arr);
      console.log();
      sum += Math.max(
        matrix[i][j],
        matrix[i][length - j - 1],
        matrix[length - i - 1][j],
        matrix[length - i - 1][length - j - 1]
      );
    }
  }
  console.log(matrix);
  return sum;
}
let matrix = [
  [112, 42, 83, 119],
  [56, 125, 56, 49],
  [15, 78, 101, 43],
  [62, 98, 114, 108],
];
console.log(flippingMatrix(matrix));
