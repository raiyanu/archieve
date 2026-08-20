function findMedian(arr) {
  console.log(arr);
  arr.sort((a, b) => a - b);
  return arr[parseInt(arr.length / 2)];
}

function main() {
  let arr = [4, 2, 7, 1, 5];

  const result = findMedian(arr);
  console.log(result);
}
main();
