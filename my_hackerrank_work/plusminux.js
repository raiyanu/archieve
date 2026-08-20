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
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr) {
  // Write your code here
  let p = 0,
    n = 0,
    z = 0;
  arr.forEach((item) => {
    item > 0 ? p++ : item == 0 ? z++ : n++;
  });
  console.log((p / arr.length).toFixed(6));
  console.log((n / arr.length).toFixed(6));
  console.log((z / arr.length).toFixed(6));
  return 0;
}

function main() {
  // const n = parseInt(readLine().trim(), 10);

  // const arr = readLine()
  //   .replace(/\s+$/g, "")
  //   .split(" ")
  //   .map((arrTemp) => parseInt(arrTemp, 10));

  // plusMinus(arr);
  plusMinus([2, 3, 4, 0, 0, 0, -12, -23, -42]);
}
