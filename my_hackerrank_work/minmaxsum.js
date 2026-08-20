"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function miniMaxSum(arr) {
  // Write your code here
  let min = 0,
    max = 0,
    sum = arr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  arr.forEach((item) => {
    sum - item > max ? (max = sum - item) : "";
    sum - item < max ? (min = sum - item) : "";
  });
  console.log(max);
  console.log(min);
}

function main() {
  // const arr = readLine()
  //   .replace(/\s+$/g, "")
  //   .split(" ")
  //   .map((arrTemp) => parseInt(arrTemp, 10));

  // miniMaxSum(arr);
  miniMaxSum([3, 4, 52, 55, 2]);
}
